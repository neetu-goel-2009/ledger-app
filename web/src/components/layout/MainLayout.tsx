import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
  Switch,
  FormControlLabel,
  Stack,
  Badge,
  Button,
  Tooltip,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  AccountBalance as AccountBalanceIcon,
  Category as CatalogIcon,
  Assessment as ReportsIcon,
  Savings as InvestmentsIcon,
  Security as InsuranceIcon,
  Timeline as SIPIcon,
  ShowChart as SharesIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  PersonOutline as PersonOutlineIcon,
  NotificationsOutlined as NotificationsOutlinedIcon,
  Login as LoginIcon,
  MoreVert as MoreVertIcon,
  ShoppingCart as ShoppingCartIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import Avatar from "../common/TextElem/Avatar";
import { useLocation, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setToggleStatus, setDynamicFormData } from "../../store/components/uiInteraction/uiInteraction";
import { Page, View } from 'framework7-react';
import { 
  getLoginStatus, 
  getUser,
  updateFormStructure,
  logout,
} from "../../store/components/users/users";
import { LoginFormExtras } from '../login/LoginFormExtras';
import { loadGoogleScript, getGoogleIdToken } from '../../utils/login/google/GoogleAuth';
import axios from 'axios';
import NotificationsPopover from '../common/NotificationsPopover/NotificationsPopover';
import { getFormData } from "../../store/components/users/users";
import { handleLogin as utilsHandleLogin } from '../../utils/login';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(2),
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(3),
    marginLeft: `${drawerWidth}px`,
    width: `calc(100% - ${drawerWidth}px)`,
    ...(open === false && {
      marginLeft: 0,
      width: '100%',
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    }),
    ...(open === true && {
      marginLeft: `${drawerWidth}px`,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  },
  [theme.breakpoints.down('sm')]: {
    marginLeft: 0,
    width: '100%',
    paddingTop: theme.spacing(8),
    padding: theme.spacing(2),
  },
}));

const AppBarStyled = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<{ open?: boolean }>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  [theme.breakpoints.up('sm')]: {
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const DrawerHeaderBox = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

interface MainLayoutProps {
  children: React.ReactNode;
  onToggleTheme: () => void;
  isDarkMode: boolean;
}

const navigationItems = [
  { text: 'Accounts', icon: <AccountBalanceIcon />, path: '/accounts' },
  { text: 'Catalog', icon: <CatalogIcon />, path: '/catalog' },
  { text: 'Reports', icon: <ReportsIcon />, path: '/reports' },
  { text: 'Investments', icon: <InvestmentsIcon />, path: '/investments' },
  { text: 'Insurance', icon: <InsuranceIcon />, path: '/insurance' },
  { text: 'SIPs', icon: <SIPIcon />, path: '/sips' },
  { text: 'Shares', icon: <SharesIcon />, path: '/shares' },
];


export default function MainLayout({ children, onToggleTheme, isDarkMode, ...props }: MainLayoutProps) {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = !useMediaQuery(theme.breakpoints.up('sm'));
  const isLoggedIn = useAppSelector(getLoginStatus);
  const currentUser = useAppSelector(getUser);
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);
  const [notificationAnchor, setNotificationAnchor] = useState<HTMLElement | null>(null);
  const userFormData = useAppSelector(getFormData);
  // const signupFormData = userFormData("signupForm");

  useEffect(() => {
    // On desktop, drawer is open by default, on mobile it's closed
    setOpen(!isMobile);
    loadGoogleScript();
  }, [isMobile]);

  const handleDrawerOpen = () => {
    console.log('Opening drawer', isMobile);  // Debug log
    setOpen(true);
  };

  const handleDrawerClose = () => {
    console.log('Closing drawer', isMobile);  // Debug log
    setOpen(false);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    if (isMobile) {
      setOpen(false);
    }
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  const handleProfileClick = () => {
    handleMobileMenuClose();
    dispatch(setToggleStatus({ key: "profilePage", status: true }));
  };

  const handleLogin = () => {
    utilsHandleLogin(dispatch, userFormData, isLoggedIn);
  };

  const handleSignup = () => {
    // Implement your login logic here
    // if (props.onLogin) props.onLogin();
    dispatch(setToggleStatus({ key: "registerForm", status: true }));
  };

  
const appBarObj = {
  login: { text: 'Login', icon: <LoginIcon />, onclick: handleLogin },
  logout: { text: 'Logout', icon: <LogoutIcon />, onclick: () => {
    dispatch(logout());
    navigate('/');
  }},
  signup: { text: 'Sign up', icon: <PersonOutlineIcon />, onclick: handleSignup /*props.onSignup*/ },
  notify: { text: 'Notification', icon: <NotificationsOutlinedIcon />, onclick: (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setNotificationAnchor(event.currentTarget);
  } },
  profile: { text: 'Profile', icon: <PersonIcon />, onclick: handleProfileClick },
  settings: { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
  cart: { text: 'Cart', icon: <ShoppingCartIcon />, path: '/cart' },
  theme: { text: isDarkMode ? "Light Mode": "Dark Mode", icon: isDarkMode ? <LightModeIcon /> : <DarkModeIcon />, onclick: onToggleTheme },
  seperator: "separator",
};

  let appBarItems = []
  let appBarMenuItems = []
  
  if (isLoggedIn) {
    if (isMobile) {
      appBarItems = [appBarObj.notify];
      appBarMenuItems = [/*appBarObj.profile, appBarObj.seperator,*/ appBarObj.settings, appBarObj.theme, appBarObj.logout];
    } else {
      appBarItems = [appBarObj.notify, appBarObj.theme];
      appBarMenuItems = [appBarObj.settings, appBarObj.logout];
    }
  } else {
    if (isMobile) {
      appBarItems = [appBarObj.notify, appBarObj.login];
      appBarMenuItems = [appBarObj.signup, appBarObj.seperator, appBarObj.settings, appBarObj.theme];
    } else {
      appBarItems = [appBarObj.notify, appBarObj.seperator, appBarObj.login, appBarObj.seperator, appBarObj.signup, appBarObj.seperator];
      appBarMenuItems = [appBarObj.settings, appBarObj.theme];
    }
  }

  return (
    <Box sx={{ display: 'flex', height: '100vh', background: theme.palette.background.default }}>
      <AppBarStyled position="fixed" open={open}>
        <Toolbar sx={{ minHeight: '56px', px: { xs: 1, sm: 2 } }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            onTouchEnd={(e) => {
              e.preventDefault();
              handleDrawerOpen();
            }}
            edge="start"
            sx={{ 
              mr: 2,
              ...(open && { display: 'none' }),
              WebkitTapHighlightColor: 'transparent',
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography 
            variant="h6" 
            noWrap 
            component="div" 
            sx={{ 
              flexGrow: 1,
              fontSize: { xs: '1.1rem', sm: '1.25rem' }
            }}
          >
            Ledger App
          </Typography>
          <Stack direction="row" alignItems="center" spacing={2}>
            {appBarItems.map((item, index) => (
              <React.Fragment key={`${item.text}-${index}`}>
                {appBarObj.seperator === item ? (
                  <></>
                ) : (
                  <Tooltip key={item.text} title={item.text}>
                    <IconButton
                      color="inherit"
                      onClick={item.onclick}
                      aria-label={item.text.toLowerCase()}
                    >
                      {item.icon}
                    </IconButton>
                  </Tooltip>
                )}
              </React.Fragment>
            ))}

            {isLoggedIn && (
              <IconButton
                size="large"
                // onClick={isMobile ? handleMobileMenuOpen : handleProfileClick}
                onClick={handleProfileClick}
                sx={{
                  color: theme.palette.text.secondary,
                  "&:hover": { backgroundColor: theme.palette.action.hover },
                }}
              >
                <Avatar
                  name={currentUser?.name || currentUser?.fullName || ''}
                  sx={{
                    width: 32,
                    height: 32,
                    backgroundColor: theme.palette.primary.light,
                    color: theme.palette.primary.contrastText,
                  }}
                />
              </IconButton>
            )}

            {/* Only show MoreVertIcon on mobile */}
            {(
              <IconButton
                size="large"
                onClick={handleMobileMenuOpen}
                onTouchEnd={(e) => {
                  e.preventDefault(); // Prevent Framework7's touch handling
                  handleMobileMenuOpen(e as any);
                }}
                sx={{
                  color: theme.palette.text.secondary,
                  ml: 1,
                  "&:hover": { backgroundColor: theme.palette.action.hover },
                  cursor: 'pointer',
                  WebkitTapHighlightColor: 'transparent', // Remove tap highlight on mobile
                }}
              >
                <MoreVertIcon />
              </IconButton>
            )}
          </Stack>
          
        </Toolbar>

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
          sx={{
            zIndex: 9999, // Ensure menu appears above Framework7 elements
            '& .MuiPaper-root': {
              mt: 1,
              minWidth: 200,
              borderRadius: 2,
              boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
              backgroundColor: theme.palette.background.paper,
            },
          }}
          PaperProps={{
            elevation: 8
          }}
          MenuListProps={{
            sx: {
              py: 1
            }
          }}
        >
          {appBarMenuItems.map((item, index) => (
            <React.Fragment key={`${item.text}-${index}`}>
              {appBarObj.seperator === item ? (
                <Divider sx={{ my: 1 }} />
              ) : (
                <MenuItem 
                  onClick={() => {
                    handleMobileMenuClose();
                    if (item.onclick) item.onclick();
                  }}
                  sx={{
                    minHeight: 40,
                    px: 2,
                    py: 1,
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 36 }}>{item.icon}</ListItemIcon>
                  <ListItemText>{item.text}</ListItemText>
                </MenuItem>
              )}
            </React.Fragment>
          ))}
        </Menu>

        <NotificationsPopover
          anchorEl={notificationAnchor}
          onClose={() => setNotificationAnchor(null)}
        />
      </AppBarStyled>
      <Drawer
        sx={{
          zIndex: 9999,
          width: drawerWidth,
          flexShrink: 0,
          display: 'flex',
          position: 'fixed',
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            background: theme.palette.background.paper,
            borderRight: isMobile ? 'none' : '1px solid #eee',
            boxShadow: isMobile ? '0 0 15px rgba(0,0,0,0.15)' : 'none',
            zIndex: theme.zIndex.drawer + 2,
            height: '100%',
            position: 'fixed',
          },
          '& .MuiBackdrop-root': {
            zIndex: theme.zIndex.drawer + 1,
          }
        }}
        variant={isMobile ? "temporary" : "persistent"}
        anchor="left"
        open={open}
        onClose={handleDrawerClose}
        ModalProps={{ 
          keepMounted: true,
        }}
        BackdropProps={{
          sx: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }
        }}
        componentsProps={{
          backdrop: {
            invisible: false
          }
        }}
      >
        <DrawerHeader>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            width: '100%', 
            px: 2,
            justifyContent: 'space-between' 
          }}>
            <Typography variant="h6" noWrap>
              Menu
            </Typography>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </Box>
        </DrawerHeader>
        <Divider />
        <List>
          {navigationItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                selected={location.pathname === item.path}
                onClick={() => handleNavigation(item.path)}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open} sx={{ p: { xs: 1, sm: 2 }, background: 'transparent', minHeight: '100vh', overflowY: 'auto' }}>
        <DrawerHeaderBox />
        {children}
      </Main>
    </Box>  );}