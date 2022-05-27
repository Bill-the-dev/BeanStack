import { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';


export default function TableSelect(props) {
  const { setLocUrl } = props;
  const [locations, setLocations] = useState([]);
  const [value, setValue] = useState('');
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    getLocations()
      .then((result) => {
        setLocations(result);
        console.log(result);
        return result;
      })
      .then((result) => {
        setValue(result[0]);
        setInputValue(result[0].city);
      });
  }, []);

  useEffect(() => {
    if (value !== '') {
      setLocUrl(value.id);
    }
  }, [value]);

  // Ensure request is complete
  if (!locations.length) {
    return (null);
  } else {

    return (
      <Autocomplete
        autoHighlight
        disablePortal
        id="combo-box-location"
        options={locations}
        value={value}
        onChange={(e, newValue) => {
          console.log(e.target.value);
          setValue(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(e, newInputValue) => {
          setInputValue(newInputValue);
        }}
        sx={{ width: 300, marginBottom: "0.5rem" }}
        getOptionLabel={(option) => option.city}
        renderOption={(props, option) => (
          <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
            {`${option.city}, ${option.state} ( ${option.country} )`}
            <img
              loading="lazy"
              width="20"
              sx={{ p: "0.2rem" }}
              src={`https://flagcdn.com/w20/${option.country.toLowerCase()}.png`}
              srcSet={`https://flagcdn.com/w40/${option.country.toLowerCase()}.png 2x`}
              alt=""
            />
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select Location"
            inputProps={{
              ...params.inputProps,
              autoComplete: 'new-password', // disable autocomplete and autofill, some browsers may suggest a 'strong password' with this option.
            }}
          />)
        }
      />
    );
  }
}

const api_url = 'http://localhost:3001/api/v1';

async function getLocations() {
  return await axios.get(`${api_url}/locations`).then((res) => res.data);
}