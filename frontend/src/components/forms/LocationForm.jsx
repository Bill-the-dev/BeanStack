import React, { useState } from 'react';
import { TextField, InputAdornment, Box, Button, FormControl, InputLabel, OutlinedInput, Paper, Typography } from '@mui/material';
import axios from 'axios';
import { Grid } from '@mui/material';

// Need to convert to functional component
// class LocationForm extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       name: '',
//       vendor: '',
//       quantity: 0,
//       price: 0,
//       description: '',
//       category: '',
//       user_id: 1
//     };
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

function LocationForm() {

  const [field, setField] = useState('');

  const handleChange = (e) => {
    setField(e.target.value);
  }


  const handleSubmit = (e) => {
    formSubmit(e.target);
  }



  // CRUD - CREATE 
  const formSubmit = (formData) => {
    const api_url = ''
    let data = new FormData(formData);
    console.log(formData);
    console.log(data);
    fetch(`${api_url}/locations`, {
      method: 'POST',
      mode: 'cors',
      body: data
    })
      // await axios.post(this.state.api_url, data)
      .then(res => res.json())
      // .then(res => this.props.updateInventory(res));
  }
  
  return (
    <Paper elevation={3} sx={{ justifyContent: "center" }}>
      <Typography variant="h4" sx={{ p: 2 }} >Create Location</Typography>

      <Grid container direction='column' alignItems='center' justifyContent='center'>
        <Grid item container direction='column' alignItems='center' justifyContent='center' xs={12}>
          <form
            onSubmit={handleSubmit}
            id='loc-form'
            autoComplete='off'
            style={{ width: '100%' }}
          >

            <Grid item xs={12}>
              <TextField
                label='City'
                id='loc-form-city'
                sx={{ m: 1.5, width: '97%' }}
                variant='outlined'
                type='text'
                name='item[name]'
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label='State'
                id='loc-form-state'
                sx={{ m: 1.5, width: '97%' }}
                variant='outlined'
                type='text'
                name='item[vendor]'
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Country"
                id="loc-form-country"
                sx={{ m: 1.5, width: '97%' }}
                onChange={handleChange}
                startAdornment={<InputAdornment position="start"></InputAdornment>}
                name='item[quantity]'
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Zip Code"
                id="loc-form-zip"
                sx={{ m: 1.5, width: '97%' }}
                onChange={handleChange}
                startAdornment={<InputAdornment position="start"></InputAdornment>}
                name='item[quantity]'
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant='contained'
                color='primary'
                type='submit'
                sx={{ m: 2 }}>
                Submit</Button>
              <Button
                variant='contained'
                color='primary'
                type='reset'
                sx={{ m: 2 }}>
                Reset Fields</Button>
            </Grid>
            <Typography variant="subtitle1" sx={{ pl: 2, pt: 4, fontWeight: 'bold' }} >Note: </Typography>
            <Typography variant="subtitle1" sx={{ pl: 2, fontStyle: 'italic' }} >Use two-character State and Country codes</Typography>
            <Typography variant="subtitle1" sx={{ pl: 2, fontStyle: 'italic' }} >ie: New York, NY, US 10001</Typography>

          </form>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default LocationForm;