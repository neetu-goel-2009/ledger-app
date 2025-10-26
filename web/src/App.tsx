import React, { useState, Suspense, useEffect } from 'react';
import { ThemeProvider, CssBaseline, useMediaQuery, useTheme } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { App as F7App, View, f7ready } from 'framework7-react';
import { lightTheme, darkTheme } from './theme/theme';
import MainLayout from './components/layout/MainLayout';
import { routes } from './routes';

import LeftPanel from './panels/LeftPanel';
import Profile from './popup/Profile/Profile';
import ChangeSite from './popovers/ChangeSite';
import DynamicForm from './popup/DynamicForm/DynamicForm';
import ReloadPrompt from './ReloadPrompt';

import './App.scss';
import { verifyStoredToken } from './store/components/users/users';
import { useAppDispatch } from './store/hooks';
import type { AppRoute } from './routes';
import { useAppSelector } from './store/hooks';
import { getEnableOfflineMode } from './store/components/app/app';
import useOfflineSync from './modules/offline/hooks/useOfflineSync';
import { SyncProgressBar } from './modules/offline/components/SyncProgressBar';
import { Fab } from '@mui/material';
import SyncIcon from '@mui/icons-material/Sync';

const f7params = {
  // routes,
  // name: "Food Ecommerce App",
  // ...other params
};

// Loading component for Suspense fallback
const Loading = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100vh' 
  }}>
    Loading...
  </div>
);

function App() {
  const dispatch = useAppDispatch();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const theme = useTheme();
  const isMobile = !useMediaQuery(theme.breakpoints.up('sm'));
  const enableOfflineMode = useAppSelector(getEnableOfflineMode);
  const apiConfig = {
    clients: '/api/clients/sync',
    accounts: '/api/accounts/sync',
    ledger: '/api/ledger/sync',
  };
  const { syncing, progress, startSync } = useOfflineSync(enableOfflineMode, apiConfig);
  
  useEffect(() => {
    // Verify token on app startup
    dispatch(verifyStoredToken());
    
    f7ready((f7) => {
      // f7.dialog.alert("Component mounted");
    });
  }, [dispatch]);

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <F7App {...f7params} className={isMobile ? 'mobile-version' : 'browser-version'}>
        <View main url="/">

          {/* React Router and MainLayout */}
          <Router>
            <MainLayout onToggleTheme={toggleTheme} isDarkMode={isDarkMode}>
              <Suspense fallback={<Loading />}>
                <Routes>
                  <Route path="/" element={<Navigate to="/accounts" replace />} />
                  {routes.map((route: AppRoute) => {
                    if (route.redirect) {
                      return (
                        <Route
                          key={route.path}
                          path={route.path}
                          element={<Navigate to={route.redirect} replace />}
                        />
                      );
                    }
                    return (
                      <Route
                        key={route.path}
                        path={route.path}
                        element={route.element}
                      />
                    );
                  })}
                </Routes>
              </Suspense>
            </MainLayout>
          </Router>
          {/* Offline sync UI */}
          <SyncProgressBar visible={syncing} progress={progress} />
          {enableOfflineMode && (
            <Fab
              color="primary"
              aria-label="Sync Now"
              onClick={() => startSync()}
              sx={{ position: 'fixed', right: 16, bottom: 24, zIndex: (t) => t.zIndex.tooltip + 1 }}
              size={isMobile ? 'medium' : 'large'}
            >
              <SyncIcon />
            </Fab>
          )}
          {/* Framework7 panels and popups */}
          <LeftPanel />
          <Profile />
          <DynamicForm />
          <ChangeSite />
          <ReloadPrompt />
        </View>
      </F7App>
    </ThemeProvider>
  );
}

export default App;
