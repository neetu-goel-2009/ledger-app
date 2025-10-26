import {
  Popup,
  View,
  Icon,
  Button,
  Navbar,
  NavTitle,
  NavLeft,
  NavRight,
} from "framework7-react";
import {
  Stack,
  Typography,
  Box,
  Badge,
  IconButton,
  useTheme,
  useMediaQuery,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  InputBase,
  Button,
  AppBar,
  Toolbar,
  Paper,
} from "@mui/material";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PersonIcon from "@mui/icons-material/Person";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LoginIcon from "@mui/icons-material/Login";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import newLogo from "../../../assets/food-app-logo.svg";
import Avatar from "../TextElem/Avatar";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getSelectedData } from "../../../store/components/library/library";
import { setToggleStatus } from "../../../store/components/uiInteraction/uiInteraction";

import "./header.scss";

// Simulate authentication state (replace with real auth logic)
const isLoggedIn = false; // Set to true if user is logged in

const Header = (props) => {
  const dispatch = useAppDispatch();
  const selectedSite = useAppSelector(getSelectedData("site"));
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);

  const handleMobileMenuOpen = (event) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  const handleProfileClick = () => {
    handleMobileMenuClose();
    props.onUserIconClick && props.onUserIconClick();
  };

  const handleLogin = () => {
    // Implement your login logic here
    if (props.onLogin) props.onLogin();
  };

  return (
    <AppBar
      position="sticky"
      elevation={2}
      color="inherit"
      sx={{
        background: theme.palette.background.paper,
        boxShadow: "0 2px 8px 0 rgba(0,0,0,0.04)",
        zIndex: theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar
        sx={{
          minHeight: 64,
          px: { xs: 2, sm: 4 },
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {/* Left: Logo & Menu */}
        <Stack direction="row" alignItems="center" spacing={2}>
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() =>
                dispatch(setToggleStatus({ key: "leftNav", status: true }))
              }
              sx={{ mr: 1 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Box
            component="img"
            src={newLogo}
            alt="Logo"
            sx={{ width: 40, height: 40, borderRadius: 2 }}
          />
          {!isMobile && (
            <Typography
              variant="h6"
              color="primary"
              sx={{ fontWeight: 700, letterSpacing: 1 }}
            >
              TallyXpert
            </Typography>
          )}
        </Stack>

        {/* Center: Location & Search */}
        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
          sx={{ flex: 1, justifyContent: "center", mx: 2 }}
        >
          <Box
            className="location-section"
            sx={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              px: 1.5,
              py: 0.5,
              borderRadius: 2,
              bgcolor: theme.palette.action.hover,
              mr: 2,
            }}
            onClick={() =>
              dispatch(setToggleStatus({ key: "site", status: true }))
            }
          >
            <LocationOnIcon sx={{ color: "primary.main", fontSize: 22, mr: 0.5 }} />
            <Typography
              noWrap
              sx={{
                fontWeight: 500,
                fontSize: { xs: "1rem", sm: "1.1rem" },
                color: "text.primary",
              }}
            >
              {selectedSite
                ? `${selectedSite.name}${selectedSite.variant ? `, ${selectedSite.variant}` : ""}`
                : "Select Location"}
            </Typography>
            <ArrowDropDownIcon sx={{ ml: 0.5 }} />
          </Box>
          {!isMobile && (
            <Paper
              elevation={0}
              sx={{
                display: "flex",
                alignItems: "center",
                px: 1.5,
                py: 0.5,
                borderRadius: 2,
                bgcolor: theme.palette.action.hover,
                minWidth: 260,
                width: 320,
              }}
            >
              <SearchIcon sx={{ color: "text.secondary", mr: 1 }} />
              <InputBase
                placeholder="Search accounts, transactions, etc."
                fullWidth
                className="search-input"
                sx={{ fontSize: "1rem" }}
              />
            </Paper>
          )}
        </Stack>

        {/* Right: Actions */}
        <Stack direction="row" alignItems="center" spacing={2}>
          {!isMobile && (
            <IconButton
              size="large"
              sx={{
                color: theme.palette.text.secondary,
                "&:hover": { backgroundColor: theme.palette.action.hover },
              }}
            >
              <Badge badgeContent={3} color="primary">
                <NotificationsOutlinedIcon />
              </Badge>
            </IconButton>
          )}
          {isLoggedIn ? (
            <>
              <IconButton
                size="large"
                onClick={isMobile ? handleMobileMenuOpen : handleProfileClick}
                sx={{
                  color: theme.palette.text.secondary,
                  "&:hover": { backgroundColor: theme.palette.action.hover },
                }}
              >
                <Avatar 
                  name="John Doe"
                  sx={{ 
                    width: 32, 
                    height: 32,
                    backgroundColor: theme.palette.primary.light,
                    color: theme.palette.primary.contrastText 
                  }} 
                />
              </IconButton>
            </>
          ) : (
            <>
              <Button
                variant="outlined"
                color="primary"
                size={isMobile ? "small" : "medium"}
                startIcon={<PersonOutlineIcon />}
                sx={{
                  borderRadius: 2,
                  fontWeight: 500,
                  textTransform: "none",
                  borderWidth: 1.5,
                }}
                onClick={() => props.onSignup?.()}
              >
                Sign up
              </Button>
              <Button
                variant="contained"
                color="primary"
                size={isMobile ? "small" : "medium"}
                startIcon={<LoginIcon />}
                sx={{
                  borderRadius: 2,
                  fontWeight: 500,
                  textTransform: "none",
                }}
                onClick={handleLogin}
              >
                Login
              </Button>
            </>
          )}
          {isMobile && isLoggedIn && (
            <IconButton
              size="large"
              onClick={handleMobileMenuOpen}
              sx={{
                color: theme.palette.text.secondary,
                ml: 1,
                "&:hover": { backgroundColor: theme.palette.action.hover },
              }}
            >
              <MoreVertIcon />
            </IconButton>
          )}
        </Stack>
      </Toolbar>

      {/* Mobile Search Bar */}
      {isMobile && (
        <Box
          sx={{
            px: 2,
            pb: 1,
            bgcolor: theme.palette.background.paper,
            borderBottom: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Paper
            elevation={0}
            sx={{
              display: "flex",
              alignItems: "center",
              px: 1.5,
              py: 0.5,
              borderRadius: 2,
              bgcolor: theme.palette.action.hover,
              mt: 1,
            }}
          >
            <SearchIcon sx={{ color: "text.secondary", mr: 1 }} />
            <InputBase
              placeholder="Search accounts, transactions, etc."
              fullWidth
              className="search-input"
              sx={{ fontSize: "1rem" }}
            />
          </Paper>
        </Box>
      )}

      {/* Mobile Menu */}
      <Menu
        anchorEl={mobileMenuAnchor}
        open={Boolean(mobileMenuAnchor)}
        onClose={handleMobileMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 200,
            borderRadius: 2,
            boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
          },
        }}
      >
        <MenuItem onClick={handleMobileMenuClose}>
          <ListItemIcon>
            <Badge badgeContent={3} color="primary">
              <ShoppingCartIcon fontSize="small" />
            </Badge>
          </ListItemIcon>
          <ListItemText>Cart (3)</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleProfileClick}>
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Profile</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleMobileMenuClose}>
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Settings</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleMobileMenuClose}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Header;
