import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  FormControl,
  TextField,
  FormHelperText,
  Alert,
} from '@mui/material';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useSnackbar } from 'notistack';

const validationSchema = Yup.object().shape({
  currentPassword: Yup.string().required('Campo requerido'),
  newPassword: Yup.string()
    .min(8, 'Debe tener al menos 8 caracteres')
    .required('Campo requerido'),
  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Las contraseñas no coinciden')
    .required('Campo requerido'),
});

const FormUpdatePassword = ({ openDialog, handleCloseDialog }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const username = localStorage.getItem('username');

  const handleSubmit = async (values) => {
    try {
      const newValues = { ...values, username };
      console.log(newValues);
      const response = await axios.post(
        'http://localhost:8000/api/update-password',
        newValues
      );
      const data = response.data;
      if (data.message === 'Contraseña actualizada exitosamente') {
        handleCloseDialog(false);
        setSuccessMessage(data.message);
        enqueueSnackbar(data.message, { variant: 'success' });
      } else {
        setErrorMessage(data.message);
        setTimeout(() => {
          setErrorMessage('');
        }, 5000);
      }
    } catch (error) {
      console.error('Error al cambiar la contraseña:', error);
    }
  };

  return (
    <Dialog open={openDialog} onClose={() => handleCloseDialog(false)}>
      <DialogTitle
        sx={{
          background: '#444',
          fontSize: '20px',
          fontWeight: '600',
        }}
      >
        Cambiar de contraseña
      </DialogTitle>
      <DialogContent>
        <Formik
          initialValues={{
            currentPassword: '',
            newPassword: '',
            confirmNewPassword: '',
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => handleSubmit(values)}
        >
          {({ errors, touched }) => (
            <Form>
              <Box
                display="grid"
                gap="30px"
                marginTop={5}
                gridTemplateColumns="repeat(2, minmax(0, 1fr))"
              ></Box>
              <FormControl
                error={errors.currentPassword ? true : false}
                sx={{ m: 1, minWidth: 120, gridColumn: 'span 2' }}
              >
                <Field
                  error={
                    touched.currentPassword && errors.currentPassword
                      ? true
                      : false
                  }
                  as={TextField}
                  label="Contraseña actual"
                  type="password"
                  name="currentPassword"
                  fullWidth
                />
                <ErrorMessage
                  name="currentPassword"
                  component={() => (
                    <FormHelperText>{errors.currentPassword}</FormHelperText>
                  )}
                />
              </FormControl>
              <FormControl
                error={errors.newPassword ? true : false}
                sx={{ m: 1, minWidth: 120, gridColumn: 'span 2' }}
              >
                <Field
                  error={
                    touched.newPassword && errors.newPassword ? true : false
                  }
                  as={TextField}
                  label="Nueva contraseña"
                  type="password"
                  name="newPassword"
                  fullWidth
                />
                <ErrorMessage
                  name="newPassword"
                  component={() => (
                    <FormHelperText>{errors.newPassword}</FormHelperText>
                  )}
                />
              </FormControl>
              <FormControl
                error={errors.confirmNewPassword ? true : false}
                sx={{ m: 1, minWidth: 120, gridColumn: 'span 2' }}
              >
                <Field
                  error={
                    touched.confirmNewPassword && errors.confirmNewPassword
                      ? true
                      : false
                  }
                  as={TextField}
                  label="Confirmar nueva contraseña"
                  type="password"
                  name="confirmNewPassword"
                  fullWidth
                />
                <ErrorMessage
                  name="confirmNewPassword"
                  component={() => (
                    <FormHelperText>{errors.confirmNewPassword}</FormHelperText>
                  )}
                />
              </FormControl>
              <DialogActions>
                <Box display="flex" justifyContent="end" gap="10px">
                  <Button
                    color="neutral"
                    variant="outlined"
                    onClick={() => handleCloseDialog(false)}
                  >
                    Cancelar
                  </Button>
                  <Button type="submit" color="secondary" variant="contained">
                    Crear
                  </Button>
                </Box>
              </DialogActions>
              {errorMessage && (
                <Alert severity="error" sx={{ gridColumn: 'span 2' }} fullWidth>
                  {errorMessage}
                </Alert>
              )}
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default FormUpdatePassword;
