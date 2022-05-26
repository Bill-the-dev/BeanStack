import { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';


export default function TableSelect() {
  const [locations, setLocations] = useState([]);
  const [value, setValue] = useState(locations[0]);

  useEffect(() => {
    let mounted = true;
    getLocations().then((locations) => {
      if (mounted) setLocations(locations);
    });
    console.log(locations)
    return () => (mounted = false);
  }, []);


  return (
    <Autocomplete
      autoHighlight
      disablePortal
      id="combo-box-location"
      options={locations}
      value={value}
      onChange={(e, newValue) => {
        console.log(e.target.value)
        setValue(newValue);
      }}
      sx={{ width: 300, marginBottom: "0.5rem" }}
      getOptionLabel={(option) => option.label}
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
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
        />)}
    />
  );
}

const api_url = 'http://localhost:3001/api/v1';

// const locations = [
//   { city: 'All Locations', state: '', country: ''},
//   { city: 'New York', state: 'NY', country: 'US', id: 1 },
//   { city: 'San Francisco', state: ' CA', country: 'US', id: 4 },
//   { city: 'Ottawa', state: 'ON', country: 'CA', id: 3 },
//   { city: 'Chicago', state: 'IL', country: 'US', id: 2 },
//   { city: 'Denver', state: 'CO', country: 'US', id: 5 },
// ];

// const locations = getLocations();

async function getLocations() {
  return await axios.get(`${api_url}/locations`).then((res) => res.data);
}


// possible loadOnOpen, asychronous
// possible checkbox or multi-select
// https://mui.com/material-ui/react-autocomplete/#load-on-open

// the "value" state with the value/onChange props combination. This state represents the value selected by the user, for instance when pressing Enter.



// export default function TableHeader() {
//   const [location, setLocation] = React.useState('');

//   const handleChange = (event) => {
//     setLocation(event.target.value);
//   };

//   return (
//     <Box sx={{ minWidth: 120, p: "0.5rem" }}>
//       <FormControl fullWidth >
//         <InputLabel id="demo-simple-select-label">Location</InputLabel>
//         <Select
//           labelId="demo-simple-select-label"
//           id="demo-simple-select"
//           value={location}
//           label="Location"
//           onChange={handleChange}
//           // sx={{ m: "0.5rem" }}
//         >
//           <MenuItem value={10}>All Locations</MenuItem>
//           <MenuItem value={20}>Twenty</MenuItem>
//           <MenuItem value={30}>Thirty</MenuItem>
//         </Select>
//       </FormControl>
//     </Box>
//   );
// }