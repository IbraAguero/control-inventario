import printerFormModel from './printerFormModel';
const {
  formField: { nroInventario, fabricante, nroSerie, lugar },
} = printerFormModel;

export default {
  [nroInventario.name]: '',
  [fabricante.name]: '',
  [nroSerie.name]: '',
  [lugar.name]: '',
};
