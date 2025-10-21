import React from 'react';
import { Toolbar, Link } from "framework7-react";
import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Home,
  Search,
  ShoppingCart,
  Favorite,
  Person
} from '@mui/icons-material';

import "./footer.scss";

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  if (!isMobile) {
    return null; // Hide footer on desktop
  }

  return (
    <Paper
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        borderTop: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.paper
      }}
      elevation={3}
    >
      <BottomNavigation
        value={value}
        onChange={handleChange}
        sx={{
          height: 64,
          '& .MuiBottomNavigationAction-root': {
            minWidth: 'auto',
            padding: '6px 12px 8px',
            '&.Mui-selected': {
              color: theme.palette.primary.main
            }
          }
        }}
      >
        <BottomNavigationAction
          label="Home"
          value="home"
          icon={<Home />}
          sx={{
            '& .MuiBottomNavigationAction-label': {
              fontSize: '0.75rem',
              fontWeight: 500
            }
          }}
        />
        <BottomNavigationAction
          label="Search"
          value="search"
          icon={<Search />}
          sx={{
            '& .MuiBottomNavigationAction-label': {
              fontSize: '0.75rem',
              fontWeight: 500
            }
          }}
        />
        <BottomNavigationAction
          label="Cart"
          value="cart"
          icon={<ShoppingCart />}
          sx={{
            '& .MuiBottomNavigationAction-label': {
              fontSize: '0.75rem',
              fontWeight: 500
            }
          }}
        />
        <BottomNavigationAction
          label="Favorites"
          value="favorites"
          icon={<Favorite />}
          sx={{
            '& .MuiBottomNavigationAction-label': {
              fontSize: '0.75rem',
              fontWeight: 500
            }
          }}
        />
        <BottomNavigationAction
          label="Profile"
          value="profile"
          icon={<Person />}
          sx={{
            '& .MuiBottomNavigationAction-label': {
              fontSize: '0.75rem',
              fontWeight: 500
            }
          }}
        />
      </BottomNavigation>
    </Paper>
  );
};

export default Footer;
