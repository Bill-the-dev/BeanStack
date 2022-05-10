import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';

// const columns = [
//   { field: 'id', headerName: 'ID', width: 75 },
//   { field: 'name', headerName: 'Name', editable: true, width: 150 },
//   { field: 'vendor', headerName: 'Vendor / Source', width: 150 },
//   { field: 'quantity', headerName: 'Quantity', width: 75 },
//   { field: 'price', headerName: 'Price', width: 75 },
//   { field: 'description', headerName: 'Description', width: 200 },
//   { field: 'category', headerName: 'Category', width: 150},
//   { field: 'user_id', headerName: 'User ID', width: 75 },
// ];

// const api_url = 'http://localhost:3001/api/v1/items';

const DataTable = ({rows, columns}) => {
  // const [data, setData] = useState([])

  // useEffect(() => {
  //   fetch(api_url)
  //     .then(res => res.json())
  //     .then(json => setData(json))
  //     // .catch(() => onError())
  // }, []);
  return (
    <DataGrid
      rows={rows}
      columns={columns}
      loading={!rows.length}
      checkboxSelection
      onSelectionModelChange={(data) => {console.log(data)}}
      rowsPerPageOptions={[10, 50, 100]}
    />
    // <DataGrid
    //   rows={data}
    //   columns={columns}
    //   loading={!data.length}
    //   checkboxSelection
    //   rowsPerPageOptions={[10, 50, 100]}
    // />
  )
}

export default DataTable;