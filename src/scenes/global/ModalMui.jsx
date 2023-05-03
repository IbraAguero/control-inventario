import { Dialog, DialogContent, DialogTitle } from '@mui/material';

const ModalMui = ({ open, setOpen, children, title }) => {
  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
      <DialogTitle
        sx={{
          background: '#444',
          fontSize: '20px',
          fontWeight: '600',
        }}
      >
        {title}
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
      {/* <DialogActions>
        <Box display="flex" justifyContent="end" mt="20px" gap="10px">
          <Button
            onClick={() => setOpen(false)}
            color="neutral"
            variant="outlined"
          >
            Cancelar
          </Button>
          <Button type="submit" color="secondary" variant="outlined">
            Agregar
          </Button>
        </Box>
      </DialogActions> */}
    </Dialog>
  );
};

export default ModalMui;
