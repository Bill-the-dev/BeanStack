import React, { useState } from 'react';
import { TextField, InputAdornment, Box, Button, FormControl, InputLabel, OutlinedInput, Paper, Typography } from '@mui/material';
import axios from 'axios';
import { Grid } from '@mui/material';

function LocationForm(props) {
  const {handleClose} = props
  const api_url = 'http://localhost:3001/api/v1'
  const [values, setValues] = useState({
    location: {
      city: '',
      state: '',
      country: '',
      zip: ''
    }
  })

  // console.log(getLocations)

  const handleChange = (e) => {
    setValues({ ...values, location: { ...values.location, [e.target.name]: e.target.value }});
    // spread operator prevents the previous data from being lost
  };
  
  // CRUD - CREATE LOCATION
  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(`${api_url}/locations`, {
      location: {
        city: values.location.city,
        state: values.location.state,
        country: values.location.country,
        zip: values.location.zip
      }
    })
      .then(() => {
        handleClose()
      })
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
                name='city'
                value={values.location.city}
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
                name='state'
                value={values.location.state}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Country"
                id="loc-form-country"
                sx={{ m: 1.5, width: '97%' }}
                startAdornment={<InputAdornment position="start"></InputAdornment>}
                name='country'
                value={values.location.country}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Zip Code"
                id="loc-form-zip"
                sx={{ m: 1.5, width: '97%' }}
                startAdornment={<InputAdornment position="start"></InputAdornment>}
                name='zip'
                value={values.location.zip}
                onChange={handleChange}
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