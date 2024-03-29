import "../App.css";
import { useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  "@media only screen and (max-width: 768px)": {
    width: 310,
  },
  bgcolor: "#172237",
  border: "2px solid #1F6FEB;",
  borderRadius: "3%",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function AddNewTask({ gettasks, showprogress }) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [show, setShow] = useState(false);

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleCheck = () => {
    if (text.length !== 0) {
      handleTaskCreate();
    } else {
      setShow(true);
    }
  };

  const handleTaskCreate = () => {
    const options = {
      method: "POST",
      url: "https://app.asana.com/api/1.0/tasks",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        authorization:
          "Bearer 1/1204273633699513:48776854ea4da805eeb3b480683606a1",
      },
      data: {
        data: {
          projects: ["1204992612619560"],
          name: String(text),
        },
      },
    };

    showprogress(true);

    axios
      .request(options)
      .then(function (response) {
        gettasks();
      })
      .catch(function (error) {});

    setText("");
    setShow(false);
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box className="popupbox" sx={{ ...style, width: 380 }}>
          <p className="newtask-popup-title">Task Creator</p>
          <TextField
            InputProps={{ style: { color: "white" } }}
            label="Create task"
            variant="outlined"
            color="info"
            onChange={handleChange}
            focused
          />
          {show ? <p className="fill-field">Please fill this field.</p> : null}

          <div className="cancel-newtask-btn">
            <Button
              size="medium"
              variant="outlined"
              color="success"
              onClick={handleCheck}
            >
              Add
            </Button>
            <Button
              size="medium"
              variant="outlined"
              color="error"
              onClick={handleClose}
            >
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>
      <div className="center-addbtn">
        <Button
          onClick={handleOpen}
          variant="contained"
          color="info"
          startIcon={<AddIcon />}
        >
          Add new task
        </Button>
      </div>
    </div>
  );
}
