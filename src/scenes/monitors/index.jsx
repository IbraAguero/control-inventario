import { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import { useConfirm } from 'material-ui-confirm';
import Header from '../../components/Header';
import FormMonitor from './FormMonitor';
import TableMonitors from './TableMonitors';
import FormEditMonitor from './FormEditMonitor';
import axios from 'axios';

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

const Monitors = () => {
  const [openAddForm, setOpenAddForm] = useState(false);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [monitors, setMonitors] = useState([]);
  const [idToEdit, setIdToEdit] = useState(null);
  const [valuesEdit, setValuesEdit] = useState(initialValues);
  const [valueModel, setValueModel] = useState('');

  const confirm = useConfirm();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/monitores');

        const datosCorregidos = response.data.map((objeto) => {
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
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (idToEdit) {
        try {
          const response = await axios.get(
            'http://localhost:8000/monitores/read/' + idToEdit
          );
          const data = response.data[0][0];
          setValuesEdit({ ...data, modelo: data.modelo });
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
      setMonitors([...monitors, dataName]);
    } catch (error) {
      console.log(error);
    } finally {
      setOpenAddForm(false);
    }
  };

  const updateData = async (data, dataName) => {
    try {
      await axios.put(
        'http://localhost:8000/monitores/update/' + idToEdit,
        data
      );
      let newData = monitors.map((el) =>
        el.nroinventario === idToEdit ? dataName : el
      );
      setMonitors(newData);
    } catch (error) {
      console.log(error);
    } finally {
      setOpenEditForm(false);
    }
  };

  const deleteData = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/monitores/delete/${id}`);
      let newData = monitors.filter((el) => el.nroinventario !== id);
      setMonitors(newData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await confirm({
        description: `El monitor ${id} se eliminará permanentemente.`,
      });
      await deleteData(id);
    } catch (error) {
      console.log('Deletion cancelled.');
    }
  };

  const handleEditFormOpen = (id) => {
    const data = monitors.find((monitor) => monitor.nroinventario === id);
    if (data) {
      setIdToEdit(id);
      setValuesEdit({ ...data });
      setValueModel(data.modelo);
      setOpenEditForm(true);
    }
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
        </Box>
      </Box>
      <TableMonitors
        monitors={monitors}
        setOpenEditForm={setOpenEditForm}
        setIdToEdit={setIdToEdit}
        handleEditFormOpen={handleEditFormOpen}
        handleDelete={handleDelete}
      />
      <FormMonitor
        title={'Agregar Monitor'}
        open={openAddForm}
        setOpen={setOpenAddForm}
        createData={createData}
        initialValues={initialValues}
      />
      <FormEditMonitor
        title={'Editar Monitor'}
        open={openEditForm}
        setOpen={setOpenEditForm}
        initialValues={valuesEdit}
        initialModel={valueModel}
        updateData={updateData}
      />
    </Box>
  );
};

export default Monitors;
