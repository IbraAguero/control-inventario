import { Box, TextField, useMediaQuery } from '@mui/material';

const FormMonitors = () => {
  const isNonMobile = useMediaQuery('(min-width:600px)');

  return (
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
  );
};

export default FormMonitors;
