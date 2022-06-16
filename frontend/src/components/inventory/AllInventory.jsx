import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { merge } from 'lodash';
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
];

function AllInventory(props) {
  const [items, setItems] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selected, setSelected] = useState([]);
  const [gridData, setGridData] = useState([])
  const [colData, setColData] = useState(columns)
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
      let columnsToAdd = []

      for (let i = 0; i < locations.length; i++) {
        const location = locations[i];
        const locItems = await axios(`${api_url}/locations/${location.id}/location_items`)
        // replacing state in loop
        // addLocItemCol(location, locItems)
        debugger 

        let newColumn = (addLocColumn(location))
        if (newColumn) {
          columnsToAdd.push(newColumn)
        }
      }
      debugger
      // spread preserves, merge does not
      let newColData = [...colData, ...columnsToAdd];
      console.log(newColData);
      setColData(newColData);
    }

    if (locations && items) {fetchLocItems()};

  }, [open]);
  // }, [open, locations, items]);

  const addLocColumn = (location) => {
    // ensure multi-word cities follow column naming
    const locCity = location.city.split(' ').join('');
    const newColumn = {
      field: `${locCity}`, headerName: `${location.city}`, width: 130, align: 'center', headerAlign: 'center'
    }
    
    let addColumn = true;
    columns.forEach(column => {
      debugger;
      if (column.headerName === location.city) {
        debugger
        console.log(column.headerName === location.city)
        addColumn = false;
      }
    });

    // update columns if newColumn doesn't exist (true or false)
    if (addColumn) {
      return newColumn
    } else {
      return null
    }
  }

  // // Set LocItems Quantity per Location in datagrid
  // const addLocItemCol = (location, locItems) => {
  //   debugger
  //   if (items.length === 0 || locations.length === 0) {return}
    
  //   // ensure multi-word cities follow column naming
  //   const locCity = location.city.split(' ').join('')
  //   const newColumn = { 
  //     field: `${locCity}`, headerName: `${location.city}`, width: 130, align: 'center', headerAlign: 'center' 
  //   }
    
  //   let addColumn = true 
  //   columns.forEach(column => {
  //     debugger
  //     if (column.headerName === location.city) {
  //       addColumn = false
  //     }
  //   })

  //   // update columns if newColumn doesn't exist (true or false)
  //   if (addColumn){
  //     debugger

  //     // const newColData = Object.assign([], colData, [newColumn])  
  //     // const newColData = Object.assign([], colData)  
  //     const newColData = merge([], colData)  
  //     newColData.push(newColumn)
  //     setColData(newColData)    
      
  //     // row data in own method?
  //     let mergeData = []
  //     for (let i = 0; i < locItems.data.length; i++) {
  //       debugger
        
  //       const locItemQuantity = { [locCity]: locItems.data[i].location_quantity };
  //       const item = items[i];
  //       // let locItemMerged = Object.assign(item, locItemQuantity);
  //       let locItemMerged = merge(item, locItemQuantity);
  //       mergeData.push(locItemMerged);
  //       console.log(mergeData);
  //     }
  //     debugger
  //     // problem here. Iterates through the items  
  //     setGridData(mergeData);
  //   }
  // }


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
          // rows={items}
          rows={gridData}
          columns={colData}
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