import "../App.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 550,
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

export default function UpdateTask({
  open2,
  onClose2,
  taskId,
  taskName,
  gettasks,
  showprogress,
}) {
  const [update, setUpdate] = useState("");
  const [show, setShow] = useState(false);

  const handleChange = (event) => {
    setUpdate(event.target.value);
  };

  const handleCheck = () => {
    if (update.length !== 0) {
      handleTaskUpdate();
    } else {
      setShow(true);
    }
  };

  useEffect(() => {
    if (taskName) {
      setUpdate(taskName);
    }
  }, [taskName]);

  const handleTaskUpdate = () => {
    const options = {
      method: "PUT",
      url: `https://app.asana.com/api/1.0/tasks/${taskId}`,
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        authorization:
          "Bearer 1/1204273633699513:48776854ea4da805eeb3b480683606a1",
      },
      data: { data: { name: String(update), workspace: "1204273642736672" } },
    };

    showprogress(true);

    axios
      .request(options)
      .then(function (response) {
        gettasks();
      })
      .catch(function (error) {});
    setShow(false);
    onClose2();
  };

  return (
    <div>
      <Modal
        open={open2}
        onClose={onClose2}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box className="popupbox" sx={{ ...style, width: 410 }}>
          <p className="newtask-popup-title">Task Editor</p>
          <TextField
            InputProps={{ style: { color: "white" } }}
            defaultValue={taskName}
            label="Edit a task"
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
