import {
  Box,
  Button,
  DialogActions,
  TextField,
  useMediaQuery,
} from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FormComputer = () => {
  const [values, setValues] = useState({
    lugar: '',
    cpucomputadora: '',
    ram: '',
    discohd: '',
    estado: '',
  });
  const isNonMobile = useMediaQuery('(min-width:600px)');
  /* const navigate = useNavigate(); */

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:8000/computadoras', values)
      .then((res) => {
        console.log(res);
        /* navigate('/computadoras'); */
        window.location.reload(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Box
      display="grid"
      gap="30px"
      gridTemplateColumns="repeat(4, minmax(0, 1fr))"
      sx={{
        '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' },
      }}
    >
      <form onSubmit={handleSubmit}>
        <TextField
          autoFocus
          fullWidth
          margin="dense"
          id="lugar"
          label="Lugar"
          type="text"
          variant="standard"
          sx={{ gridColumn: 'span 2' }}
          onChange={(e) => setValues({ ...values, lugar: e.target.value })}
        />
        <TextField
          margin="dense"
          id="cpu"
          label="CPU"
          type="text"
          variant="standard"
          sx={{ gridColumn: 'span 2' }}
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
          onChange={(e) => setValues({ ...values, ram: e.target.value })}
        />
        <TextField
          margin="dense"
          id="discohd"
          label="Disco HD"
          type="text"
          variant="standard"
          onChange={(e) => setValues({ ...values, discohd: e.target.value })}
        />
        <TextField
          margin="dense"
          id="estado"
          label="Estado"
          type="text"
          variant="standard"
          sx={{ gridColumn: 'span 2' }}
          onChange={(e) => setValues({ ...values, estado: e.target.value })}
        />
        <DialogActions>
          <Box display="flex" justifyContent="end" mt="20px" gap="10px">
            <Button type="submit" color="secondary" variant="outlined">
              Agregar
            </Button>
          </Box>
        </DialogActions>
      </form>
    </Box>
  );
};

export default FormComputer;
