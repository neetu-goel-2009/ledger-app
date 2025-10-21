import React from 'react';
import { Box, Button, Divider, Typography } from "@mui/material";
import { AppDispatch } from "../../store/store";
import { setToggleStatus } from "../../store/components/uiInteraction/uiInteraction";
import { handleGoogleLogin } from '../../utils/login/googleLogin';
import { handleFacebookLogin } from '../../utils/login/facebookLogin';

interface LoginFormExtrasProps {
  dispatch: AppDispatch;
  isLoggedIn: boolean;
}

export const LoginFormExtras: React.FC<LoginFormExtrasProps> = ({ dispatch, isLoggedIn }) => {
  const handleFacebookClick = () => {
    handleFacebookLogin(dispatch).then(result => {
      if (!result.success) {
        alert('Facebook login failed: ' + result.error);
      }
    });
  };

  const handleGoogleClick = () => {
    handleGoogleLogin(dispatch).then(result => {
      if (!result.success) {
        alert('Google login failed: ' + result.error);
      }
    });
  };

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
        onClick={handleGoogleClick}
      >
        Sign in with Google
      </Button>

      <Button
        variant="outlined"
        fullWidth
        size="small"
        sx={{
          height: 40,
          borderRadius: 2,
          padding: "12px 24px",
          marginBottom: 2,
          borderColor: "#3b5998",
          color: "#3b5998",
          backgroundColor: "background.paper",
          "&:hover": {
            backgroundColor: "action.hover",
            borderColor: "#3b5998",
          },
        }}
        startIcon={
          <img
            src="https://www.facebook.com/images/fb_icon_325x325.png"
            alt="Facebook"
            style={{ width: 18, height: 18, borderRadius: 3 }}
          />
        }
        onClick={handleFacebookClick}
      >
        Sign in with Facebook
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