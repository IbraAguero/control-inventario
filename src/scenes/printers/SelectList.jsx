import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { useFetch } from '../global/hooks/useFetch';
import { ErrorMessage, Field } from 'formik';

const SelectList = ({ name, url, handleChange, errors, initialValues }) => {
  const { data, error, loading } = useFetch(url);
  //console.log(data, error, loading);

  //if (!data) return null;

  if (error) {
    console.log(error);
  }

  //let id = `select-${title}`;
  let label = name.charAt(0).toUpperCase() + name.slice(1);
  //let options = data.response[title];
  //console.log(options);

  return (
    <FormControl>
      <InputLabel id={name}>{label}</InputLabel>
      <Field
        as={Select}
        name={name}
        id={name}
        labelId={name}
        onChange={(e) => {
          let dataFind = data.find((el) => el.nombre === e.target.value);
          handleChange(e, dataFind);
        }}
      >
        {initialValues
          ? initialValues.map((el) => (
              <MenuItem value={el.nombre} key={el.id}>
                {el.nombre}
              </MenuItem>
            ))
          : data &&
            data.map((el) => (
              <MenuItem value={el.nombre} key={el.id}>
                {el.nombre}
              </MenuItem>
            ))}
      </Field>
      <ErrorMessage
        name={name}
        component={() => <FormHelperText>{errors}</FormHelperText>}
      />
    </FormControl>
  );
};

export default SelectList;
