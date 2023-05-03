import { Box, Button, Typography, useTheme } from '@mui/material';
import { tokens } from '../../theme';
/* import { mockDataComputers } from '../../data/mockData'; */
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';
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

  const columns = [
    { field: 'id', headerName: 'ID' },
    {
      field: 'lugar',
      headerName: 'Lugar',
      flex: 1,
      cellClassName: 'lugar-column--cell',
    },
    {
      field: 'cpucomputadora',
      headerName: 'CPU',
      headerAlign: 'left',
      align: 'left',
      flex: 1,
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
      flex: 1,
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
      <ModalMui open={open} setOpen={setOpen} title={'Agregar Monitor'}>
        <FormComputer />
      </ModalMui>
    </Box>
  );
};

export default Computers;
