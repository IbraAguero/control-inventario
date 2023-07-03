import { Box, Button } from '@mui/material';
import Header from '../../components/Header';
import { useState } from 'react';
import FormPrinter from './FormPrinter';

const Printers = () => {
  const [openAddForm, setOpenAddForm] = useState(false);

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Impresoras" />
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setOpenAddForm(true)}
        >
          Agregar
        </Button>
        <FormPrinter open={openAddForm} setOpen={setOpenAddForm} />
      </Box>
    </Box>
  );
};

export default Printers;
