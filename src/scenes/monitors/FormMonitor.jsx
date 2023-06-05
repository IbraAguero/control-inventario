import {
  Box,
  Button,
  DialogActions,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  useMediaQuery,
} from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';

const initialValues = {
  nroinventario: '',
  nroserie: '',
  lugar: '',
  fabricante: '',
  modelo: '',
  tipo: '',
  estado: '',
  pulgadas: '',
};

const FormMonitors = ({ setOpen, createData }) => {
  const [values, setValues] = useState(initialValues);
  const [places, setPlaces] = useState([]);
  const [states, setStates] = useState([]);
  const [makers, setMakers] = useState([]);
  const [models, setModels] = useState([]);
  const [types, setTypes] = useState([]);

  const isNonMobile = useMediaQuery('(min-width:600px)');

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
    if (values.fabricante) {
      axios
        .get(`http://localhost:8000/monitores/modelos/${values.fabricante.id}`)
        .then((res) => {
          setModels(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [values.fabricante]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    const valuesId = {
      ...values,
      fabricante: values.fabricante.id,
      estado: values.estado.id,
      lugar: values.lugar.id,
      modelo: values.modelo.id,
      tipo: values.tipo.id,
    };
    const valuesName = {
      ...values,
      fabricante: values.fabricante.nombre,
      estado: values.estado.nombre,
      lugar: values.lugar.nombre,
      modelo: values.modelo.nombre,
      tipo: values.tipo.nombre,
      fechaagregacion: formattedDate,
    };

    createData(valuesId, valuesName);
    handleReset();
  };

  const handleReset = () => {
    setValues(initialValues);
    setModels([]);
  };

  const handleInputChange = (fieldName, stateName, e) => {
    const selectedOption = stateName.find((el) => el.nombre === e.target.value);
    setValues({
      ...values,
      [fieldName]: selectedOption ? selectedOption : null,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        display="grid"
        gap="30px"
        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
        sx={{
          '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' },
        }}
      >
        <TextField
          margin="dense"
          id="nroinventario"
          label="Nro Inventario"
          type="text"
          variant="standard"
          sx={{ gridColumn: 'span 1' }}
          value={values.nroinventario}
          onChange={(e) =>
            setValues({ ...values, nroinventario: e.target.value })
          }
        />
        <TextField
          margin="dense"
          id="nroserie"
          label="Nro Serie"
          type="text"
          variant="standard"
          sx={{ gridColumn: 'span 2' }}
          value={values.nroserie}
          onChange={(e) => setValues({ ...values, nroserie: e.target.value })}
        />
        <FormControl
          variant="standard"
          fullWidth
          margin="dense"
          sx={{ m: 1, minWidth: 120, gridColumn: 'span 2' }}
        >
          <InputLabel id="lugar">Lugar</InputLabel>
          <Select
            labelId="lugar"
            id="lugar"
            label="Lugar"
            value={values.lugar ? values.lugar.nombre : ''}
            onChange={(e) => {
              handleInputChange('lugar', places, e);
            }}
          >
            {places.map((el) => (
              <MenuItem value={el.nombre} key={el.id}>
                {el.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl
          variant="standard"
          fullWidth
          margin="dense"
          sx={{ m: 1, minWidth: 120, gridColumn: 'span 2' }}
        >
          <InputLabel id="fabricante">Fabricante</InputLabel>
          <Select
            labelId="fabricante"
            id="fabricante"
            label="Fabricante"
            value={values.fabricante ? values.fabricante.nombre : ''}
            onChange={(e) => {
              handleInputChange('fabricante', makers, e);
            }}
            /* onChange={(e) => {
              const selectedFabricante = makers.find(
                (el) => el.nombre === e.target.value
              );
              setValues({
                ...values,
                fabricante: selectedFabricante ? selectedFabricante : null,
              });
            }} */
          >
            {makers.map((el) => (
              <MenuItem value={el.nombre} key={el.id}>
                {el.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl
          variant="standard"
          fullWidth
          margin="dense"
          sx={{ m: 1, minWidth: 120, gridColumn: 'span 1' }}
        >
          <InputLabel id="modelo">Modelo</InputLabel>
          <Select
            labelId="modelo"
            id="modelo"
            label="Modelo"
            value={values.modelo ? values.modelo.nombre : ''}
            onChange={(e) => {
              handleInputChange('modelo', models, e);
            }}
          >
            {models.map((el) => (
              <MenuItem value={el.nombre} key={el.id}>
                {el.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl
          variant="standard"
          fullWidth
          margin="dense"
          sx={{ m: 1, minWidth: 120 }}
        >
          <InputLabel id="tipo">Tipo</InputLabel>
          <Select
            labelId="tipo"
            id="tipo"
            label="tipo"
            value={values.tipo ? values.tipo.nombre : ''}
            onChange={(e) => {
              handleInputChange('tipo', types, e);
            }}
          >
            {types.map((el) => (
              <MenuItem value={el.nombre} key={el.id}>
                {el.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          margin="dense"
          id="pulgadas"
          label="Pulgadas"
          type="number"
          variant="standard"
          value={values.pulgadas}
          onChange={(e) => setValues({ ...values, pulgadas: e.target.value })}
        />
        <FormControl
          variant="standard"
          fullWidth
          margin="dense"
          sx={{ m: 1, minWidth: 120, gridColumn: 'span 1' }}
        >
          <InputLabel id="estado">Estado</InputLabel>
          <Select
            labelId="estado"
            id="estado"
            label="estado"
            value={values.estado ? values.estado.nombre : ''}
            onChange={(e) => {
              handleInputChange('estado', states, e);
            }}
          >
            {states.map((el) => (
              <MenuItem value={el.nombre} key={el.id}>
                {el.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <DialogActions>
        <Box display="flex" justifyContent="end" mt="20px" gap="10px">
          <Button
            onClick={() => {
              setOpen(false);
              handleReset();
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
    </form>
  );
};

export default FormMonitors;
