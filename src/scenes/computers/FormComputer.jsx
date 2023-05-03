import {
  Box,
  Button,
  DialogActions,
  TextField,
  useMediaQuery,
} from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';

const FormComputer = ({ setOpen, id }) => {
  const [values, setValues] = useState({
    lugar: '',
    cpucomputadora: '',
    ram: '',
    discohd: '',
    estado: '',
  });
  const isNonMobile = useMediaQuery('(min-width:600px)');

  useEffect(() => {
    axios
      .get('http://localhost:8000/read/' + id)
      .then((res) => {
        console.log(res);
        const data = res.data[0];
        setValues({
          ...values,
          lugar: data.lugar,
          cpucomputadora: data.cpucomputadora,
          ram: data.ram,
          discohd: data.discohd,
          estado: data.estado,
        });
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:8000/computadoras', values)
      .then((res) => {
        console.log(res);
        window.location.reload(true);
      })
      .catch((err) => console.log(err));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put('http://localhost:8000/update/' + id, values)
      .then((res) => {
        console.log(res);
        window.location.reload(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <form onSubmit={id ? handleUpdate : handleSubmit}>
      <Box
        display="grid"
        gap="30px"
        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
        sx={{
          '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' },
        }}
      >
        <TextField
          autoFocus
          fullWidth
          margin="dense"
          id="lugar"
          label="Lugar"
          type="text"
          variant="standard"
          sx={{ gridColumn: 'span 2' }}
          value={values.lugar}
          onChange={(e) => setValues({ ...values, lugar: e.target.value })}
        />
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
        <TextField
          margin="dense"
          id="estado"
          label="Estado"
          type="text"
          variant="standard"
          sx={{ gridColumn: 'span 2' }}
          value={values.estado}
          onChange={(e) => setValues({ ...values, estado: e.target.value })}
        />
      </Box>
      <DialogActions>
        <Box display="flex" justifyContent="end" mt="20px" gap="10px">
          <Button
            onClick={() => setOpen(false)}
            color="neutral"
            variant="outlined"
          >
            Cancelar
          </Button>
          <Button type="submit" color="secondary" variant="outlined">
            {id ? 'Editar' : 'Agregar'}
          </Button>
        </Box>
      </DialogActions>
    </form>
  );
};

export default FormComputer;
