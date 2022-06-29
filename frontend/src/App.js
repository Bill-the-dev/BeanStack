import './App.css';
import AllInventory from './components/inventory/AllInventory';
import LocInventory from './components/inventory/LocInventory';
import { useState } from 'react'
import { Typography, Paper, Container } from "@mui/material";

function App() {

  // Passed as props to update both tables on change
  // May only need open for AllInventory
  const [open, setOpen] = useState(false);
  const [type, setType] = useState('')

  const handleOpen = (type) => {
    setType(type);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  }

  return (
    <div className="App">
      <header className="App-header">
        <Typography variant="h1" sx={{ml: "2rem"}}>BeanStack</Typography>
        <hr />
      </header>
      <Container>
        <Paper elevation={3} sx={{ p: "1rem", mt: "1rem"}}>
          <Typography variant="h4" sx={{ pt: "1rem", pb: "1.5rem"}}>Inventory - All Locations</Typography>
          <AllInventory 
            open={open} setOpen={setOpen}  
            type={type} setType={setType}
            handleOpen={handleOpen}
          /> 
        </Paper>
      </Container>
      <Container>
        <Paper elevation={3} sx={{p: "1rem", mt: "1rem"}}>
          <Typography variant="h4" sx={{ pt: "1rem", pb: "1.5rem" }}>Inventory - By Location</Typography>
          <LocInventory 
            open={open} setOpen={setOpen}
            type={type} setType={setType}
            handleOpen={handleOpen} handleClose={handleClose}          
          />
        </Paper>
      </Container>
      
    </div>
  );
}

export default App;
