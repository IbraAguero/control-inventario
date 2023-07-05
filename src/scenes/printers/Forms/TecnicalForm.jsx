import { Grid, Typography } from '@mui/material';
import { InputField } from '../../../components/FormFields';
import SelectMenuField from '../../../components/FormFields/SelectMenuField';

export default function TecnicalForm(props) {
  const {
    formField: { nroInventario, fabricante },
  } = props;
  return (
    <>
      <Typography
        variant="h5"
        gutterBottom
        align="center"
        sx={{ marginBottom: 3 }}
      >
        Informacion Tecnica
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <InputField
            name={nroInventario.name}
            label={nroInventario.label}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SelectMenuField
            name={fabricante.name}
            label={fabricante.label}
            url={fabricante.url}
            fullWidth
          />
        </Grid>
      </Grid>
    </>
  );
}
