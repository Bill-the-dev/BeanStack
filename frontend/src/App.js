import './App.css';
import Inventory from './inventory/Inventory';
import Typography from "@mui/material/Typography";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Typography variant="h1">Inventorify</Typography>
        <hr />
        <Inventory />
      </header>
    </div>
  );
}

export default App;
