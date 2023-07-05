import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  TextField,
} from '@mui/material';
import axios from 'axios';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Campo requerido'),
  email: Yup.string().email('Formato inválido').required('Campo requerido'),
  password: Yup.string()
    .min(8, 'Debe tener al menos 8 carácteres')
    .required('Campo requerido'),
});
const FormUser = ({ openDialog, handleCloseDialog }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [errorMessage, setErrorMessage] = useState('');
  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(
        'http://localhost:8000/api/users',
        values
      );
      console.log(response);
      const data = response.data;
      console.log(data);
      console.log(data.message);

      if (data.message === 'Usuario creado exitosamente') {
        handleCloseDialog();
        enqueueSnackbar(data.message, { variant: 'success' });
      } else {
        setErrorMessage(data.message);
        console.log('Error');
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      }
    } catch (error) {
      console.error('Error al crear el usuario:', error);
    }
  };

  return (
    <>
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth>
        <DialogTitle
          sx={{
            background: '#444',
            fontSize: '20px',
            fontWeight: '600',
          }}
        >
          Alta de usuario
        </DialogTitle>
        <DialogContent>
          <Formik
            validateOnBlur={false}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
              handleSubmit(values);
              resetForm();
            }}
            initialValues={{ name: '', email: '', password: '' }}
          >
            {({ errors, touched }) => (
              <Form>
                <Box
                  display="grid"
                  gap="30px"
                  marginTop={5}
                  gridTemplateColumns="repeat(2, minmax(0, 1fr))"
                >
                  <FormControl
                    error={errors.name ? true : false}
                    sx={{ m: 1, minWidth: 120, gridColumn: 'span 2' }}
                  >
                    <Field
                      error={touched.name && errors.name ? true : false}
                      as={TextField}
                      label="Nombre de usuario"
                      fullWidth
                      name="name"
                    />
                    <ErrorMessage
                      name="name"
                      component={() => (
                        <FormHelperText>{errors.name}</FormHelperText>
                      )}
                    />
                  </FormControl>
                  <FormControl
                    error={errors.email ? true : false}
                    sx={{ m: 1, minWidth: 120, gridColumn: 'span 2' }}
                  >
                    <Field
                      error={touched.email && errors.email ? true : false}
                      as={TextField}
                      label="Email"
                      fullWidth
                      name="email"
                    />
                    <ErrorMessage
                      name="email"
                      component={() => (
                        <FormHelperText>{errors.email}</FormHelperText>
                      )}
                    />
                  </FormControl>
                  <FormControl
                    error={errors.password ? true : false}
                    sx={{ m: 1, minWidth: 120, gridColumn: 'span 2' }}
                  >
                    <Field
                      error={touched.password && errors.password ? true : false}
                      as={TextField}
                      label="Contraseña"
                      type="password"
                      name="password"
                      fullWidth
                    />
                    <ErrorMessage
                      name="password"
                      component={() => (
                        <FormHelperText>{errors.password}</FormHelperText>
                      )}
                    />
                  </FormControl>
                  {errorMessage && (
                    <Alert
                      severity="error"
                      sx={{ gridColumn: 'span 2' }}
                      fullWidth
                    >
                      {errorMessage}
                    </Alert>
                  )}
                </Box>
                <DialogActions>
                  <Box display="flex" justifyContent="end" gap="10px">
                    <Button
                      color="neutral"
                      variant="outlined"
                      onClick={handleCloseDialog}
                    >
                      Cancelar
                    </Button>
                    <Button type="submit" color="secondary" variant="contained">
                      Crear
                    </Button>
                  </Box>
                </DialogActions>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FormUser;
