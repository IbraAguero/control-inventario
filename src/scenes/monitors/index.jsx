import { Box, Button } from '@mui/material';
import Header from '../../components/Header';
import ModalMui from '../global/ModalMui';
import { useState } from 'react';
import FormMonitor from './FormMonitor';

const Monitors = () => {
  const [open, setOpen] = useState(false);

  return (
    <Box m="20px">
      <Box display="flex" alignItems="center" gap="10px">
        <Header title="Monitores" />
        <Box display="flex" gap="10px">
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setOpen(true)}
          >
            Agregar
          </Button>
          <Button variant="contained" color="neutral">
            Editar
          </Button>
        </Box>
      </Box>
      <ModalMui open={open} setOpen={setOpen} title={'Agregar Monitor'}>
        <FormMonitor />
      </ModalMui>
    </Box>
  );
};

export default Monitors;
