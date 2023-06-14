import { Box, Button } from '@mui/material';
import Header from '../../components/Header';
import axios from 'axios';
import { useEffect, useState } from 'react';
import TableMonitors from './TablePrinters';
import FormPrinter from './FormPrinter';
import FormEditPrinter from './FormEditPrinter';

const initialValues = {
  nroinventario: '',
  nroserie: '',
  lugar: '',
  fabricante: '',
  modelo: '',
  tipo: '',
  pulgadas: '',
  estado: '',
};

const Printers = () => {
  const [openAddForm, setOpenAddForm] = useState(false);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [monitors, setMonitors] = useState([]);
  const [idToEdit, setIdToEdit] = useState('');
  const [valuesEdit, setValuesEdit] = useState('');
  const [valueModel, setValueModel] = useState('');

  const handleEditFormOpen = (id) => {
    const data = monitors.find((monitor) => monitor.nroinventario === id);
    if (data) {
      setIdToEdit(id);
      setValuesEdit({ ...data });
      setValueModel(data.modelo);
      setOpenEditForm(true);
    }
  };

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

  useEffect(() => {
    const fetchData = async () => {
      if (idToEdit) {
        try {
          const response = await axios.get(
            'http://localhost:8000/monitores/read/' + idToEdit
          );
          const data = response.data[0][0];
          //console.log(data);
          setValuesEdit(data);
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchData();
  }, [idToEdit]);

  const createData = async (data, dataName) => {
    try {
      await axios.post('http://localhost:8000/monitores', data);
      console.log(data);
      console.log(dataName);
      setMonitors([...monitors, dataName]);
    } catch (error) {
      console.log(error);
    } finally {
      setOpenAddForm(false);
    }
  };

  return (
    <Box m="20px">
      <Box display="flex" alignItems="center" gap="10px">
        <Header title="Impresoras" />
        <Box display="flex" gap="10px">
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setOpenAddForm(true)}
          >
            Agregar
          </Button>
        </Box>
      </Box>
      <TableMonitors
        monitors={monitors}
        //setConfirmDelete={setConfirmDelete}
        //setIdToDelete={setIdToDelete}
        //eliminar={handleDelete}
        //setOpenEditForm={setOpenEditForm}
        //setIdToEdit={setIdToEdit}
        handleEditFormOpen={handleEditFormOpen}
      />
      <FormPrinter
        open={openAddForm}
        setOpen={setOpenAddForm}
        createData={createData}
        initialValues={initialValues}
      />
      <FormEditPrinter
        title="Editar impresora"
        open={openEditForm}
        setOpen={setOpenEditForm}
        createData={createData}
        initialValues={valuesEdit}
      />
    </Box>
  );
};

export default Printers;
