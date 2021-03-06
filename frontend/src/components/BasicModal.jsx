import * as React from 'react';
import { Paper, Modal, Typography } from '@mui/material'
import ItemForm from './forms/ItemForm';
import LocationForm from './forms/LocationForm';
import MoveLocItemForm from './forms/MoveLocItemForm'

// Modal has visible margin bottom and right in all, check if modal or paper should have 'style'
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  overflow: 'scroll',
  width: '60%',
  maxHeight: '80%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '1px',
  p: 4,
};

export default function BasicModal(props) {
  const { open, handleClose, type } = props
  switch (type) {
    case 'createItem':
      return (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Paper sx={style}>
            <ItemForm handleClose={handleClose} />
          </Paper>
        </Modal>
      );        
    case 'createLocation':
      return (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Paper sx={style}>
            <LocationForm handleClose={handleClose} />
          </Paper>
        </Modal>
      );        
    case 'moveLocItem':
      return (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Paper sx={style}>
            <MoveLocItemForm handleClose={handleClose} />
          </Paper>
        </Modal>
      );        
    default:
      return (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Paper sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </Paper>
        </Modal>
      );
  }
}