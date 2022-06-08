import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TableSelect from './TableSelect';
import BasicModal from '../BasicModal';

// MUI
import { Button, Grid, Paper, Typography, Modal, Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

// ICONS
import DeleteIcon from '@mui/icons-material/Delete';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import WarehouseIcon from '@mui/icons-material/Warehouse'
import AddBoxIcon from '@mui/icons-material/AddBox';


const api_url = 'http://localhost:3001/api/v1';
// location quantity edit should prompt a modal with current item quantities in all locations and a change or move option.


// --- Inventory By Location ---
function LocInventory() {
  const [apiUrlLoc, setApiUrlLoc] = useState('');
  const [locItems, setLocItems] = useState([]);
  const [items, setItems] = useState([]);
  const [gridData, setGridData] = useState([])
  const [selected, setSelected] = useState([]);
  const [open, setOpen] = useState(false);
  const [type, setType] = useState('')
  const [locations, setLocations] = useState([]);

  
  const handleOpen = (type) => {
    setType(type)
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  }

  const setLocUrl = (value) => {
    setApiUrlLoc(`${api_url}/locations/${value}`);
  };

  // GET locations, prop to TableSelect
  const getLocations = async () => {
    const res = await axios.get(`${api_url}/locations`)
    return res.data
  }

  // GET locations, items on update
  useEffect(() => {
    async function fetchLocations() {
      const result = await axios(`${api_url}/locations`);
      setLocations(result.data);
      console.log(result.data);
    }
    // added fetch items - not updating the locationitems
    async function fetchItems() {
      const result = await axios(`${api_url}/items`);
      debugger
      setItems(result.data);
      console.log(result.data);
    }
    fetchLocations();
    fetchItems();
  }, [open]);
  

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
  }, [apiUrlLoc, open]);

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
  }



  return (
    <Grid container spacing={2} direction="row" justifyContent="space-between" className='data-grid-container'>
      <BasicModal open={open} handleClose={handleClose} type={type} getLocations={getLocations} setLocations={setLocations} locations={locations}/>
      <Grid item xs={12} >
        <TableSelect setLocUrl={setLocUrl} getLocations={getLocations} setLocations={setLocations} locations={locations} />
      </Grid>
      <Grid item xs={4}>
        <Weather apiUrlLoc={apiUrlLoc}/>
      </Grid>
      <Grid item alignSelf="flex-end">
        {/* Use MUI Popover if no selection is valid */}
        <Button
          variant="outlined"
          startIcon={<LocalShippingIcon />}
          sx={{ mb: "0.5rem", mr: "0.5rem", height: "%" }}
        >Move Item
        </Button>
        <Button
          variant="outlined"
          startIcon={<AddBoxIcon />}
          sx={{ mb: "0.5rem", mr: "0.5rem", height: "%" }}
          onClick={() => handleOpen('createItem')}
        >Create Item
        </Button>
        <Button
          variant="outlined"
          startIcon={<WarehouseIcon />}
          sx={{ mb: "0.5rem", mr: "0.5rem", height: "%" }}
          onClick={() => handleOpen('createLocation')}
        >Create Location
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
        { locItems
        ? <DataGrid
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

// --- DataGrid Columns ---
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


// --- Weather API Tile ---
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
      variant='outlined'
      sx={{p: "1rem"}}
    >
      <Grid container direction="row" justifyContent="space-around" alignItems="right">
        <Grid item xs={12}>
          <Typography variant="h5" sx={{ mt: "0.2rem", mb: "1rem"}}>Current Weather</Typography>
        </Grid>
        <Grid item xs={6} >
          <Typography variant="h2" sx={{ p: "1rem", pt: "1.6rem" }}>{weather.temp}&deg;F</Typography>
        </Grid>
        <Grid item xs={6}>
          <img src={weather.icon} alt="weather-icon" />
          <Typography variant="h6">{weather.description}</Typography>
        </Grid>
      </Grid>
    </Paper>
  )
}


export default LocInventory;
