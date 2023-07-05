import { useEffect, useState } from 'react';
import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { ErrorMessage, Field } from 'formik';
import { useFetch } from '../scenes/global/hooks/useFetch';
import axios from 'axios';
import { useConfirm } from 'material-ui-confirm';
import MenuForm from './MenuForm';

const CustomSelect = ({
  name,
  errors,
  url,
  touched,
  initialValues,
  handleChange,
}) => {
  const confirm = useConfirm();

  const [selectedOption, setSelectedOption] = useState('');
  const [menuOptions, setMenuOptions] = useState([]);

  const { data: initialData, error, loading } = useFetch(url);

  useEffect(() => {
    setMenuOptions(initialData || []);
  }, [initialData]);

  const addOption = async (newOption, isEditing) => {
    try {
      if (isEditing) {
        await axios.put(`${url}/${selectedOption.id}`, {
          nombre: newOption,
        });
        const updatedMenuOptions = menuOptions.map((option) =>
          option.id === selectedOption.id
            ? { ...option, nombre: newOption }
            : option
        );
        const optionFind = updatedMenuOptions.find(
          (option) => option.id === selectedOption.id
        );
        setMenuOptions(updatedMenuOptions);
        setSelectedOption(optionFind);
      } else {
        const res = await axios.post(url, {
          nombre: newOption,
        });
        const newMenuOptions = [
          ...menuOptions,
          { nombre: newOption, id: res.data.insertId },
        ];
        setMenuOptions(newMenuOptions);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteOption = async () => {
    try {
      await confirm({
        description: `El ${name} ${selectedOption.nombre} se eliminará permanentemente.`,
      });
      await axios.delete(`${url}/${selectedOption.id}`);
      const newMenuOptions = menuOptions.filter(
        (option) => option.id !== selectedOption.id
      );

      setMenuOptions(newMenuOptions);
      setSelectedOption(null);
    } catch (error) {
      console.log('Deletion cancelled.');
    }
  };

  const label = name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <>
      <FormControl
        error={errors && touched}
        variant="standard"
        fullWidth
        sx={{
          m: 1,
          minWidth: 120,
          gridColumn: 'span 2',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <InputLabel id={name}>{label}</InputLabel>
          <Field
            as={Select}
            name={name}
            id={name}
            labelId={name}
            value={selectedOption ? selectedOption.id : ''}
            onChange={(e) => {
              const dataFind = menuOptions.find(
                (el) => el.id === e.target.value
              );
              handleChange(e, dataFind);
              setSelectedOption(dataFind);
            }}
            fullWidth
          >
            {menuOptions.map((el) => (
              <MenuItem value={el.id} key={el.id}>
                {el.nombre}
              </MenuItem>
            ))}
          </Field>
          <MenuForm
            selectedOption={selectedOption}
            label={label}
            addOption={addOption}
            deleteOption={deleteOption}
          />
        </Box>
        <ErrorMessage
          name={name}
          component={() => <FormHelperText>{errors}</FormHelperText>}
        />
      </FormControl>
    </>
  );
};

export default CustomSelect;
