import { Grid, Typography } from '@mui/material';
import { InputField } from '../../../components/FormFields';
import SelectMenuField from '../../../components/FormFields/SelectMenuField';

export default function AditionalForm(props) {
  const {
    formField: { nroSerie, lugar },
  } = props;
  return (
    <>
      <Typography
        variant="h5"
        gutterBottom
        align="center"
        sx={{ marginBottom: 3 }}
      >
        Informacion Adicional
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <InputField name={nroSerie.name} label={nroSerie.label} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SelectMenuField
            name={lugar.name}
            label={lugar.label}
            url={lugar.url}
            fullWidth
          />
        </Grid>
      </Grid>
    </>
  );
}
