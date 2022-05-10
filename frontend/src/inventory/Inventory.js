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
    // _underscore is temporary, ... duplicates and creates new array
    let _items = [...this.state.items]
    _items.push(item)
    this.setState({
      items: _items
    })
  }

  render() {
    console.log(this.state.items)
    let items = this.state.items
    return (
      <div className='data-grid-container'>
        <DataTable 
          rows={items}
        />
        <hr />
        <ItemForm api_url={api_url} updateInventory={this.updateInventory}/>
      </div>
    )
  }


}

export default Inventory;