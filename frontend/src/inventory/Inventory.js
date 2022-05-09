import React, {Component} from 'react';
import Item from './Item';
const api_url = 'http://localhost:3001/api/v1/items';

class Inventory extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: []
    }
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

  render() {
    console.log(this.state.items)
    return (
      <div>
        <ul className='items-list'>
          <p>Item Name</p>
          {this.state.items.map((item) => {
            // return <li key={item.id}>{item.name}</li>
            return <Item key={item.id} item={item}/>
          })}
        </ul>
      </div>
    )
  }


}

export default Inventory;