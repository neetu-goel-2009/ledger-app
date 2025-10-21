import axios from "axios";
import { AUTH_CONFIG } from '../../config/auth.config';
import { getGoogleIdToken } from "../../utils/login/google/GoogleAuth";
import { setToken, setUser } from "../../store/components/users/users";
import { setToggleStatus } from "../../store/components/uiInteraction/uiInteraction";

const handleGoogleLogin = async ({ dispatch }) => {
    try {
        const clientId = AUTH_CONFIG.googleClientId;
        const idToken = await getGoogleIdToken(clientId);
        const res = await axios.post(`${AUTH_CONFIG.apiEndpoint}/users/google-login`, { id_token: idToken });
        
        // Store user data and token
        dispatch(setUser(res.data));
        dispatch(setToken(idToken));
        
        // Close login modal 
        dispatch(setToggleStatus({ key: "loginForm", status: false }));
        return { success: true };
    } catch (err) {
        alert('Google login failed: ' + (err?.toString?.() || ''));
        return { 
            success: false, 
            error: err?.toString?.() || 'Unknown error during Google login'
        };
    }
};

export default handleGoogleLogin;
