import React, {Component} from 'react'
import { TextField, InputAdornment, Box, Button, FormControl, InputLabel, OutlinedInput, Paper, Typography } from '@mui/material'
import axios from 'axios';
class ItemForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      api_url: props.api_url,
      name: '',
      vendor: '',
      quantity: 0,
      price: 0,
      description: '',
      category: '',
      user_id: 1
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    this.setState({
      name: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    this.formSubmit(e.target)
  }


  // CRUD - CREATE 
  async formSubmit(formData) {
    let data = new FormData(formData)
    console.log(formData)
    console.log(data)
    await fetch(this.state.api_url, {
      method: 'POST',
      mode: 'cors', 
      body: data
    })
    // await axios.post(this.state.api_url, data)
    .then(res => res.json())
    .then(res => this.props.updateInventory(res))
  }

  render() {
    return(
      <Paper elevation={3} sx={{ justifyContent: "center" }}>
        <Typography variant="h4" sx={{ p:2 }} >Create Row</Typography>
        <form
          onSubmit={this.handleSubmit}
          id='item-form'
          autoComplete='off'>

          <TextField 
            label='Item Name'
            id='item-name'
            sx={{ m: 1, width: '43vw' }}
            variant='outlined'
            type='text'
            name='item[name]'
            onChange={this.handleChange}
            required
          />
          <TextField 
            label='Vendor / Source'
            id='item-vendor'
            sx={{ m: 1, width: '43vw' }}
            variant='outlined'
            type='text'
            name='item[vendor]'
            onChange={this.handleChange}
          />
          <TextField
            label="Quantity"
            id="item-quantity"
            sx={{ m: 1, width: '43vw' }}
            onChange={this.handleChange}
            startAdornment={<InputAdornment position="start"></InputAdornment>}
            name='item[quantity]'
            required
          />
          <FormControl sx={{ m: 1, width: '43vw' }}>
            <InputLabel required htmlFor="item-price">Price</InputLabel>
            <OutlinedInput
              id="item-price"
              onChange={this.handleChange}
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
              label="Price"
              name="item[price]"
            />
          </FormControl>
          <TextField
            label='Description'
            id='item-description'
            sx={{ m: 1, width: '87.55vw' }}
            variant='outlined'
            type='text'
            name='item[description]'
            multiline={true}
            minRows={2}
            onChange={this.handleChange}
          />
          <TextField
            label='Category'
            id='item-category'
            sx={{ m: 1, width: '43vw' }}
            variant='outlined'
            type='text'
            name='item[category]'
            onChange={this.handleChange}
          />
          <Button 
            variant='contained'
            color='primary'
            type='submit'
            sx={{ m: 2.25 }}>
          Add Item</Button>
          <Button 
            variant='contained'
            color='primary'
            type='reset'
            sx={{ m: 2.25 }}>
          Reset Fields</Button>
        </form>
      </Paper>
    )
  }
}

export default ItemForm;