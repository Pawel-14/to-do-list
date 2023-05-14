import "../App.css";
import axios from "axios";
import React, { useState } from "react";
import Button from "@mui/material/Button";
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

export default function UpdateTask({ open2, onClose2 }) {
  const [open, setOpen2] = useState(false);
  const [update, setUpdate] = useState("");

  const handleUpdate = () => {
    onClose2();
    // onUpdate();
  };

  const handleChange = (event) => {
    setUpdate(event.target.value);
  };

  // const handleTaskUpdate = () => {
  //   const options = {
  //     method: "PUT",
  //     url: `https://app.asana.com/api/1.0/tasks/${selectedTask.gid}`,
  //     headers: {
  //       accept: "application/json",
  //       "content-type": "application/json",
  //       authorization:
  //         "Bearer 1/1204522153610557:c273f615edb3d7722a3a6104335b636e",
  //     },
  //     data: { data: { name: "", workspace: "1140774634764598" } },
  //   };
  //   axios
  //     .request(options)
  //     .then(function (response) {
  //       setTasks(tasks);
  //       console.log(response.data);
  //     })
  //     .catch(function (error) {
  //       console.error(error);
  //     });
  // setOpen2(false);
  // };

  return (
    <div>
      <Modal
        open={open2}
        onClose={onClose2}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <div className="newtask-modalbox">
            <p className="newtask-popup-title">Task Editor</p>
            <TextField
              label="Edit a task"
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
              // onClick={handleUpdate}
            >
              Update
            </Button>
            <Button
              size="medium"
              variant="outlined"
              color="error"
              onClick={onClose2}
            >
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
