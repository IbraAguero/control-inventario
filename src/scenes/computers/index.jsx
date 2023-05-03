import { Box, Button, IconButton, Typography, useTheme } from '@mui/material';
import { tokens } from '../../theme';
/* import { mockDataComputers } from '../../data/mockData'; */
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Header from '../../components/Header';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ModalMui from '../global/ModalMui';
import FormComputer from './FormComputer';

const Computers = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = useState(false);

  const [computers, setComputers] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8000/')
      .then((res) => {
        setComputers(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete('http://localhost:8000/delete/' + id)
      .then((res) => {
        location.reload();
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const columns = [
    { field: 'id', headerName: 'ID' },
    {
      field: 'lugar',
      headerName: 'Lugar',
      flex: 2,
      cellClassName: 'lugar-column--cell',
    },
    {
      field: 'cpucomputadora',
      headerName: 'CPU',
      headerAlign: 'left',
      align: 'left',
      flex: 2,
    },
    {
      field: 'ram',
      headerName: 'Cantidad de RAM',
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'discohd',
      headerName: 'Disco HD',
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'estado',
      headerAlign: 'center',
      headerName: 'Estado',
      flex: 2.5,
      renderCell: ({ row: { estado } }) => {
        return (
          <Box
            width="50%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              estado == 'Activa' ? colors.greenAccent[600] : colors.grey[700]
            }
            borderRadius="5px"
          >
            {estado === 'Activa' && <DoneOutlinedIcon />}
            {estado === 'Inactiva' && <BlockOutlinedIcon />}
            {estado === 'Reparacion' && <BuildOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: '5px' }}>
              {estado}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: 'acciones',
      headerName: 'Acciones',
      headerAlign: 'center',
      align: 'center',
      flex: 1.2,
      renderCell: ({ row: { id } }) => {
        return (
          <Box display="flex" gap="5px">
            <IconButton color="neutral" variant="contained">
              <BorderColorOutlinedIcon />
            </IconButton>
            <IconButton
              color="secondary"
              variant="contained"
              onClick={() => handleDelete(id)}
            >
              <DeleteOutlineOutlinedIcon />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Box display="flex" alignItems="center" gap="10px">
        <Header title="Computadoras" />
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
      <Box
        m="20px 0 0 0"
        height="75vh"
        boxSizing="inherit"
        sx={{
          '& .MuiDataGrid-root': {
            border: 'none',
          },
          '& .MuiDataGrid-cell': {
            borderBottom: 'none',
          },
          '& .lugar-column--cell': {
            color: colors.greenAccent[100],
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: colors.blueAccent[800],
            borderBottom: 'none',
          },
          '& .MuiDataGrid-virtualScroller': {
            backgroundColor: colors.primary[400],
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: 'none',
          },
          '& .MuiCheckbox-root': {
            color: `${colors.greenAccent[200]} !important`,
          },
          '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={computers}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          checkboxSelection
        />
      </Box>
      <ModalMui open={open} setOpen={setOpen} title={'Agregar Computadora'}>
        <FormComputer setOpen={setOpen} />
      </ModalMui>
    </Box>
  );
};

export default Computers;
