import { useEffect } from "react";
import {
  Popup,
  View,
  NavRight,
  Block,
  Link,
  Page,
  Navbar,
} from "framework7-react";
import {
  Box,
  Typography,
  Button,
  Stack,
  Divider,
  IconButton,
  Paper,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

import { useAppDispatch, useAppSelector } from "../../store/hooks";

import {
  getFormData,
  updateFormStructure,
} from "../../store/components/users/users";
import {
  setToggleStatus,
  getToggleStatus,
} from "../../store/components/uiInteraction/uiInteraction";

import FormRenderer from "../../components/common/FormRenderer/FormRenderer";

export default () => {
  const dispatch = useAppDispatch();

  const formData = useAppSelector(getFormData)("signupForm");
  const toggleStatus = useAppSelector(getToggleStatus);
  const theme = useTheme();
  const isMobile = !useMediaQuery(theme.breakpoints.up('sm'));
      
  useEffect(() => {
    setTimeout(() => {
      // dispatch(updateFormStructure({ key: "signupForm", structure: formData.structure }));
    }, 2000);
  }, []);

  return (
    <Popup
      id="my-popup"
      className="ledger-popup"
      opened={toggleStatus("registerForm")}
      onPopupSwipeClose={() => {
        dispatch(setToggleStatus({ key: "registerForm", status: false }));
      }}
      onPopupClose={() => {
        dispatch(setToggleStatus({ key: "registerForm", status: false }));
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
                  dispatch(
                    setToggleStatus({ key: "registerForm", status: false })
                  );
                }}
              >
                <CloseIcon />
              </IconButton>
              
              <PersonAddIcon sx={{ fontSize: 48, marginBottom: 2 }} />
              <Typography variant="h5" sx={{ fontWeight: 600, marginBottom: 1 }}>
                Join Us Today
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                Create your account to get started
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

              {/* Sign In Link */}
              <Box sx={{ textAlign: "center" }}>
                <Divider sx={{ marginBottom: 2 }}>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Already have an account?
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
                      backgroundColor: "rgba(46, 125, 50, 0.08)",
                      borderColor: "primary.dark",
                    },
                  }}
                  onClick={() => {
                    dispatch(
                      setToggleStatus({ key: "registerForm", status: false })
                    );
                    dispatch(
                      setToggleStatus({ key: "loginForm", status: true })
                    );
                  }}
                >
                  Sign In Instead
                </Button>
              </Box>
            </Box>
          </Box>
        </Page>
      </View>
    </Popup>
  );
};
