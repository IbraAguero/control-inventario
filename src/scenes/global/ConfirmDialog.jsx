import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';

const ConfirmDialog = ({ open, setOpen, title, body, handleDelete, id }) => {
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle
        sx={{
          background: '#444',
          fontSize: '16px',
          fontWeight: '600',
        }}
      >
        {title}
      </DialogTitle>
      <DialogContent
        sx={{
          fontSize: '12px',
          fontWeight: '400',
          marginTop: '20px',
        }}
      >
        {body}
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={() => setOpen(false)}>
          Cancelar
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            handleDelete(id);
            setOpen(false);
          }}
        >
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
