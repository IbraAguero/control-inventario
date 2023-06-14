import { Box, Button } from '@mui/material';
import Header from '../../components/Header';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../login/AuthContext';

const Home = () => {
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Inicio" />
      </Box>
    </Box>
  );
};

export default Home;
