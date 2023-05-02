import {
  Box,
  Button,
  Typography,
  useTheme,
  Dialog,
  TextField,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
} from '@mui/material';
import { tokens } from '../../theme';
/* import { mockDataComputers } from '../../data/mockData'; */
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';
import Header from '../../components/Header';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Computers = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = useState(false);
  const isNonMobile = useMediaQuery('(min-width:600px)');

  const [computers, setComputers] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8000/')
      .then((res) => {
        setComputers(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
            onClick={handleClickOpen}
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
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle
          sx={{
            background: colors.grey[600],
            fontSize: '20px',
            fontWeight: '600',
          }}
        >
          Agregar Computadora
        </DialogTitle>
        <DialogContent>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' },
            }}
          >
            <TextField
              autoFocus
              fullWidth
              margin="dense"
              id="lugar"
              label="Lugar"
              type="text"
              variant="standard"
              sx={{ gridColumn: 'span 2' }}
            />
            <TextField
              margin="dense"
              id="cpu"
              label="CPU"
              type="text"
              variant="standard"
              sx={{ gridColumn: 'span 2' }}
            />
            <TextField
              margin="dense"
              id="ram"
              label="RAM"
              type="text"
              variant="standard"
            />
            <TextField
              margin="dense"
              id="discohd"
              label="Disco HD"
              type="text"
              variant="standard"
            />
            <TextField
              margin="dense"
              id="estado"
              label="Estado"
              type="text"
              variant="standard"
              sx={{ gridColumn: 'span 2' }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Box display="flex" justifyContent="end" mt="20px" gap="10px">
            <Button onClick={handleClose} color="neutral" variant="outlined">
              Cancelar
            </Button>
            <Button type="submit" color="secondary" variant="outlined">
              Agregar
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
      {/* <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      ></Box> */}
    </Box>
  );
};

export default Computers;
