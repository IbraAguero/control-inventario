import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import axios from 'axios';
import { Field, Form, Formik } from 'formik';

const FormUser = ({ openDialog, handleCloseDialog }) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const createUser = async (data) => {
      try {
        await axios.post('http://localhost:8000/monitores', data);
      } catch (error) {
        console.log(error);
      }
    };

    createUser();
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
          <Formik>
            {() => {
              <Form>
                <Box
                  display="grid"
                  gap="30px"
                  marginTop={5}
                  gridTemplateColumns="repeat(2, minmax(0, 1fr))"
                >
                  <Field as={TextField} label="Nombre de usuario" fullWidth />
                  <Field
                    as={TextField}
                    label="Contraseña"
                    type="password"
                    fullWidth
                  />
                </Box>
                {errorMessage && <p>{errorMessage}</p>}
              </Form>;
            }}
          </Formik>
        </DialogContent>
        <DialogActions>
          <Box display="flex" justifyContent="end" gap="10px">
            <Button
              color="neutral"
              variant="outlined"
              onClick={handleCloseDialog}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              color="secondary"
              variant="contained"
              onClick={handleSubmit}
            >
              Crear
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FormUser;
