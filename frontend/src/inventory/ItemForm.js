import React, {Component} from 'react'
import { TextField, InputAdornment, Box, Button, FormControl, InputLabel, OutlinedInput } from '@mui/material'
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

  async formSubmit(formData) {
    let data = new FormData(formData)
    await fetch(this.state.api_url, {
      method: 'POST',
      mode: 'cors', 
      body: data
    })
    .then(res => res.json())
    .then(res => this.props.updateInventory(res))
  }

  render() {
    return(
      <Box sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column' }}>
        <div>
          <form
            onSubmit={this.handleSubmit}
            id='item-form'
            autoComplete='off'>
            <TextField 
              label='Item Name'
              id='item-input'
              sx={{ m: 1, width: '25ch' }}
              variant='outlined'
              type='text'
              name='item[name]'
              placeholder='Item Name'
              onChange={this.handleChange}
            />
            <TextField
              label="Quantity"
              id="item-quantity"
              sx={{ m: 1, width: '25ch' }}
              onChange={this.handleChange}
              startAdornment={<InputAdornment position="start"></InputAdornment>}
              name='item[quantity]'
            />
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                
                onChange={this.handleChange}
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                label="Amount"
              />
            </FormControl>
            <Button 
              variant='contained'
              color='primary'
              type='submit'>
            Add Item</Button>
          </form>
        </div>
      </Box>
    )
  }

}

export default ItemForm;