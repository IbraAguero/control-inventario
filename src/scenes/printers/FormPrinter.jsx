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
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  useMediaQuery,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import DeleteIcon from '@mui/icons-material/Delete';
import { StyledMenu } from '../../components/StyledMenu';
import CustomSelect from './CustomSelect';

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

  //menu
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
            initialValues={{ lugar: '' }}
            validationSchema={validationSchema}
            onSubmit={(valores, { resetForm }) => {
              console.log(valores);
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
                  <FormControl
                    error={touched.lugar && errors.lugar ? true : false}
                    variant="standard"
                    fullWidth
                    sx={{
                      m: 1,
                      minWidth: 120,
                      gridColumn: 'span 2',
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <InputLabel id="lugar">Lugar</InputLabel>
                      <Field
                        as={Select}
                        name="lugar"
                        id="lugar"
                        labelId="lugar"
                        label="Lugar"
                        fullWidth
                      >
                        {dataSelects.lugares &&
                          dataSelects.lugares.map((el) => (
                            <MenuItem value={el.nombre} key={el.id}>
                              {el.nombre}
                            </MenuItem>
                          ))}
                      </Field>
                      <IconButton
                        id="basic-button"
                        aria-controls={openMenu ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={openMenu ? 'true' : undefined}
                        onClick={handleClick}
                        sx={{ marginTop: 2 }}
                      >
                        <AddIcon />
                      </IconButton>
                      <StyledMenu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={openMenu}
                        onClose={handleClose}
                        MenuListProps={{
                          'aria-labelledby': 'basic-button',
                        }}
                      >
                        <MenuItem onClick={handleClose} disableRipple>
                          <LibraryAddIcon />
                          Agregar
                        </MenuItem>
                        <MenuItem onClick={handleClose} disableRipple>
                          <EditIcon />
                          Editar
                        </MenuItem>
                        <MenuItem onClick={handleClose} disableRipple>
                          <DeleteIcon />
                          Eliminar
                        </MenuItem>
                      </StyledMenu>
                    </Box>
                    <ErrorMessage
                      name="lugar"
                      component={() => (
                        <FormHelperText>{errors.lugar}</FormHelperText>
                      )}
                    />
                  </FormControl>
                  <CustomSelect errors={errors} touched={touched} />
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
