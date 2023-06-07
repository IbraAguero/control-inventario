import {
  Box,
  Button,
  DialogActions,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  useMediaQuery,
} from '@mui/material';
import axios from 'axios';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';

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

const FormMonitors = ({ setOpen, createData }) => {
  const [places, setPlaces] = useState([]); // *Factorizar para no usar tantos estados
  const [states, setStates] = useState([]);
  const [makers, setMakers] = useState([]);
  const [models, setModels] = useState([]);
  const [types, setTypes] = useState([]);
  const [valueMaker, setValueMaker] = useState('');

  const isNonMobile = useMediaQuery('(min-width:600px)');

  const findByName = (name, element) => {
    return element.find((el) => el.nombre === name);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await axios.all([
          axios.get('http://localhost:8000/lugares'),
          axios.get('http://localhost:8000/estados'),
          axios.get('http://localhost:8000/monitores/fabricantes'),
          axios.get('http://localhost:8000/monitores/tipos'),
        ]);
        setPlaces(responses[0].data);
        setStates(responses[1].data);
        setMakers(responses[2].data);
        setTypes(responses[3].data);
      } catch (error) {
        console.log('Error al hacer las peticiones:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (valueMaker) {
      const { id } = findByName(valueMaker, makers);
      axios
        .get(`http://localhost:8000/monitores/modelos/${id}`)
        .then((res) => {
          setModels(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [valueMaker, makers]);

  const handleSubmit = (values, place, type, state, maker, model) => {
    //Para obtener la fecha
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    const lugar = findByName(values.lugar, place);
    const tipo = findByName(values.tipo, type);
    const estado = findByName(values.estado, state);
    const fabricante = findByName(values.fabricante, maker);
    const modelo = findByName(values.modelo, model);

    const valuesId = {
      ...values,
      fabricante: lugar.id,
      estado: estado.id,
      lugar: lugar.id,
      modelo: modelo.id,
      tipo: tipo.id,
    };
    const valuesName = {
      ...values,
      fabricante: fabricante.nombre,
      estado: estado.nombre,
      lugar: lugar.nombre,
      modelo: modelo.nombre,
      tipo: tipo.nombre,
      fechaagregacion: formattedDate,
    };

    //console.log(valuesId);
    //console.log(valuesName);
    createData(valuesId, valuesName);
  };

  return (
    <>
      <Formik
        initialValues={{
          nroinventario: '',
          nroserie: '',
          lugar: '',
          fabricante: '',
          modelo: '',
          tipo: '',
          pulgadas: '',
          estado: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(valores, { resetForm }) => {
          handleSubmit(valores, places, types, states, makers, models);
          resetForm();
        }}
      >
        {({ errors, touched, values, setFieldValue }) => (
          <Form>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' },
              }}
            >
              <FormControl error={errors.nroinventario ? true : false}>
                <Field
                  error={
                    touched.nroinventario && errors.nroinventario ? true : false
                  }
                  as={TextField}
                  name="nroinventario"
                  id="nroinventario"
                  margin="dense"
                  label="Nro Inventario"
                  type="text"
                  variant="standard"
                  autoComplete="off"
                  sx={{ gridColumn: 'span 1' }}
                />
                <ErrorMessage
                  name="nroinventario"
                  component={() => (
                    <FormHelperText>{errors.nroinventario}</FormHelperText>
                  )}
                />
              </FormControl>
              <FormControl error={errors.nroserie ? true : false}>
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
                  sx={{ gridColumn: 'span 2' }}
                />
                <ErrorMessage
                  name="nroserie"
                  component={() => (
                    <FormHelperText>{errors.nroserie}</FormHelperText>
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
                <InputLabel id="lugar">Lugar</InputLabel>
                <Field
                  as={Select}
                  name="lugar"
                  id="lugar"
                  labelId="lugar"
                  label="Lugar"
                >
                  {places.map((el) => (
                    <MenuItem value={el.nombre} key={el.id}>
                      {el.nombre}
                    </MenuItem>
                  ))}
                </Field>
                <ErrorMessage
                  name="lugar"
                  component={() => (
                    <FormHelperText>{errors.lugar}</FormHelperText>
                  )}
                />
              </FormControl>
              <FormControl
                error={touched.fabricante && errors.fabricante ? true : false}
                variant="standard"
                fullWidth
                margin="dense"
                sx={{ m: 1, minWidth: 120, gridColumn: 'span 2' }}
              >
                <InputLabel id="fabricante">Fabricante</InputLabel>
                <Field
                  as={Select}
                  name="fabricante"
                  labelId="fabricante"
                  id="fabricante"
                  label="Fabricante"
                  value={values.fabricante}
                  onChange={(e) => {
                    setFieldValue('fabricante', e.target.value);
                    setValueMaker(e.target.value);
                  }}
                >
                  {makers.map((el) => (
                    <MenuItem value={el.nombre} key={el.id}>
                      {el.nombre}
                    </MenuItem>
                  ))}
                </Field>
                <ErrorMessage
                  name="fabricante"
                  component={() => (
                    <FormHelperText>{errors.fabricante}</FormHelperText>
                  )}
                />
              </FormControl>
              <FormControl
                error={touched.modelo && errors.modelo ? true : false}
                variant="standard"
                fullWidth
                margin="dense"
                sx={{ m: 1, minWidth: 120, gridColumn: 'span 1' }}
              >
                <InputLabel id="modelo">Modelo</InputLabel>
                <Field
                  as={Select}
                  name="modelo"
                  id="modelo"
                  labelId="modelo"
                  label="Modelo"
                >
                  {models.map((el) => (
                    <MenuItem value={el.nombre} key={el.id}>
                      {el.nombre}
                    </MenuItem>
                  ))}
                </Field>
                <ErrorMessage
                  name="modelo"
                  component={() => (
                    <FormHelperText>{errors.modelo}</FormHelperText>
                  )}
                />
              </FormControl>
              <FormControl
                error={touched.tipo && errors.tipo ? true : false}
                variant="standard"
                fullWidth
                margin="dense"
                sx={{ m: 1, minWidth: 120 }}
              >
                <InputLabel id="tipo">Tipo</InputLabel>
                <Field
                  as={Select}
                  name="tipo"
                  id="tipo"
                  labelId="tipo"
                  label="tipo"
                >
                  {types.map((el) => (
                    <MenuItem value={el.nombre} key={el.id}>
                      {el.nombre}
                    </MenuItem>
                  ))}
                </Field>
                <ErrorMessage
                  name="tipo"
                  component={() => (
                    <FormHelperText>{errors.tipo}</FormHelperText>
                  )}
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
                error={touched.estado && errors.estado ? true : false}
                variant="standard"
                fullWidth
                margin="dense"
                sx={{ m: 1, minWidth: 120, gridColumn: 'span 1' }}
              >
                <InputLabel id="estado">Estado</InputLabel>
                <Field
                  as={Select}
                  name="estado"
                  labelId="estado"
                  id="estado"
                  label="estado"
                >
                  {states.map((el) => (
                    <MenuItem value={el.nombre} key={el.id}>
                      {el.nombre}
                    </MenuItem>
                  ))}
                </Field>
                <ErrorMessage
                  name="estado"
                  component={() => (
                    <FormHelperText>{errors.estado}</FormHelperText>
                  )}
                />
              </FormControl>
            </Box>
            <DialogActions>
              <Box display="flex" justifyContent="end" mt="20px" gap="10px">
                <Button
                  onClick={() => {
                    setOpen(false);
                    //handleReset();
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
    </>
  );
};

export default FormMonitors;
