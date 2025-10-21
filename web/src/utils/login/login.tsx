import { AppDispatch } from "../../store/store";
import { setToggleStatus, setDynamicFormData } from "../../store/components/uiInteraction/uiInteraction";
import { setUser, setToken, logout } from "../../store/components/users/users";
import { Box, Button, Divider, Typography } from "@mui/material";
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
    dispatch(setToggleStatus({ key: "loginForm", status: false }));
    
    return { success: true };
  } catch (err) {
    return { 
      success: false, 
      error: err?.toString?.() || 'Unknown error during Google login'
    };
  }
};

export const renderLoginFormExtras = (dispatch: AppDispatch, isLoggedIn: boolean) => {
  return (
    <Box sx={{ textAlign: "center" }}>
      <br />
      <Divider sx={{ marginBottom: 2 }}>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Or continue with
        </Typography>
      </Divider>

      <Button
        variant="outlined"
        fullWidth
        size="small"
        sx={{
          height: 40,
          borderRadius: 2,
          padding: "12px 24px",
          marginBottom: 2,
          borderColor: "divider",
          color: "text.primary",
          backgroundColor: "background.paper",
          "&:hover": {
            backgroundColor: "action.hover",
            borderColor: "divider",
          },
        }}
        startIcon={
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
            style={{ width: 18, height: 18 }}
          />
        }
        onClick={async () => {
          const result = await handleGoogleLogin(dispatch);
          if (!result.success) {
            alert('Google login failed: ' + result.error);
          }
        }}
      >
        Sign in with Google
      </Button>

      <Divider sx={{ marginBottom: 2 }}>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Don't have an account?
        </Typography>
      </Divider>
      
      <Button
        variant="outlined"
        fullWidth
        size="small"
        sx={{
          height: 32,
          borderRadius: 2,
          padding: "12px 24px",
          borderColor: "primary.main",
          color: "primary.main",
          "&:hover": {
            backgroundColor: "rgba(255, 107, 53, 0.08)",
            borderColor: "primary.dark",
          },
        }}
        onClick={() => {
          if (isLoggedIn) {
            dispatch(setToggleStatus({ key: "profilePage", status: false }));
          } else {
            dispatch(setToggleStatus({ key: "loginForm", status: false }));
          }
          dispatch(setToggleStatus({ key: "registerForm", status: true }));
        }}
      >
        Create New Account
      </Button>
    </Box>
  );
};
