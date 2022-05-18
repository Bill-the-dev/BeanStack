import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
// possible loadOnOpen, asychronous
// https://mui.com/material-ui/react-autocomplete/#load-on-open

export default function TableHeader() {
  return (
    <Autocomplete
      autoHighlight
      disablePortal
      id="combo-box-location"
      options={locations}
      sx={{ width: 300, marginBottom: "0.5rem" }}
      getOptionLabel={(option) => option.label }
      renderOption={(props, option) => (
        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
          {option.label} ({option.country})
          <img
            loading="lazy"
            width="20"
            src={`https://flagcdn.com/w20/${option.country.toLowerCase()}.png`}
            srcSet={`https://flagcdn.com/w40/${option.country.toLowerCase()}.png 2x`}
            alt=""
          />
        </Box>
      )}
      renderInput={(params) => (
        <TextField 
          {...params} 
          label="Locations"
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}  
        />)}
    />
  );
}

const locations = [
  { label: 'New York, NY', country: 'US', id: 1 },
  { label: 'San Francisco, CA', country: 'US', id: 4 },
  { label: 'Ottawa, ON', country: 'CA', id: 3 },
  { label: 'Chicago, IL', country: 'US', id: 2 },
  { label: 'Denver, CO', country: 'US', id: 5 },
];

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