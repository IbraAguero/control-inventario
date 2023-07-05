import * as Yup from 'yup';
import printerFormModel from './printerFormModel';
const {
  formField: { nroInventario, fabricante, nroSerie, lugar },
} = printerFormModel;

export default [
  Yup.object().shape({
    [nroInventario.name]: Yup.string()
      .required(`${nroInventario.requiredErrorMsg}`)
      .matches(/^[A-Z]{2}-\d{2,}$/, 'Formato invalido, Ej: MO-10'),
    [fabricante.name]: Yup.string().required(`${fabricante.requiredErrorMsg}`),
  }),
  Yup.object().shape({
    [nroSerie.name]: Yup.string().required(`${nroSerie.requiredErrorMsg}`),
    [lugar.name]: Yup.string().required(`${lugar.requiredErrorMsg}`),
  }),
];
