import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Grid } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

const api_url = 'http://localhost:3001/api/v1';

const columns = [
  { field: 'id', headerName: 'ID', width: 75 },
  { field: 'name', headerName: 'Name', editable: true, width: 150 },
  { field: 'vendor', headerName: 'Vendor / Source', editable: true, width: 150 },
  {
    field: 'price', headerName: 'Price', editable: true, width: 75,
    valueFormatter: (params) => {
      if (params.value == null) {
        return '';
      }

      const valueFormatted = Number(params.value).toFixed(2).toLocaleString();
      return `$${valueFormatted}`;
    },
  },
  { field: 'quantity', headerName: 'Total Quantity', width: 130, align: 'center', headerAlign: 'center' },
  // { field: 'description', headerName: 'Description', editable: true, width: 200 },
  // { field: 'category', headerName: 'Category', editable: true, width: 150 },
  // { field: 'user_id', headerName: 'User ID', width: 75 },
];

// useEffect callback explanation: https://www.robinwieruch.de/react-hooks-fetch-data/

function AllInventory(props) {
  const [items, setItems] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selected, setSelected] = useState([]);
  const { open, setOpen, type, setType, handleOpen } = props;

  // GET locations, items on update
  useEffect(() => {
    async function fetchLocations() {
      const result = await axios(`${api_url}/locations`);
      setLocations(result.data);
      console.log(result.data);
    }

    async function fetchItems() {
      const result = await axios(`${api_url}/items`);
      setItems(result.data);
      console.log(result.data);
    }

    fetchLocations();
    fetchItems();
  }, [open]);

  // GET locItems per loc on update
  useEffect(() => {
    async function fetchLocItems() {
      for (let i = 0; i < locations.length; i++) {
        const location = locations[i];
        const locItems = await axios(`${api_url}/locations/${location.id}/location_items`)
        addLocItemCol(location, locItems)
        console.log(locItems)
      }
    
    }
    if (locations && items) {fetchLocItems()};

  }, [open, locations, items]);

  // Set LocItems Quantity per Location in datagrid
  const addLocItemCol = (location, locItems) => {

    const newColumn = [
      { field: 'location_quantity', headerName: `${location.city}`, width: 130, align: 'center', headerAlign: 'center' },
    ]
  }

  // CRUD - UPDATE FIELD
  const handleCommit = (e) => {
    let data = { item: { [e.field]: e.value } };
    let updateUrl = api_url + `/items/${e.id}`;
    axios.patch(updateUrl, data);
  };

  // CRUD - DELETE SELECTED 
  const handleDeleteAll = () => {
    // let arrayIds = this.state.selected
    for (let i = 0; i < selected.length; i++) {
      let id = selected[i];
      let deleteUrl = api_url + `/items/${id}`;
      // server-side delete
      axios.delete(deleteUrl)
        .then(() => {
          let _items = [...items];
          let _newItems = _items.filter(function (obj) {
            return obj.id !== id;
          });
          setItems(_newItems);
        });
    }
  };

  return (
    <Grid container spacing={3} direction="row" className='data-grid-container'>
      <Grid item alignSelf="flex-end">
        {/* Use MUI Popover if no selection is valid */}
        <Button
          variant="outlined"
          startIcon={<LocalShippingIcon />}
          sx={{ mb: "0.5rem", mr: "0.5rem", height: "%" }}
          onClick={() => handleOpen('moveLocItem')}
        >Move Item
        </Button>
        <Button
          variant="outlined"
          startIcon={<DeleteIcon />}
          onClick={handleDeleteAll}
          sx={{ marginBottom: "0.5rem", marginRight: "0.5rem" }}
        >Delete
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
  );
}

export default AllInventory;