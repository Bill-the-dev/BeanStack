import './App.css';
import Inventory from './components/inventory/Inventory';
import TableHeader from './components/TableHeader';
import { Typography, Paper } from "@mui/material";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Typography variant="h1">BeanStack</Typography>
        <hr />
      </header>
      <Paper elevation={3} sx={{p: "1rem"}}>
        <TableHeader />
        <Inventory />
      </Paper>
      
    </div>
  );
}

export default App;
