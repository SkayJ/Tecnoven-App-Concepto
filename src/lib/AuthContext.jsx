import React, { createContext, useState, useContext, useEffect } from 'react';
import localClient from '@/api/localClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [isLoadingPublicSettings, setIsLoadingPublicSettings] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [appPublicSettings, setAppPublicSettings] = useState(null);

  useEffect(() => {
    checkUserAuth();
  }, []);

  const checkUserAuth = async () => {
    try {
      setIsLoadingAuth(true);
      setAuthError(null);
      const currentUser = await localClient.auth.me();
      setUser(currentUser);
      setIsAuthenticated(true);
      setAuthChecked(true);
      setAppPublicSettings({ id: 'local-app', public_settings: { mode: 'local' } });
    } catch (error) {
      const demoSession = localClient.auth?.me?.() ? null : null;
      if (!demoSession) {
        const fallbackSession = localClient.auth?.loginViaEmailPassword
          ? await localClient.auth.loginViaEmailPassword('demo@tecnoven.com', 'demo123').catch(() => null)
          : null;

        if (fallbackSession?.user) {
          setUser(fallbackSession.user);
          setIsAuthenticated(true);
          setAuthChecked(true);
          setAppPublicSettings({ id: 'local-app', public_settings: { mode: 'local' } });
        } else {
          setUser(null);
          setIsAuthenticated(false);
          setAuthChecked(true);
          setAuthError(null);
        }
      }
    } finally {
      setIsLoadingAuth(false);
      setIsLoadingPublicSettings(false);
    }
  };

  const checkAppState = async () => {
    await checkUserAuth();
  };

  const logout = (shouldRedirect = true) => {
    setUser(null);
    setIsAuthenticated(false);
    localClient.auth.logout(shouldRedirect ? '/login' : null);
  };

  const navigateToLogin = () => {
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      isLoadingAuth,
      isLoadingPublicSettings,
      authError,
      appPublicSettings,
      authChecked,
      logout,
      navigateToLogin,
      checkUserAuth,
      checkAppState,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
