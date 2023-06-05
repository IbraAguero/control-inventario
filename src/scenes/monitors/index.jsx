import { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import Header from '../../components/Header';
import ModalMui from '../global/ModalMui';
import axios from 'axios';

import FormMonitor from './FormMonitor';
import TableMonitors from './TableMonitors';

const Monitors = () => {
  const [openAddForm, setOpenAddForm] = useState(false);
  const [monitors, setMonitors] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8000/monitores')
      .then((res) => {
        // Se corrige el formato de la fecha
        const datosCorregidos = res.data.map((objeto) => {
          const fechaCompleta = objeto.fechaagregacion;
          const fecha = new Date(fechaCompleta);
          const año = fecha.getFullYear();
          const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
          const dia = fecha.getDate().toString().padStart(2, '0');

          const fechaCorregida = `${año}-${mes}-${dia}`;

          return {
            ...objeto,
            fechaagregacion: fechaCorregida,
          };
        });

        setMonitors(datosCorregidos);
      })
      .catch((err) => console.log(err));
  }, []);

  const createData = (data, dataName) => {
    axios
      .post('http://localhost:8000/monitores', data)
      .then(() => {
        console.log(data);
        console.log(dataName);
        setMonitors([...monitors, dataName]);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setOpenAddForm(false);
      });
  };

  return (
    <Box m="20px">
      <Box display="flex" alignItems="center" gap="10px">
        <Header title="Monitores" />
        <Box display="flex" gap="10px">
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setOpenAddForm(true)}
          >
            Agregar
          </Button>
          <Button variant="contained" color="neutral">
            Editar
          </Button>
        </Box>
      </Box>
      <TableMonitors monitors={monitors} />
      <ModalMui
        open={openAddForm}
        setOpen={setOpenAddForm}
        title={'Agregar Monitor'}
      >
        <FormMonitor setOpen={setOpenAddForm} createData={createData} />
      </ModalMui>
    </Box>
  );
};

export default Monitors;
