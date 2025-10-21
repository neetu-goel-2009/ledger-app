import axios from 'axios';
import { AUTH_CONFIG } from '../../../config/auth.config';
import { AppDispatch } from '../../../store/store';
import { setUser, setToken } from '../../../store/components/users/users';
import { setToggleStatus } from '../../../store/components/uiInteraction/uiInteraction';

interface FacebookUserData {
  id: string;
  name: string;
  email?: string;
  error?: {
    message: string;
    type: string;
    code: number;
  };
}

declare global {
  interface Window {
    fbAsyncInit: any;
    FB: any;
  }
}

function loadFacebookSdk(appId: string) {
  return new Promise<void>((resolve, reject) => {
    if (window.FB) return resolve();

    window.fbAsyncInit = function () {
      window.FB.init({
        appId,
        cookie: true,
        xfbml: false,
        version: 'v24.0', // Update to latest stable version
      });
      resolve();
    };

    const script = document.createElement('script');
    script.src = 'https://connect.facebook.net/en_US/sdk.js';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      // fbAsyncInit should fire
      window.fbAsyncInit();
    };
    script.onerror = () => reject('Failed to load Facebook SDK');
    document.body.appendChild(script);
  });
}

const myAsyncLogic = async (
    response: { authResponse?: { accessToken: string; userID: string; grantedScopes?: string } },
    dispatch: AppDispatch,
    resolve: (value: { success: boolean; error?: string }) => void
) => {
    if (!response || !response.authResponse) {
        resolve({ success: false, error: 'Facebook login failed or was cancelled' });
        return;
    }

    const { accessToken, userID, grantedScopes } = response.authResponse;
    console.log('Granted scopes:', grantedScopes); // Debug permissions

    try {
        // Get basic profile data first
        const userDataResponse = await new Promise<FacebookUserData>((resolveFB) => {
            window.FB.api('/me', {
                fields: 'id,name,email',
            }, resolveFB);
        });

        console.log('User data response:', userDataResponse); // Debug user data

        if (!userDataResponse || userDataResponse.error) {
            const errorMsg = userDataResponse?.error?.message || 'Failed to get user data';
            console.error('FB API error:', errorMsg);
            resolve({ success: false, error: errorMsg });
            return;
        }

        // Check if we got an email
        if (!userDataResponse.email) {
            console.log('No email in response - requesting permission');
            // Could add additional permission request here if needed
        }

        try {
            const res = await axios.post(`${AUTH_CONFIG.apiEndpoint}/users/facebook-login`, { 
                access_token: accessToken,
                user_data: userDataResponse
            });

            // Store user data and token in Redux
            dispatch(setUser(res.data.user));
            dispatch(setToken({ mode: res.data.mode, token: res.data.token, refresh_token: res.data.refresh_token }));
            dispatch(setToggleStatus({ key: 'dynamicForm', status: false }));

            resolve({ success: true });
        } catch (err: any) {
            console.error('Backend error:', err);
            resolve({ success: false, error: err?.response?.data?.detail || 'Server error during Facebook login' });
        }
    } catch (err: any) {
        console.error('Facebook API error:', err);
        resolve({ success: false, error: 'Failed to get user data from Facebook' });
    }
};


export const handleFacebookLogin = async (dispatch: AppDispatch, appId = AUTH_CONFIG.facebookClientId) => {
  try {
    await loadFacebookSdk(appId);

    return new Promise<{ success: boolean; error?: string }>((resolve) => {
      // First check login status
      window.FB.getLoginStatus((statusResponse: any) => {
        const login = () => {
          window.FB.login((loginResponse: any) => {
            if (!loginResponse || !loginResponse.authResponse) {
              console.log('Login failed or cancelled:', loginResponse);
              resolve({ success: false, error: 'Login failed or was cancelled' });
              return;
            }
            console.log('Login successful:', loginResponse);
            myAsyncLogic(loginResponse, dispatch, resolve);
          }, {
            scope: 'email',  // Request only email permission initially
            auth_type: 'rerequest',  // Re-request if previously denied
            return_scopes: true  // See which permissions were granted
          });
        };

        if (statusResponse.status === 'connected') {
          // Already logged in, just get the token
          myAsyncLogic(statusResponse, dispatch, resolve);
        } else {
          // Need to log in
          login();
        }
      });
    });
  } catch (err: any) {
    console.error('Facebook SDK error:', err);
    return { success: false, error: err?.toString?.() || 'Failed to initialize Facebook SDK' };
  }
};

export default handleFacebookLogin;
