import {
  Autocomplete,
  Box,
  FormControl,
  IconButton,
  TextField,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useFetch } from '../global/hooks/useFetch';

const AutoCompleteList = ({ url, error }) => {
  const { data, loading } = useFetch(url);
  //console.log(data);

  const options = data ? data.map((el) => el.nombre) : [];

  return (
    <FormControl
      error={error ? true : false}
      sx={{ minWidth: 120, gridColumn: 'span 3', marginTop: 2 }}
    >
      <Box display="flex" alignItems="center" width="300px">
        <Autocomplete
          fullWidth
          options={options}
          //onChange={handleInputChange}
          renderInput={(params) => (
            <TextField {...params} label="Seleccionar" />
          )}
        />
        <IconButton>
          <AddIcon />
        </IconButton>
      </Box>
    </FormControl>
  );
};

export default AutoCompleteList;
