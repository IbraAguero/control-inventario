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
    </Dialog>
  );
};

export default ModalMui;
