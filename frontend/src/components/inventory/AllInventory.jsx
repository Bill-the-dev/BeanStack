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
  const [rowData, setRowData] = useState(items);
  const [colData, setColData] = useState(columns);
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
    debugger;
    // multiple concurrent requests
    Promise.all([fetchLocations(), fetchItems()]);
  }, [open]);

  // GET locItems per loc on update
  useEffect(() => {
    async function fetchLocCols() {
      let columnsToAdd = [];

      for (let i = 0; i < locations.length; i++) {
        const location = locations[i];
        let newColumn = addLocColumn(location);
        if (newColumn) {
          columnsToAdd.push(newColumn);
        }
      }
      // spread preserves, merge does not
      let newColData = [...colData, ...columnsToAdd];
      console.log(newColData);
      setColData(newColData);
    }

    async function fetchLocItems() {
      let locItemsToAdd = [];
      for (let i = 0; i < locations.length; i++) {
        // debugger
        const location = locations[i];
        const locItems = await axios.get(`${api_url}/locations/${location.id}/location_items`);
        let newLocItems = addRowData(location, locItems.data);
        debugger
        locItemsToAdd.push(...newLocItems);
      }
      // locItemsToAdd is incorrect. locItems.data will partially resolve
      let newRowData = [...new Set([...rowData, ...locItemsToAdd])];
      // debugger
      // data format is wrong! items almost sets it correctly
      setRowData(newRowData)
    }
    // locations + default (5) columns
    if ((locations.length + 5) !== colData.length) { fetchLocCols(); };
    if (locations.length > 0) {fetchLocItems()};
  }, [open, locations, items, colData]);

  // line 79 is pushing a redundant array.  Move merge outside? Return only locItems?
  const addRowData = (location, locItems) => {
    let mergeData = [];
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const locItem = locItems[i];
      const locItemQuantity = { [location.city]: locItem.location_quantity };
      let locItemMerged = merge(item, locItemQuantity);
      mergeData.push(locItemMerged);
      console.log(mergeData);
    }  
    return mergeData;
  };


  const addLocColumn = (location) => {
    // ensure multi-word cities follow column naming
    const locCity = location.city.split(' ').join('');
    const newColumn = {
      field: `${locCity}`, headerName: `${location.city}`, width: 130, align: 'center', headerAlign: 'center'
    };

    let addColumn = true;
    colData.forEach(column => {
      console.log(`location.city ${location.city}`);
      console.log(`column.headerName ${column.headerName}`);
      if (column.headerName === location.city) {
        addColumn = false;
      }
    });

    // update columns if newColumn doesn't exist (true or false)
    if (addColumn) {
      return newColumn;
    } else {
      return null;
    }
  };



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
  //     setRowData(mergeData);
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
        {(rowData.length === 0)
          ? null
          : <DataGrid
            // rows={items}
            getRowId={(r) => r.id}
            rows={rowData}
            columns={colData}
            loading={!items.length}
            checkboxSelection
            onSelectionModelChange={(data) => setSelected(data)}
            onCellEditCommit={handleCommit}
            rowsPerPageOptions={[10, 50, 100]}
          />
        }
      </Grid>
      <hr />
    </Grid>
  );
}

export default AllInventory;