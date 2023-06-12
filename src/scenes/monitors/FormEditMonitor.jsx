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
  InputLabel,
  MenuItem,
  Select,
  TextField,
  useMediaQuery,
} from '@mui/material';

const validationSchema = Yup.object().shape({
  nroserie: Yup.string().required('Campo requerido'),
  lugar: Yup.string().required('Campo requerido'),
  estado: Yup.string().required('Campo requerido'),
  tipo: Yup.string().required('Campo requerido'),
  fabricante: Yup.string().required('Campo requerido'),
  modelo: Yup.string().required('Campo requerido'),
  pulgadas: Yup.string().required('Campo requerido'),
});

const FormEditMonitor = ({
  title,
  updateData,
  open,
  setOpen,
  initialValues,
  initialModel,
}) => {
  const [dataSelects, setDataSelects] = useState({});
  const [models, setModels] = useState([]);
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
          axios.get('http://localhost:8000/monitores/fabricantes2'),
        ]);

        const data = {
          lugares: responses[0].data,
          estados: responses[1].data,
          fabricantes: responses[2].data,
          tipos: responses[3].data,
          makers2: responses[4].data,
        };

        setDataSelects(data);
      } catch (error) {
        console.log('Error al hacer las peticiones:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (valueMaker) {
      const { id } = findByName(valueMaker, dataSelects.fabricantes);
      axios
        .get(`http://localhost:8000/monitores/modelos/${id}`)
        .then((res) => {
          setModels(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [valueMaker, dataSelects.fabricantes]);

  useEffect(() => {
    if (initialModel) {
      axios
        .get(`http://localhost:8000/monitores/modelos/read/${initialModel}`)
        .then((res) => {
          setModels(res.data[0]);
        })
        .catch((err) => console.log(err));
    }
  }, [initialModel]);

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
      fechaUltModificacion: formattedDate,
    };
    const valuesName = {
      ...values,
      fabricante: fabricante.nombre,
      estado: estado.nombre,
      lugar: lugar.nombre,
      modelo: modelo.nombre,
      tipo: tipo.nombre,
    };

    console.log(valuesId);
    console.log(valuesName);

    updateData(valuesId, valuesName);
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
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(valores, { resetForm }) => {
              handleSubmit(
                valores,
                dataSelects.lugares,
                dataSelects.tipos,
                dataSelects.estados,
                dataSelects.fabricantes,
                models
              );
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
                    '& > div': {
                      gridColumn: isNonMobile ? undefined : 'span 4',
                    },
                  }}
                >
                  <FormControl error={errors.nroinventario ? true : false}>
                    <Field
                      error={
                        touched.nroinventario && errors.nroinventario
                          ? true
                          : false
                      }
                      as={TextField}
                      disabled
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
                      {dataSelects.lugares.map((el) => (
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
                    error={
                      touched.fabricante && errors.fabricante ? true : false
                    }
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
                        setFieldValue('modelo', '');
                        setValueMaker(e.target.value);
                      }}
                    >
                      {dataSelects.fabricantes.map((el) => (
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
                      {/* {dataSelects.makers2
                        .find((el) => el.nombre === values.fabricante)
                        ?.modelos.map((el) => (
                          <MenuItem value={el.nombre} key={el.id}>
                            {el.nombre}
                          </MenuItem>
                        ))} */}
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
                      {dataSelects.tipos.map((el) => (
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
                      {dataSelects.estados.map((el) => (
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
                        //setOpen(false);
                        //handleReset();
                        console.log(initialValues);
                        console.log(initialModel);
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

export default FormEditMonitor;
