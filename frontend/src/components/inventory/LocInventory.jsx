import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TableSelect from './TableSelect';
import ItemForm from './ItemForm';
import { Button, Grid, Paper, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import WarehouseIcon from '@mui/icons-material/Warehouse'
import AddBoxIcon from '@mui/icons-material/AddBox';

const api_url = 'http://localhost:3001/api/v1/';
// location quantity edit should prompt a modal with current item quantities in all locations and a change or move option.

const columns = [
  { field: 'id', headerName: 'ID', width: 75 },
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'vendor', headerName: 'Vendor / Source', width: 150 },
  { field: 'location_quantity', headerName: 'Location Quantity', width: 130, align: 'center', headerAlign: 'center' },
  { field: 'quantity', headerName: 'Total Quantity', width: 130, align: 'center', headerAlign: 'center' },
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
  { field: 'description', headerName: 'Description', width: 200 },
  { field: 'category', headerName: 'Category', width: 150 },
  { field: 'user_id', headerName: 'User ID', width: 75 },
];

function LocInventory() {
  const [apiUrlLoc, setApiUrlLoc] = useState('');
  const [locItems, setLocItems] = useState([]);
  const [items, setItems] = useState([]);
  const [gridData, setGridData] = useState([])
  const [selected, setSelected] = useState([]);

  const setLocUrl = (value) => {
    setApiUrlLoc(`${api_url}/locations/${value}`);
  };

  // GET items on mount
  useEffect(() => {
    async function fetchItems() {
      const result = await axios(`${api_url}/items`);
      setItems(result.data);
      console.log(result.data);
    }
    fetchItems();
  }, []);

  // GET locItems and assign
  useEffect(() => {
    if (apiUrlLoc !== '') {
      axios(`${apiUrlLoc}/location_items`)
        .then((result) => {
          console.log(result.data);
          return setLocItems(result.data);
        });
    }
  }, [apiUrlLoc]);

  // SET location grid data
  // Two dependencies => will run when EITHER changes
  useEffect(() => {
    if (locItems && items) {
      mergeLocData()
    }
  }, [items, locItems])
  
  
  // locItems and items length are always in parallel
  const mergeLocData = () => {
    let mergeData = []
    for (let i = 0; i < locItems.length; i++) {
      const locItemQuantity = {location_quantity: locItems[i].location_quantity};
      const item = items[i];
      let locItemMerged = Object.assign(item, locItemQuantity);
      mergeData.push(locItemMerged)
      console.log(mergeData);
    }
    setGridData(mergeData)
  }

  // CRUD - UPDATE FIELD
  const handleCommit = (e) => {
    let data = { item: { [e.field]: e.value } };
    let updateUrl = apiUrlLoc + `/${e.id}`;
    axios.patch(updateUrl, data);
  };

  return (
    <Grid container spacing={2} direction="row" className='data-grid-container'>
      <Grid item xs={6} s={6}>
        <TableSelect setLocUrl={setLocUrl} />
      </Grid>
      <Grid item xs={6} s={6}>
        <Weather apiUrlLoc={apiUrlLoc}/>
      </Grid>
      {/* <Grid item >
        <Button
          variant="outlined"
          startIcon={<LocalShippingIcon />}
          sx={{ mb: "0.5rem", mr: "0.5rem", height: "%" }}
        >Move Item
        </Button>
      </Grid>
      <Grid item >
        <Button
          variant="outlined"
          startIcon={<AddBoxIcon />}
          sx={{ mb: "0.5rem", mr: "0.5rem", height: "%" }}
        >Create Item
        </Button>
      </Grid>
      <Grid item >
        <Button
          variant="outlined"
          startIcon={<WarehouseIcon />}
          sx={{ mb: "0.5rem", mr: "0.5rem", height: "%" }}
        >Create Location
        </Button>
      </Grid> */}
      <Grid item xs={12} sx={{
        height: "60vh",
      }}>
        { locItems
        ? <DataGrid
          // locItems={locItems}
          rows={gridData}
          columns={columns}
          loading={!items.length && !locItems.length}
          checkboxSelection
          onSelectionModelChange={(data) => setSelected(data)}
          onCellEditCommit={handleCommit}
          rowsPerPageOptions={[10, 50, 100]}
        />
        : <></>
        }
      </Grid>
      <hr />
    </Grid>
  );
}

function Weather(props) {
  const { apiUrlLoc } = props
  const [weather, setWeather] = useState({})

  useEffect(() => {
    if (apiUrlLoc !== '') {
      axios(`${apiUrlLoc}/weather`)
        .then((result) => {
          console.log(result.data);
          return setWeather(result.data);
        });
    }
  }, [apiUrlLoc])

  return (
    <Paper
      // elevation={3}
      variant='outlined'
      sx={{p: "1rem"}}
    >
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h5">Current Weather</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h3">{weather.temp}&deg;F</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6">{weather.description}</Typography>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default LocInventory;
