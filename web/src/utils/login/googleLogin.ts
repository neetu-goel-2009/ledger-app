import { AppDispatch } from "../../store/store";
import { setToggleStatus } from "../../store/components/uiInteraction/uiInteraction";
import { setUser, setToken } from "../../store/components/users/users";
import axios from "axios";
import { getGoogleIdToken } from "../GoogleAuth";

export const handleGoogleLogin = async (dispatch: AppDispatch) => {
  try {
    const clientId = '655292360495-afgtuqg0rkdhd7gcc4c425l6v3302hp1.apps.googleusercontent.com';
    const idToken = await getGoogleIdToken(clientId);
    const res = await axios.post('http://localhost:8000/api/users/google-login', { id_token: idToken });
    
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