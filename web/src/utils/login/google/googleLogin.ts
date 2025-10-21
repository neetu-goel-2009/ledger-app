import { AppDispatch } from "../../../store/store";
import { AUTH_CONFIG } from '../../../config/auth.config';
import { setToggleStatus } from "../../../store/components/uiInteraction/uiInteraction";
import { setUser, setToken } from "../../../store/components/users/users";
import axios from "axios";
import { getGoogleIdToken } from "./GoogleAuth";

export const handleGoogleLogin = async (dispatch: AppDispatch) => {
  try {
    const clientId = AUTH_CONFIG.googleClientId;
    const idToken = await getGoogleIdToken(clientId);
    const res = await axios.post(`${AUTH_CONFIG.apiEndpoint}/users/google-login`, { id_token: idToken });
    
    // Store user data and token
    dispatch(setUser(res.data));
    dispatch(setToken(idToken));
    
    // Close login modal
    dispatch(setToggleStatus({ key: "dynamicForm", status: false }));
    
    return { success: true };
  } catch (err) {
    return { 
      success: false, 
      error: err?.toString?.() || 'Unknown error during Google login'
    };
  }
};