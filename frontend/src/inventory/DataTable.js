import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID' },
  { field: 'name', headerName: 'Name' },
  { field: 'vendor', headerName: 'Vendor / Source' },
  { field: 'quantity', headerName: 'Quantity' },
  { field: 'price', headerName: 'Price' },
  { field: 'description', headerName: 'Description' },
  { field: 'category', headerName: 'Category' },
  { field: 'user_id', headerName: 'User ID' },

  // { field: 'col1', headerName: 'Column 1', width: 150 },
  // { field: 'col2', headerName: 'Column 2', width: 150 },
];

const api_url = 'http://localhost:3001/api/v1/items';

const DataTable = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    fetch(api_url)
      .then(res => res.json())
      .then(json => setData(json))
  }, []);
  return (
    <DataGrid
      rows={data}
      columns={columns}
    />
  )
}

export default DataTable;