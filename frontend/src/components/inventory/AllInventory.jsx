import React, {Component} from 'react';
import axios from 'axios'
import ItemForm from './ItemForm';
import { Button, Grid, Paper } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

const api_url = 'http://localhost:3001/api/v1/items';

const columns = [
  { field: 'id', headerName: 'ID', width: 75 },
  { field: 'name', headerName: 'Name', editable: true, width: 150 },
  { field: 'vendor', headerName: 'Vendor / Source', editable: true, width: 150 },
  { field: 'quantity', headerName: 'Total Quantity', width: 130 },
  { field: 'price', headerName: 'Price', editable: true, width: 75 },
  { field: 'description', headerName: 'Description', editable: true, width: 200 },
  { field: 'category', headerName: 'Category', editable: true, width: 150 },
  { field: 'user_id', headerName: 'User ID', width: 75 },
];


class AllInventory extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
      selected: []
    }
    this.updateInventory = this.updateInventory.bind(this)
    this.updateSelected = this.updateSelected.bind(this)
    this.handleDeleteAll = this.handleDeleteAll.bind(this)
    this.handleCommit = this.handleCommit.bind(this)
  }

  componentDidMount() {
    this.getItems()
  }

  getItems() {
    fetch(api_url)
    .then(res => res.json())
    .then(resItems => {
      this.setState({
        items: resItems
      })
    });
  }

  updateInventory(item) {
    // _underscore is temporary, ... duplicates and creates new array
    let _items = [...this.state.items]
    _items.push(item)
    this.setState({
      items: _items
    })
  }

  updateSelected(data) {
    this.setState({
      selected: data
    })
  }

  // CRUD - UPDATE FIELD
  handleCommit(e) {
    // console.log(e); // {id: 1, field: 'name', value: 'Evening Forrest'}
    let data = {item: {[e.field]: e.value}}
    let updateUrl = api_url + `/${e.id}`;
    axios.patch(updateUrl, data)
  }


  // CRUD - DELETE SELECTED 
  handleDeleteAll() {
    let arrayIds = this.state.selected
    for (let i = 0; i < arrayIds.length; i++) {
      let id = arrayIds[i];
      let deleteUrl = api_url + `/${id}`
      // server-side delete
      axios.delete(deleteUrl)
      .then(() => {
        let _items = [...this.state.items]
        let _newItems = _items.filter(function(obj) {
          return obj.id !== id 
        });
        this.setState({
          items: _newItems
        })
      })
    }
  }

  render() {
    console.log(this.state.items)
    let items = this.state.items
    return (
      <Grid container spacing={3} direction="row" className='data-grid-container'>
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
            rows={items}
            columns={columns}
            loading={!items.length}
            checkboxSelection
            onSelectionModelChange={(data) => this.updateSelected(data)}
            onCellEditCommit={this.handleCommit}
            rowsPerPageOptions={[10, 50, 100]}
          />
        </Grid>
        <hr />
        {/* <Grid item xs={12} >
          <ItemForm api_url={api_url} updateInventory={this.updateInventory}/>
        </Grid> */}
      </Grid>
    )
  }
}

export default AllInventory;