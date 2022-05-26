import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Button, Grid } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

const api_url_items = 'http://localhost:3001/api/v1/items';

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

// useEffect callback explanation: https://www.robinwieruch.de/react-hooks-fetch-data/

function AllInventory() {
  const [items, setItems] = useState([])
  const [selected, setSelected] = useState([])

  useEffect(() => {
    async function fetchItems() {
      const result = await axios(api_url_items);
      setItems(result.data);
    }
    fetchItems();
  }, []);

  // CRUD - UPDATE FIELD
  const handleCommit = (e) => {
    let data = { item: { [e.field]: e.value } };
    let updateUrl = api_url_items + `/${e.id}`;
    axios.patch(updateUrl, data)
  }
   
  // CRUD - DELETE SELECTED 

  const handleDeleteAll = () => {
    // let arrayIds = this.state.selected
    for (let i = 0; i < selected.length; i++) {
      let id = selected[i];
      let deleteUrl = api_url_items + `/${id}`
      // server-side delete
      axios.delete(deleteUrl)
      .then(() => {
        let _items = [...items]
        let _newItems = _items.filter(function(obj) {
          return obj.id !== id 
        });
        setItems(_newItems)
      })
    }

  }

//   }
  
  return(
    <Grid container spacing={3} direction="row" className='data-grid-container'>
      <Grid item >
        <Button
          variant="outlined"
          startIcon={<DeleteIcon />}
          onClick={handleDeleteAll}
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
          onSelectionModelChange={(data) => setSelected(data)}
          onCellEditCommit={handleCommit}
          rowsPerPageOptions={[10, 50, 100]}
        />
      </Grid>
      <hr />
    </Grid>
  )
}

export default AllInventory;