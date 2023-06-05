import { useTheme } from '@emotion/react';
import { tokens } from '../../theme';
import { Box, IconButton, Typography } from '@mui/material';

import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

const TableMonitors = ({ monitors }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    {
      field: 'nroinventario',
      headerName: 'Nro-Inventario',
      headerAlign: 'center',
      align: 'center',
      flex: 1,
    },
    {
      field: 'lugar',
      headerName: 'Lugar',
      headerAlign: 'center',
      align: 'center',

      flex: 2,
      cellClassName: 'lugar-column--cell',
    },
    {
      field: 'fabricante',
      headerName: 'Fabricante',
      headerAlign: 'center',
      align: 'center',
      flex: 2,
    },
    {
      field: 'modelo',
      headerName: 'Modelo',
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'tipo',
      headerName: 'Tipo',
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'fechaagregacion',
      headerName: 'FechaAgregacion',
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'pulgadas',
      headerName: 'Pulgadas',
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
            {/* {estado === 'Activa' && <DoneOutlinedIcon />}
            {estado === 'Inactiva' && <BlockOutlinedIcon />}
            {estado === 'Reparacion' && <BuildOutlinedIcon />} */}
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
            <IconButton
              variant="contained"
              /* onClick={() => {
                setOpenEditForm(true);
                setIdToEdit(id);
              }} */
            >
              <BorderColorOutlinedIcon />
            </IconButton>
            <IconButton
              color="error"
              variant="contained"
              /* onClick={() => deleteData(id)} */
              /* onClick={() => {
                setConfirmDelete(true);
                setIdToDelete(id);
              }} */
            >
              <DeleteOutlineOutlinedIcon />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  return (
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
        rows={monitors}
        density="compact"
        getRowId={(row) => row.nroinventario}
        columns={columns}
        components={{ Toolbar: GridToolbar }}
        checkboxSelection
        disableSelectionOnClick={true}
      />
    </Box>
  );
};

export default TableMonitors;
