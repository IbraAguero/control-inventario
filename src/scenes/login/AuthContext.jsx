import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext({
  isAuthenticated: false,
  user: '',
  setAuthentication: () => {},
  updateUser: () => {},
});

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState('');

  // Función para actualizar el estado de autenticación
  const setAuthentication = (value) => {
    setIsAuthenticated(value);
  };

  // Función para actualizar el usuario autenticado
  const updateUser = (username) => {
    setUser(username);
  };

  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    if (storedAuth) {
      setAuthentication(true);
    }
  }, [setAuthentication, isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, setAuthentication, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
