import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeleteTaskConfirm({ open, onClose, onDelete }) {
  const handleDelete = () => {
    onDelete();
    onClose();
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{"Na pewno?"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Czy chcesz usunąć tego taska?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          size="large"
          color="error"
          variant="contained"
          onClick={onClose}
        >
          Nie
        </Button>
        <Button
          size="large"
          color="success"
          variant="contained"
          onClick={handleDelete}
        >
          Tak
        </Button>
      </DialogActions>
    </Dialog>
  );
}
