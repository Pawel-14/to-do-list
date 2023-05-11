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
  bgcolor: "#172237",
  border: "2px solid #1F6FEB;",
  borderRadius: "3%",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function AddNewTask(props) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleNewTask = () => {
    setText(text);
    console.log(text);

    const options = {
      method: "POST",
      url: "https://app.asana.com/api/1.0/tasks",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        authorization:
          "Bearer 1/1204522153610557:c273f615edb3d7722a3a6104335b636e",
      },
      data: {
        data: {
          projects: ["1204530829133645"],
          name: String(text),
          workspace: "1140774634764598",
          assignee_section: "1204530829133648",
          resource_subtype: "default_task",
          assignee_status: "upcoming",
          liked: false,
          assignee: "1204522159622443",
        },
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data)
          props.onAdd();
      })
      .catch(function (error) {
        console.error(error);
      });
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
        <Box sx={{ ...style, width: 400 }}>
          <div className="newtask-modalbox">
            <p className="newtask-popup-title">Task Creator</p>
            <TextField
              label="Create task"
              variant="outlined"
              color="info"
              onChange={handleChange}
              focused
            />
          </div>
          <div className="cancel-newtask-btn">
            <Button
              size="medium"
              variant="outlined"
              color="success"
              onClick={handleNewTask}
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
