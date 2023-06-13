import { Box, Button } from '@mui/material';
import Header from '../../components/Header';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../login/AuthContext';

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated, setAuthentication } = useContext(AuthContext);
  const handleLogout = () => {
    // Realizar cualquier operación necesaria para cerrar la sesión
    localStorage.removeItem('isAuthenticated');
    setAuthentication(false);
    navigate('/');
  };
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Inicio" />
        <Button variant="contained" onClick={handleLogout}>
          Cerrar sesión
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
