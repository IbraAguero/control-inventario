import { useEffect, useState } from 'react';
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
import SelectList from './SelectList';

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

const FormEditPrinter = ({
  title,
  createData,
  open,
  setOpen,
  initialValues,
}) => {
  const [maker, setMaker] = useState([]);
  const [model, setModel] = useState([]);
  const [type, setType] = useState([]);
  const [place, setPlace] = useState([]);
  const [state, setState] = useState([]);
  const [models, setModels] = useState([]);

  const isNonMobile = useMediaQuery('(min-width:600px)');

  const handleSubmit = (values, maker, model, type, place, state) => {
    //Para obtener la fecha
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    const valuesId = {
      ...values,
      fabricante: maker.id,
      estado: state.id,
      lugar: place.id,
      modelo: model.id,
      tipo: type.id,
    };
    const valuesName = {
      ...values,
      fabricante: maker.nombre,
      estado: state.nombre,
      lugar: place.nombre,
      modelo: model.nombre,
      tipo: type.nombre,
      fechaagregacion: formattedDate,
    };

    console.log(valuesId);
    console.log(valuesName);
    createData(valuesId, valuesName);
  };

  useEffect(() => {
    if (initialValues) {
      axios
        .get(
          `http://localhost:8000/monitores/modelos/read/${initialValues.modelo}`
        )
        .then((res) => {
          setModels(res.data[0]);
          //console.log(models);
        })
        .catch((err) => console.log(err));
    }
  }, [initialValues.modelo]);

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
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(valores, { resetForm }) => {
              handleSubmit(valores, maker, model, type, place, state);
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
                    sx={{ minWidth: 120, gridColumn: 'span 2' }}
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
                    sx={{ minWidth: 120, gridColumn: 'span 2' }}
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
                  <FormControl
                    error={
                      touched.fabricante && errors.fabricante ? true : false
                    }
                    variant="standard"
                    fullWidth
                    margin="dense"
                    sx={{ m: 1, minWidth: 120, gridColumn: 'span 1' }}
                  >
                    <SelectList
                      name="fabricante"
                      url={'http://localhost:8000/monitores/fabricantes'}
                      errors={errors.fabricante}
                      handleChange={(e, data) => {
                        setMaker(data);
                        setFieldValue('fabricante', e.target.value);
                        setFieldValue('modelo', '');
                      }}
                    />
                  </FormControl>
                  <FormControl
                    error={touched.modelo && errors.modelo ? true : false}
                    variant="standard"
                    fullWidth
                    margin="dense"
                    sx={{ m: 1, minWidth: 120, gridColumn: 'span 1' }}
                  >
                    <SelectList
                      name="modelo"
                      url={`http://localhost:8000/monitores/modelos/${maker.id}`}
                      errors={errors.modelo}
                      initialValues={models}
                      handleChange={(e, data) => {
                        setModel(data);
                        setFieldValue('modelo', e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormControl
                    error={touched.tipo && !!errors.tipo}
                    variant="standard"
                    fullWidth
                    margin="dense"
                    sx={{ m: 1, minWidth: 120, gridColumn: 'span 1' }}
                  >
                    <SelectList
                      name="tipo"
                      url={`http://localhost:8000/monitores/tipos`}
                      errors={errors.tipo}
                      handleChange={(e, data) => {
                        setType(data);
                        setFieldValue('tipo', e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormControl error={errors.pulgadas ? true : false}>
                    <Field
                      error={touched.pulgadas && errors.pulgadas ? true : false}
                      as={TextField}
                      name="pulgadas"
                      id="pulgadas"
                      margin="dense"
                      label="Pulgadas"
                      type="number"
                      variant="standard"
                    />
                    <ErrorMessage
                      name="pulgadas"
                      component={() => (
                        <FormHelperText>{errors.pulgadas}</FormHelperText>
                      )}
                    />
                  </FormControl>
                  <FormControl
                    error={touched.lugar && errors.lugar ? true : false}
                    variant="standard"
                    fullWidth
                    margin="dense"
                    sx={{ m: 1, minWidth: 120, gridColumn: 'span 2' }}
                  >
                    <SelectList
                      name="lugar"
                      url={'http://localhost:8000/lugares'}
                      errors={errors.lugar}
                      handleChange={(e, data) => {
                        setPlace(data);
                        setFieldValue('lugar', e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormControl
                    error={touched.estado && !!errors.estado}
                    variant="standard"
                    fullWidth
                    margin="dense"
                    sx={{ m: 1, minWidth: 120, gridColumn: 'span 1' }}
                  >
                    <SelectList
                      name="estado"
                      url={`http://localhost:8000/estados`}
                      errors={errors.estado}
                      handleChange={(e, data) => {
                        setState(data);
                        setFieldValue('estado', e.target.value);
                      }}
                    />
                  </FormControl>
                </Box>
                <DialogActions>
                  <Box display="flex" justifyContent="end" mt="20px" gap="10px">
                    <Button
                      onClick={() => {
                        //setOpen(false);
                        console.log(type);
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

export default FormEditPrinter;
