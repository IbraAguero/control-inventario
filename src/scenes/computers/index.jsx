import { Box, Button } from '@mui/material';
import Header from '../../components/Header';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ModalMui from '../global/ModalMui';
import FormAddComputer from './FormAddComputer';
import FormEditComputer from './FormEditComputer';
import TableComputers from './TableComputers';
import ConfirmDialog from '../global/ConfirmDialog';

const Computers = () => {
  const [idToEdit, setIdToEdit] = useState(null);
  const [idToDelete, setIdToDelete] = useState(null);
  const [openAddForm, setOpenAddForm] = useState(false);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const [computers, setComputers] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8000/computadoras')
      .then((res) => {
        setComputers(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const createData = (data) => {
    axios
      .post('http://localhost:8000/computadoras', data)
      .then((res) => {
        setComputers([...computers, { ...data, id: res.data.insertId }]);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setOpenAddForm(false);
      });
  };

  const updateData = (data) => {
    axios
      .put('http://localhost:8000/update/' + idToEdit, data)
      .then(() => {
        let newData = computers.map((el) =>
          el.id === idToEdit ? { ...data, id: idToEdit } : el
        );
        setComputers(newData);
      })
      .catch((err) => console.log(err))
      .finally(() => setOpenEditForm(false));
  };

  const deleteData = (id) => {
    axios
      .delete('http://localhost:8000/delete/' + id)
      .then(() => {
        let newData = computers.filter((el) => el.id !== id);
        setComputers(newData);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Box m="20px">
      <Box display="flex" alignItems="center" gap="10px">
        <Header title="Computadoras" />
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
      <TableComputers
        computers={computers}
        deleteData={deleteData}
        setIdToDelete={setIdToDelete}
        setIdToEdit={setIdToEdit}
        setOpenEditForm={setOpenEditForm}
        setConfirmDelete={setConfirmDelete}
      />
      <ModalMui
        open={openAddForm}
        setOpen={setOpenAddForm}
        title={'Agregar Computadora'}
      >
        <FormAddComputer setOpen={setOpenAddForm} createData={createData} />
      </ModalMui>
      <ModalMui
        open={openEditForm}
        setOpen={setOpenEditForm}
        title={'Editar Computadora'}
      >
        <FormEditComputer
          idToEdit={idToEdit}
          updateData={updateData}
          setIdToEdit={setIdToEdit}
          setOpen={setOpenEditForm}
        />
      </ModalMui>
      <ConfirmDialog
        open={confirmDelete}
        setOpen={setConfirmDelete}
        title={'Eliminar computadora'}
        body={'Seguro desea eliminar la computadora'}
        handleDelete={deleteData}
        id={idToDelete}
      />
    </Box>
  );
};

export default Computers;
