import React, {Component} from 'react';
import axios from 'axios'
import TableSelect from './TableSelect';
import ItemForm from './ItemForm';
import { Button, Grid, Paper } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

const api_url = 'http://localhost:3001/api/v1/';

// location quantity edit should prompt a modal with current item quantities in all locations and a change or move option.

const columns = [
  { field: 'id', headerName: 'ID', width: 75 },
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'vendor', headerName: 'Vendor / Source', width: 150 },
  { field: 'quantity', headerName: 'Location Quantity', width: 130 },
  { field: 'price', headerName: 'Price', width: 75 },
  { field: 'description', headerName: 'Description', width: 200 },
  { field: 'category', headerName: 'Category', width: 150 },
  { field: 'user_id', headerName: 'User ID', width: 75 },
];


class LocInventory extends Component {
  constructor(props) {
    super(props)
    this.state = {
      locId: null, 
      locItems: [],
      selected: []
    }
    this.updateInventory = this.updateInventory.bind(this)
    this.updateSelected = this.updateSelected.bind(this)
    // this.handleDeleteAll = this.handleDeleteAll.bind(this)
    // this.handleCommit = this.handleCommit.bind(this)
  }

  componentDidMount() {
    this.getLocItems()
  }

  getLocItems() {
    // fetch(`${api_url}/locations/${locId}/location_items`)
    // .then(res => res.json())
    // .then(resLocItems => {
    //   this.setState({
    //     locItems: resLocItems
    //   })
    // });
  }

  updateInventory(item) {
    // _underscore is temporary, ... duplicates and creates new array
    let _locItems = [...this.state.locItems]
    _locItems.push(item)
    this.setState({
      items: _locItems
    })
  }

  updateSelected(data) {
    this.setState({
      selected: data
    })
  }

  // CRUD - UPDATE FIELD
  // handleCommit(e) {
  //   // console.log(e); // {id: 1, field: 'name', value: 'Evening Forrest'}
  //   let data = {item: {[e.field]: e.value}}
  //   let updateUrl = api_url + `/${e.id}`;
  //   axios.patch(updateUrl, data)
  // }


  // CRUD - DELETE SELECTED 
  // handleDeleteAll() {
  //   let arrayIds = this.state.selected
  //   for (let i = 0; i < arrayIds.length; i++) {
  //     let id = arrayIds[i];
  //     let deleteUrl = api_url + `/${id}`
  //     // server-side delete
  //     axios.delete(deleteUrl)
  //     .then(() => {
  //       let _items = [...this.state.items]
  //       let _newItems = _items.filter(function(obj) {
  //         return obj.id !== id 
  //       });
  //       this.setState({
  //         items: _newItems
  //       })
  //     })
  //   }
  // }

  handleLocChange() {
    // this.setState({
    //   location: e.target.value
    // })
  }

  render() {
    // console.log(this.state.locItems)
    let locItems = this.state.locItems
    return (
      <Grid container spacing={3} direction="row" className='data-grid-container'>
        <Grid item >
          <TableSelect handleLocChange={this.handleLocChange}/>
        </Grid>
        <Grid item >
          <Button 
            variant="outlined" 
            startIcon={<DeleteIcon />} 
            onClick={this.handleDeleteAll} 
            sx={{ marginBottom: "0.5rem", marginRight: "0.5rem" }}
            >Delete
          </Button>
          <Button 
            variant="outlined" 
            startIcon={<LocalShippingIcon />} 
            sx={{ marginBottom: "0.5rem", marginRight: "0.5rem" }} 
            >Move Quantity
          </Button>
        </Grid>
        <Grid item xs={12} sx={{
          height: "60vh",
        }}>
          <DataGrid
            rows={locItems}
            columns={columns}
            loading={!locItems.length}
            checkboxSelection
            onSelectionModelChange={(data) => this.updateSelected(data)}
            onCellEditCommit={this.handleCommit}
            rowsPerPageOptions={[10, 50, 100]}
          />
        </Grid>
        <hr />
        <Grid item xs={12} >
          <ItemForm api_url={api_url} updateInventory={this.updateInventory}/>
        </Grid>
      </Grid>
    )
  }
}

export default LocInventory;