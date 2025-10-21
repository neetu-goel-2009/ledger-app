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
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";

import { useAppDispatch, useAppSelector } from "../../store/hooks";

import { getFormData, getLoginStatus, getUser, logout } from "../../store/components/users/users";
import {
  setToggleStatus,
  getToggleStatus,
} from "../../store/components/uiInteraction/uiInteraction";
import { handleProfileUpdate as utilsHandleProfileUpdate } from "../../utils/profile";

export default () => {
  const isLoggedIn = useAppSelector(getLoginStatus);
  const toggleStatus = useAppSelector(getToggleStatus);
  const user = useAppSelector(getUser);
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isMobile = !useMediaQuery(theme.breakpoints.up('sm'));
  const userFormData = useAppSelector(getFormData);

  const handleProfileUpdate = () => {
    utilsHandleProfileUpdate(dispatch, userFormData, { user });
  };

  return (
    <Popup
      id="my-popup"
      className="ledger-popup popup-from-left"
      opened={toggleStatus("profilePage")}
      onPopupSwipeClose={() => {
        dispatch(setToggleStatus({ key: "profilePage", status: false }));
      }}
      onPopupClose={() => {
        dispatch(setToggleStatus({ key: "profilePage", status: false }));
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
                  right: 16,
                  color: "primary.contrastText",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
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
              
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  margin: "0 auto 16px",
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  border: "3px solid rgba(255, 255, 255, 0.3)",
                }}
              >
                <PersonIcon sx={{ fontSize: 40 }} />
              </Avatar>
              <Typography variant="h5" sx={{ fontWeight: 600, marginBottom: 1 }}>
                {user.name || user.fullName || 'No Name'}
              </Typography>
              {/* <Chip
                label="Premium Member"
                size="small"
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  color: "primary.contrastText",
                  fontWeight: 500,
                }}
              /> */}
            </Box>

            {/* Profile Content */}
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
                <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: 600 }}>
                  Personal Information
                </Typography>
                
                <List sx={{ padding: 0 }}>
                  <ListItem sx={{ padding: "12px 0" }}>
                    <ListItemIcon>
                      <EmailIcon sx={{ color: "primary.main" }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Email"
                      secondary={user.email || 'No email provided'}
                      primaryTypographyProps={{ fontWeight: 500 }}
                    />
                  </ListItem>
                  
                  <Divider />
                  
                  <ListItem sx={{ padding: "12px 0" }}>
                    <ListItemIcon>
                      <PhoneIcon sx={{ color: "primary.main" }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Phone"
                      secondary={user.phone || 'No phone provided'}
                      primaryTypographyProps={{ fontWeight: 500 }}
                    />
                  </ListItem>
                  
                  <Divider />
                  
                  {/* <ListItem sx={{ padding: "12px 0" }}>
                    <ListItemIcon>
                      <LocationOnIcon sx={{ color: "primary.main" }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Location"
                      secondary={user.location || 'No location provided'}
                      primaryTypographyProps={{ fontWeight: 500 }}
                    />
                  </ListItem> */}
                </List>
              </Paper>

              {/* Action Buttons */}
              <Stack spacing={2}>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<EditIcon />}
                  onClick={() => {
                    handleProfileUpdate();
                  }}
                  sx={{
                    borderRadius: 2,
                    padding: "12px 24px",
                    borderColor: "primary.main",
                    color: "primary.main",
                    "&:hover": {
                      backgroundColor: "rgba(255, 107, 53, 0.08)",
                      borderColor: "primary.dark",
                    },
                  }}
                >
                  Edit Profile
                </Button>
                
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<LogoutIcon />}
                  onClick={() => {
                    dispatch(logout());
                    dispatch(setToggleStatus({ key: "profilePage", status: false }));
                  }}
                  sx={{
                    borderRadius: 2,
                    padding: "12px 24px",
                    backgroundColor: "error.main",
                    "&:hover": {
                      backgroundColor: "error.dark",
                    },
                  }}
                >
                  Sign Out
                </Button>
              </Stack>
            </Box>
          </Box>
        </Page>
      </View>
    </Popup>
  );
};
