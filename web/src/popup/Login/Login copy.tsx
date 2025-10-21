import {
  Popup,
  View,
  NavRight,
  Block,
  Link,
  Page,
  Navbar,
} from "framework7-react";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Typography,
  Button,
  Stack,
  Divider,
  IconButton,
  Paper,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

import { useAppDispatch, useAppSelector } from "../../store/hooks";

import {
  getLoginStatus,
  getFormData,
} from "../../store/components/users/users";
import {
  setToggleStatus,
  getToggleStatus,
} from "../../store/components/uiInteraction/uiInteraction";

import FormRenderer from "../../components/common/FormRenderer/FormRenderer";

export default () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(getLoginStatus);
  const theme = useTheme();
  const isMobile = !useMediaQuery(theme.breakpoints.up('sm'));
  const formData = useAppSelector(getFormData("loginForm"));
  const toggleStatus = useAppSelector(getToggleStatus);

  return (
    <Popup
      id="my-popup"
      className="ledger-popup"
      opened={toggleStatus("loginForm")}
      onPopupSwipeClose={() => {
        dispatch(setToggleStatus({ key: "loginForm", status: false }));
      }}
      onPopupClose={() => {
        dispatch(setToggleStatus({ key: "loginForm", status: false }));
      }}
    >
      <View>
        <Page>
          <Box
            sx={{
              backgroundColor: "background.paper",
              minHeight: "100vh",
              padding: 0,
            }}
          >
            {/* Header */}
            <Box
              sx={{
                backgroundColor: "primary.main",
                color: "primary.contrastText",
                padding: 3,
                textAlign: "center",
                borderRadius: isMobile ? "0 0 16px 16px" : "0 0",
                position: "relative",
              }}
            >
              <IconButton
                sx={{
                  position: "absolute",
                  top: 16,
                  width: "40px",
                  right: 16,
                  color: "primary.contrastText",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    color: "primary.contrastText",
                  },
                }}
                onClick={() => {
                  if (isLoggedIn)
                    dispatch(
                      setToggleStatus({ key: "profilePage", status: false })
                    );
                  else
                    dispatch(
                      setToggleStatus({ key: "loginForm", status: false })
                    );
                }}
              >
                <CloseIcon />
              </IconButton>
              
              <PersonIcon sx={{ fontSize: 48, marginBottom: 2 }} />
              <Typography variant="h5" sx={{ fontWeight: 600, marginBottom: 1 }}>
                Welcome Back
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                Sign in to your account
              </Typography>
            </Box>

            {/* Form Content */}
            <Box sx={{ padding: 3 }}>
              <Paper
                elevation={0}
                sx={{
                  padding: 3,
                  backgroundColor: "background.default",
                  borderRadius: 2,
                  marginBottom: 3,
                }}
              >
                <FormRenderer formData={formData} />
              </Paper>

              {/* Sign Up Link */}
              <Box sx={{ textAlign: "center" }}>
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
                    if (isLoggedIn)
                      dispatch(
                        setToggleStatus({ key: "profilePage", status: false })
                      );
                    else
                      dispatch(
                        setToggleStatus({ key: "loginForm", status: false })
                      );
                    dispatch(
                      setToggleStatus({ key: "registerForm", status: true })
                    );
                  }}
                >
                  Create New Account
                </Button>
              </Box>
            </Box>
          </Box>
        </Page>
      </View>
    </Popup>
  );
};
