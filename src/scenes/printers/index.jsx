import { Box, Button, Dialog } from '@mui/material';
import Header from '../../components/Header';
import { useState } from 'react';
import FormPrinter from './FormPrinter';
import FormPage from './FormPage';

const Printers = () => {
  const [openAddForm, setOpenAddForm] = useState(false);
  const [openAddFormStep, setOpenAddFormStep] = useState(false);

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
      <Button
        variant="contained"
        color="secondary"
        onClick={() => setOpenAddFormStep(true)}
      >
        Agregar Step
      </Button>
      <FormPage
        title="Agregar impresora"
        open={openAddFormStep}
        onClose={() => setOpenAddFormStep(false)}
      />
      <Box width={500}></Box>
    </Box>
  );
};

export default Printers;
