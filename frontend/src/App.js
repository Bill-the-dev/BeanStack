import './App.css';
import AllInventory from './components/inventory/AllInventory';
import LocInventory from './components/inventory/LocInventory';
import { Typography, Paper, Container } from "@mui/material";

function App() {
  return (
    <div className="App">
      <header className="App-header">

        <Typography variant="h1">BeanStack</Typography>
        <hr />
      </header>
      <Container>
        <Paper elevation={3} sx={{ p: "1rem", mt: "1rem"}}>
          <Typography variant="h4" sx={{ pt: "1rem", pb: "1.5rem"}}>Inventory - Combined</Typography>
          <AllInventory /> 
        </Paper>
      </Container>
      <Container>
        <Paper elevation={3} sx={{p: "1rem", mt: "1rem"}}>
          <Typography variant="h4" sx={{ pt: "1rem", pb: "1.5rem" }}>Inventory - By Location</Typography>
          <LocInventory />
        </Paper>
      </Container>
      
    </div>
  );
}

export default App;
