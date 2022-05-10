import './App.css';
import Inventory from './inventory/Inventory';
import { Typography, Paper } from "@mui/material";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Typography variant="h1">BeanStack</Typography>
        <hr />
      </header>
      <Paper elevation={3}>
        <Inventory />
      </Paper>
      
    </div>
  );
}

export default App;
