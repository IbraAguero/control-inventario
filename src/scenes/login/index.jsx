import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
//import logo from './img/logo.png';
import TextField from '@mui/material/TextField';
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  Alert,
  Container,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { AuthContext } from './AuthContext';

function Login() {
  const { setAuthentication } = useContext(AuthContext);

  const [values, setValues] = useState({
    usuario: '',
    password: '',
  });

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
    setErrors((prev) => ({
      ...prev,
      [event.target.name]: '',
    }));
    setLoginError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!values.usuario || !values.password) {
      setErrors({
        usuario: !values.usuario ? 'Por favor, ingrese un usuario' : '',
        password: !values.password ? 'Por favor, ingrese una contraseña' : '',
      });
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/login', values);
      const data = response.data;

      if (data === 'Success') {
        setAuthentication(true);
        console.log('holaa');
        localStorage.setItem('isAuthenticated', 'true');
        navigate('/');
      } else {
        setLoginError('Credenciales incorrectas');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const passwordAdornment = (
    <InputAdornment position="end">
      <IconButton
        aria-label="toggle password visibility"
        onClick={handleClickShowPassword}
        onMouseDown={handleMouseDownPassword}
        edge="end"
      >
        {showPassword ? <Visibility /> : <VisibilityOff />}
      </IconButton>
    </InputAdornment>
  );

  return (
    <Box
      bgcolor="primary.main"
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Container
        maxWidth="xs"
        sx={{
          display: 'grid',
          placeItems: 'center',
          height: '100%',
        }}
      >
        <Box
          p={3}
          bgcolor="black"
          borderRadius="8px"
          textAlign="center"
          width="100%"
          maxWidth="400px"
        >
          {/* d:\Drive\ITSE\proyecto\login\front-login\src\AuthContext.jsx */}
          <form onSubmit={handleSubmit}>
            <Box mt={3}>
              <TextField
                fullWidth
                label="Usuario"
                variant="outlined"
                error={Boolean(errors.usuario)}
                helperText={errors.usuario}
                onChange={handleChange}
                name="usuario"
                autoComplete="off"
              />
            </Box>

            <Box mt={3}>
              <FormControl
                fullWidth
                variant="outlined"
                error={Boolean(errors.password)}
              >
                <InputLabel htmlFor="outlined-adornment-password">
                  Contraseña
                </InputLabel>
                <OutlinedInput
                  onChange={handleChange}
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={passwordAdornment}
                  label="Contraseña"
                  name="password"
                />
                {errors.password && (
                  <FormHelperText>{errors.password}</FormHelperText>
                )}
              </FormControl>
            </Box>

            {loginError && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {loginError}
              </Alert>
            )}

            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
              Iniciar sesión
            </Button>
          </form>
        </Box>
      </Container>
    </Box>
  );
}

export default Login;
