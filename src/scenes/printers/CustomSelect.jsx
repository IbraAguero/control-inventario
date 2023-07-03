import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
} from '@mui/material';
import { ErrorMessage, Field } from 'formik';
import { StyledMenu } from '../../components/StyledMenu';
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import DeleteIcon from '@mui/icons-material/Delete';

const CustomSelect = ({ errors, touched, data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAddOption = () => {
    setIsModalOpen(true);
  };
  return (
    <>
      <FormControl
        error={touched.lugar && errors.lugar ? true : false}
        variant="standard"
        fullWidth
        sx={{
          m: 1,
          minWidth: 120,
          gridColumn: 'span 2',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <InputLabel id="lugar">Lugar</InputLabel>
          <Field
            as={Select}
            name="lugar"
            id="lugar"
            labelId="lugar"
            label="Lugar"
            fullWidth
          >
            {/* {data.lugares &&
            data.lugares.map((el) => (
              <MenuItem value={el.nombre} key={el.id}>
                {el.nombre}
              </MenuItem>
            ))} */}
          </Field>
          <IconButton
            id="basic-button"
            aria-controls={openMenu ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={openMenu ? 'true' : undefined}
            onClick={handleClick}
            sx={{ marginTop: 2 }}
          >
            <AddIcon />
          </IconButton>
          <StyledMenu
            id="basic-menu"
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleAddOption} disableRipple>
              <LibraryAddIcon />
              Agregar
            </MenuItem>
            <MenuItem onClick={() => console.log('editar')} disableRipple>
              <EditIcon />
              Editar
            </MenuItem>
            <MenuItem onClick={handleClose} disableRipple>
              <DeleteIcon />
              Eliminar
            </MenuItem>
          </StyledMenu>
        </Box>
        <ErrorMessage
          name="lugar"
          component={() => <FormHelperText>{errors.lugar}</FormHelperText>}
        />
      </FormControl>
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <DialogTitle
          sx={{
            background: '#444',
            fontSize: '20px',
            fontWeight: '600',
          }}
        >
          Agregar Lugar
        </DialogTitle>
        <DialogContent sx={{ marginTop: 3 }}>
          <TextField
            label="New Option"
            /* value={newOption}
            onChange={(e) => setNewOption(e.target.value)} */
            fullWidth
          />
          <Button
            variant="contained"
            /* onClick={handleSaveOption} */ sx={{ mt: 2 }}
          >
            Save
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CustomSelect;
