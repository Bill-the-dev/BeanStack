import React, {Component} from 'react';
// import { DataGrid } from '@mui/x-data-grid';
// import Item from './Item';
import ItemForm from './ItemForm';
import DataTable from './DataTable';

const api_url = 'http://localhost:3001/api/v1/items';



class Inventory extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: []
    }
    this.updateInventory = this.updateInventory.bind(this)
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
    // _underscore is temporary
    let _items = this.state.items
    _items.push(item)
    this.setState({
      items: _items
    })
  }

  render() {
    console.log(this.state.items)
    // const columns = [
    //   { field: 'id', headerName: 'ID' },
    //   { field: 'name', headerName: 'Name' },
    //   { field: 'vendor', headerName: 'Vendor / Source' },
    //   { field: 'quantity', headerName: 'Quantity' },
    //   { field: 'price', headerName: 'Price' },
    //   { field: 'description', headerName: 'Description' },
    //   { field: 'category', headerName: 'Category' },
    //   { field: 'user_id', headerName: 'User ID' },
      
      // { field: 'col1', headerName: 'Column 1', width: 150 },
      // { field: 'col2', headerName: 'Column 2', width: 150 },
    // ];

    // const rows = [
      // this.state.items.map((item, index) => {
      //   return (
      //     { id: item.id, name: item.name }

      //   );
      // })
      // this.state.items
      // { id: 1, col1: 'Hello', col2: 'World' },
      // { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
      // { id: 3, col1: 'MUI', col2: 'is Amazing' },
    // ]


    return (
      <div className='data-grid-container'>
        <DataTable />
        {/* <DataGrid 
          // getRowId={(row) => row.id}
          // rows={rows}
          // columns={columns}
          // pageSize={100}
          // checkboxSelection 
        /> */}
        {/* <ul className='items-list'>
          <p>Item Name</p>
          {this.state.items.map((item) => {
            // return <li key={item.id}>{item.name}</li>
            return <Item key={item.id} item={item}/>
          })}
        </ul> */}
        <ItemForm api_url={api_url} updateInventory={this.updateInventory}/>
      </div>
    )
  }


}

export default Inventory;