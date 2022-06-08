import React, { useState } from 'react'
import { TextField, InputAdornment, Box, Button, FormControl, InputLabel, OutlinedInput, Paper, Typography } from '@mui/material'
import axios from 'axios';
import { Grid } from '@mui/material';


function ItemForm(props) {
  const {handleClose} = props
  const api_url = 'http://localhost:3001/api/v1';
  const [values, setValues] = useState({
    item: {
      name: '',
      vendor: '',
      quantity: 0,
      price: 0,
      description: '',
      category: '',
      user_id: 1
    }
  });

  const handleChange = (e) => {
    setValues({ ...values, item: { ...values.item, [e.target.name]: e.target.value } });
    // spread operator prevents the previous data from being lost
  };

  // CRUD - CREATE LOCATION
  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(`${api_url}/items`, {
      item: {
        name: values.item.name,
        vendor: values.item.vendor,
        quantity: values.item.quantity,
        price: values.item.price,
        description: values.item.description,
        category: values.item.category,
        user_id: values.item.user_id,
      }
    })
      .then(() => {
        handleClose();
      });
  }

  return (
    <Paper elevation={3} sx={{ justifyContent: "center" }}>
      <Typography variant="h4" sx={{ p: 2 }} >Create Item</Typography>

      <Grid container direction='column' alignItems='center' justifyContent='center'>
        <Grid item container direction='column' alignItems='center' justifyContent='center' xs={12}>
          <form
            onSubmit={handleSubmit}
            id='item-form'
            autoComplete='off'
            style={{ width: '100%' }}
          >
            <Grid item xs={12}>
              <TextField
                label='Item Name'
                id='item-name'
                sx={{ m: 1, width: '98%' }}
                variant='outlined'
                type='text'
                name='name'
                value={values.item.name}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label='Vendor / Source'
                id='item-vendor'
                sx={{ m: 1, width: '98%' }}
                variant='outlined'
                type='text'
                name='vendor'
                value={values.item.vendor}
                onChange={handleChange}
              />
            </Grid>
            {/* New items initialized with a quantity of 0 at all locations. Edit per location and item index total will update. */}
            {/* <Grid item xs={12}>
              <TextField
                label="Quantity"
                id="item-quantity"
                sx={{ m: 1, width: '98%' }}
                onChange={handleChange}
                startAdornment={<InputAdornment position="start"></InputAdornment>}
                name='quantity'
                value={values.item.quantity}
                required
              /> 
            </Grid>*/}
            <Grid item xs={12}>
              <FormControl sx={{ m: 1, width: '98%' }}>
                <InputLabel required htmlFor="item-price">Price</InputLabel>
                <OutlinedInput
                  id="item-price"
                  onChange={handleChange}
                  startAdornment={<InputAdornment position="start">$</InputAdornment>}
                  label="Price"
                  name="price"
                  value={values.item.price}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label='Description'
                id='item-description'
                sx={{ m: 1, width: '98%' }}
                variant='outlined'
                type='text'
                name='description'
                value={values.item.description}
                multiline={true}
                minRows={2}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label='Category'
                id='item-category'
                sx={{ m: 1, width: '98%' }}
                variant='outlined'
                type='text'
                name='category'
                value={values.item.category}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
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
            </Grid>
            <Typography variant="subtitle1" sx={{ pl: 2, pt: 4, fontWeight: 'bold' }} >Note: </Typography>
            <Typography variant="subtitle1" sx={{ pl: 2, fontStyle: 'italic' }} >A new item record is added to ALL locations with a quantity of 0.</Typography>
            <Typography variant="subtitle1" sx={{ pl: 2, pb: 2, fontStyle: 'italic' }} >To adjust quantity, edit the quantity at the location level data tables.</Typography>
          </form>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default ItemForm;


// class ItemForm extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       api_url: props.api_url,
//       name: '',
//       vendor: '',
//       quantity: 0,
//       price: 0,
//       description: '',
//       category: '',
//       user_id: 1
//     }
//     this.handleSubmit = this.handleSubmit.bind(this)
//     this.handleChange = this.handleChange.bind(this)
//   }

//   handleChange(e) {
//     this.setState({
//       name: e.target.value
//     })
//   }

//   handleSubmit(e) {
//     e.preventDefault();
//     this.formSubmit(e.target)
//   }


//   // CRUD - CREATE 
//   async formSubmit(formData) {
//     let data = new FormData(formData)
//     console.log(formData)
//     console.log(data)
//     await fetch(this.state.api_url, {
//       method: 'POST',
//       mode: 'cors', 
//       body: data
//     })
//     // await axios.post(this.state.api_url, data)
//     .then(res => res.json())
//     .then(res => this.props.updateInventory(res))
//   }

//   render() {
//     return(
//       <Paper elevation={3} sx={{ justifyContent: "center" }}>
//         <Typography variant="h4" sx={{ p:2 }} >Create Item</Typography>

//         <Grid container direction='column' alignItems='center' justifyContent='center'>
//           <Grid item container direction='column' alignItems='center' justifyContent='center' xs={12}>
//             <form
//               onSubmit={this.handleSubmit}
//               id='item-form'
//               autoComplete='off'
//               style={{ width: '100%'}}
//               >
//               <Grid item xs={12}>         
//                 <TextField 
//                   label='Item Name'
//                   id='item-name'
//                   sx={{ m: 1, width: '98%' }}
//                   variant='outlined'
//                   type='text'
//                   name='item[name]'
//                   onChange={this.handleChange}
//                   required
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField 
//                   label='Vendor / Source'
//                   id='item-vendor'
//                   sx={{ m: 1, width: '98%' }}
//                   variant='outlined'
//                   type='text'
//                   name='item[vendor]'
//                   onChange={this.handleChange}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   label="Quantity"
//                   id="item-quantity"
//                   sx={{ m: 1, width: '98%' }}
//                   onChange={this.handleChange}
//                   startAdornment={<InputAdornment position="start"></InputAdornment>}
//                   name='item[quantity]'
//                   required
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <FormControl sx={{ m: 1, width: '98%' }}>
//                   <InputLabel required htmlFor="item-price">Price</InputLabel>
//                   <OutlinedInput
//                     id="item-price"
//                     onChange={this.handleChange}
//                     startAdornment={<InputAdornment position="start">$</InputAdornment>}
//                     label="Price"
//                     name="item[price]"
//                   />
//                 </FormControl>
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   label='Description'
//                   id='item-description'
//                   sx={{ m: 1, width: '98%' }}
//                   variant='outlined'
//                   type='text'
//                   name='item[description]'
//                   multiline={true}
//                   minRows={2}
//                   onChange={this.handleChange}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   label='Category'
//                   id='item-category'
//                   sx={{ m: 1, width: '98%' }}
//                   variant='outlined'
//                   type='text'
//                   name='item[category]'
//                   onChange={this.handleChange}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <Button 
//                   variant='contained'
//                   color='primary'
//                   type='submit'
//                   sx={{ m: 2.25 }}>
//                 Add Item</Button>
//                 <Button 
//                   variant='contained'
//                   color='primary'
//                   type='reset'
//                   sx={{ m: 2.25 }}>
//                 Reset Fields</Button>
//               </Grid>
//               <Typography variant="subtitle1" sx={{ pl: 2, pt: 4, fontWeight: 'bold' }} >Note: </Typography>
//               <Typography variant="subtitle1" sx={{ pl: 2, fontStyle: 'italic' }} >A new item record is added to ALL locations with a quantity of 0.</Typography>
//               <Typography variant="subtitle1" sx={{ pl: 2, pb: 2, fontStyle: 'italic' }} >To adjust quantity, edit the quantity at the location level data tables.</Typography>
//             </form>
//           </Grid>
//         </Grid>
//       </Paper>
//     )
//   }
// }

// export default ItemForm;