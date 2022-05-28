import * as React from 'react';
import ItemForm from './ItemForm';
import Paper from '@mui/material/Paper'
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  overflow: 'scroll',
  width: '60%',
  height: '90%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '1px',
  p: 4,
};

export default function BasicModal(props) {
  const {open, handleClose, type} = props

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Paper sx={style}>
        <ItemForm />
        {/* <Typography id="modal-modal-title" variant="h6" component="h2">
          Text in a modal
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </Typography> */}
      </Paper>
    </Modal>
  );
}