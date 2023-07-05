export default {
  formId: 'printerForm',
  formField: {
    nroInventario: {
      name: 'nroinventario',
      label: 'Nro Inventario*',
      requiredErrorMsg: 'Nro inventario es requerido',
    },
    fabricante: {
      name: 'fabricante',
      label: 'Fabricante*',
      url: 'http://localhost:8000/monitores/fabricantes',
      requiredErrorMsg: 'Fabricante es requerido',
    },
    nroSerie: {
      name: 'nroserie',
      label: 'Nro Serie*',
      requiredErrorMsg: 'Nro serie es requerido',
    },
    lugar: {
      name: 'lugar',
      label: 'Lugar*',
      url: 'http://localhost:8000/lugares',
      requiredErrorMsg: 'Lugar es requerido',
    },
  },
};
