import axios from "axios";
import { getGoogleIdToken } from "../../utils/GoogleAuth";
import { setToken, setUser } from "../../store/components/users/users";
import { setToggleStatus } from "../../store/components/uiInteraction/uiInteraction";

const handleGoogleLogin = async ({ dispatch }) => {
    try {
        const clientId = '655292360495-afgtuqg0rkdhd7gcc4c425l6v3302hp1.apps.googleusercontent.com';
        const idToken = await getGoogleIdToken(clientId);
        const res = await axios.post('http://localhost:8000/api/users/google-login', { id_token: idToken });
        
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
