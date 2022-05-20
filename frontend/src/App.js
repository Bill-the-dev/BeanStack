import './App.css';
import AllInventory from './components/inventory/AllInventory';
import TableSelect from './components/TableSelect';
import { Typography, Paper } from "@mui/material";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Typography variant="h1">BeanStack</Typography>
        <hr />
      </header>
      <Paper elevation={3} sx={{p: "1rem"}}>
        <TableSelect />
        {/* {
          switch (location) {
          case value:
            
            break;
        
          default:
            break;
        }} */}
        <AllInventory />
      </Paper>
      
    </div>
  );
}

export default App;
