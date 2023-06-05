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
  lugar: '',
  cpucomputadora: '',
  ram: '',
  discohd: '',
  estado: '',
};

const FormAddComputer = ({ setOpen, createData }) => {
  const [values, setValues] = useState(initialValues);
  const [places, setPlaces] = useState([]);
  const [states, setStates] = useState([]);
  const isNonMobile = useMediaQuery('(min-width:600px)');

  /* useEffect(() => {
    axios
      .get('http://localhost:8000/lugares')
      .then((res) => {
        setPlaces(res.data);
      })
      .catch((err) => console.log(err));
  }, []); */

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await axios.all([
          axios.get('http://localhost:8000/lugares'),
          axios.get('http://localhost:8000/estados'),
        ]);
        setPlaces(responses[0].data);
        setStates(responses[1].data);
      } catch (error) {
        console.log('Error al hacer las peticiones:', error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    createData(values);

    handleReset();
  };

  const handleReset = () => {
    setValues(initialValues);
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
            value={values.lugar}
            onChange={(e) => setValues({ ...values, lugar: e.target.value })}
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
          sx={{ m: 1, minWidth: 120 }}
        >
          <InputLabel id="lugar">Estado</InputLabel>
          <Select
            labelId="estado"
            id="estado"
            label="Estado"
            value={values.estado}
            onChange={(e) => setValues({ ...values, estado: e.target.value })}
          >
            {states.map((el) => (
              <MenuItem value={el.nombre} key={el.id}>
                {el.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          margin="dense"
          id="cpu"
          label="CPU"
          type="text"
          variant="standard"
          sx={{ gridColumn: 'span 2' }}
          value={values.cpucomputadora}
          onChange={(e) =>
            setValues({ ...values, cpucomputadora: e.target.value })
          }
        />
        <TextField
          margin="dense"
          id="ram"
          label="RAM"
          type="text"
          variant="standard"
          value={values.ram}
          onChange={(e) => setValues({ ...values, ram: e.target.value })}
        />
        <TextField
          margin="dense"
          id="discohd"
          label="Disco HD"
          type="text"
          variant="standard"
          value={values.discohd}
          onChange={(e) => setValues({ ...values, discohd: e.target.value })}
        />
        {/* <TextField
          margin="dense"
          id="estado"
          label="Estado"
          type="text"
          variant="standard"
          sx={{ gridColumn: 'span 2' }}
          value={values.estado}
          onChange={(e) => setValues({ ...values, estado: e.target.value })}
        /> */}
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

export default FormAddComputer;
