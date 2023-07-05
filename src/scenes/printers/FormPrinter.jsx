import { useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  TextField,
  useMediaQuery,
} from '@mui/material';
import CustomSelect from '../../components/CustomSelect';

const validationSchema = Yup.object().shape({
  nroserie: Yup.string().required('Campo requerido'),
  lugar: Yup.string().required('Campo requerido'),
  estado: Yup.string().required('Campo requerido'),
  tipo: Yup.string().required('Campo requerido'),
  fabricante: Yup.string().required('Campo requerido'),
  modelo: Yup.string().required('Campo requerido'),
  pulgadas: Yup.string().required('Campo requerido'),
  nroinventario: Yup.string()
    .matches(/^[A-Z]{2}-\d{2,}$/, 'Formato invalido, Ej: MO-10')
    .required('Campo requerido')
    .test(
      'validar-nroinventario',
      'Ya está registrado',
      async function (value) {
        try {
          const response = await axios.get(
            `http://localhost:8000/monitores/validacion/${value}`
          );
          const { isRegistered } = response.data;
          return !isRegistered;
        } catch (error) {
          console.error(
            'Error al realizar la validación del nroinventario:',
            error
          );
          return false;
        }
      }
    ),
});

const FormPrinter = ({ title, open, setOpen }) => {
  const [dataSelects, setDataSelects] = useState({});
  const [models, setModels] = useState([]);
  const [valueMaker, setValueMaker] = useState('');

  const isNonMobile = useMediaQuery('(min-width:600px)');

  const findByName = (name, element) => {
    return element.find((el) => el.nombre === name);
  };

  return (
    <>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogTitle
          sx={{
            background: '#444',
            fontSize: '20px',
            fontWeight: '600',
          }}
        >
          {title}
        </DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{
              lugar: '',
              fabricante: '',
              nroserie: '',
              nroinventario: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(valores, { resetForm }) => {
              console.log(valores);
              resetForm();
            }}
          >
            {({ errors, touched, setFieldValue }) => (
              <Form>
                <Box
                  display="grid"
                  gap="30px"
                  gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  sx={{
                    '& > div': {
                      gridColumn: isNonMobile ? undefined : 'span 4',
                    },
                  }}
                >
                  <FormControl
                    error={errors.nroinventario ? true : false}
                    sx={{ gridColumn: 'span 2' }}
                  >
                    <Field
                      error={
                        touched.nroinventario && errors.nroinventario
                          ? true
                          : false
                      }
                      as={TextField}
                      name="nroinventario"
                      id="nroinventario"
                      margin="dense"
                      label="Nro Inventario"
                      type="text"
                      variant="standard"
                      autoComplete="off"
                    />
                    <ErrorMessage
                      name="nroinventario"
                      component={() => (
                        <FormHelperText>{errors.nroinventario}</FormHelperText>
                      )}
                    />
                  </FormControl>
                  <FormControl
                    error={errors.nroserie ? true : false}
                    sx={{ gridColumn: 'span 2' }}
                  >
                    <Field
                      error={touched.nroserie && errors.nroserie ? true : false}
                      as={TextField}
                      id="nroserie"
                      name="nroserie"
                      margin="dense"
                      label="Nro Serie"
                      type="text"
                      variant="standard"
                      autoComplete="off"
                    />
                    <ErrorMessage
                      name="nroserie"
                      component={() => (
                        <FormHelperText>{errors.nroserie}</FormHelperText>
                      )}
                    />
                  </FormControl>
                  <CustomSelect
                    name="lugar"
                    url={'http://localhost:8000/lugares'}
                    touched={touched.lugar}
                    errors={errors.lugar}
                    handleChange={(e) => {
                      //setModel(data);
                      setFieldValue('lugar', e.target.value);
                    }}
                  />
                  <CustomSelect
                    name="fabricante"
                    url={'http://localhost:8000/monitores/fabricantes'}
                    touched={touched.fabricante}
                    errors={errors.fabricante}
                    handleChange={(e) => {
                      //setModel(data);
                      setFieldValue('fabricante', e.target.value);
                    }}
                  />
                  {/* <SelectList
                    name="fabricante"
                    url={'http://localhost:8000/monitores/fabricantes'}
                    errors={errors.fabricante}
                    handleChange={(e, data) => {
                      //setModel(data);
                      setFieldValue('fabricante', e.target.value);
                    }}
                  /> */}
                </Box>
                <DialogActions>
                  <Box display="flex" justifyContent="end" mt="20px" gap="10px">
                    <Button
                      onClick={() => {
                        setOpen(false);
                        //handleReset();
                        //console.log(initialValues);
                        //console.log(initialModel);
                      }}
                      color="neutral"
                      variant="outlined"
                    >
                      Cancelar
                    </Button>
                    <Button type="submit" color="secondary" variant="outlined">
                      {'Agregar'}
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

export default FormPrinter;
