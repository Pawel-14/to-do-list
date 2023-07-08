import "../App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import DeleteTask from "./DeleteTask";
import TaskActions from "./TaskActions";
import AddNewTask from "./AddNewTask";
import UpdateTask from "./UpdateTask";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedTask2, setSelectedTask2] = useState(null);
  const [TaskId, setTaskId] = useState(null);
  const [TaskName, setTaskName] = useState("");
  const [showProgress, setShowProgress] = useState(false);

  const auth = "Bearer 1/1204273633699513:48776854ea4da805eeb3b480683606a1";
  const project = "1204992612619560";

  const handleDeleteClick = (task) => {
    setSelectedTask(task);
  };

  const handleDeleteConfirm = () => {
    setSelectedTask(null);
  };

  const handleUpdateClick = (task) => {
    setSelectedTask2(task);
    setTaskId(task.gid);
    setTaskName(task.name);
  };

  const handleUpdateConfirm = () => {
    setSelectedTask2(null);
  };

  const handletasks = (withoutProgress = false) => {
    const options = {
      method: "GET",
      url: "https://app.asana.com/api/1.0/tasks",
      params: { project: project },
      headers: {
        accept: "application/json",
        authorization: auth,
      },
    };

    if (!withoutProgress) {
      setShowProgress(true);
    }

    axios
      .request(options)
      .then(function (response) {
        setTasks(response.data.data);
        setShowProgress(false);
      })
      .catch(function (error) {
        setShowProgress(false);
      });
  };

  useEffect(() => {
    setInterval(handletasks, 5000, [false]);
    handletasks();
  }, []);

  const handleTaskDelete = () => {
    const options = {
      method: "DELETE",
      url: `https://app.asana.com/api/1.0/tasks/${selectedTask.gid}`,
      headers: {
        accept: "application/json",
        authorization: auth,
      },
    };
    setShowProgress(true);
    axios
      .request(options)
      .then(function (response) {
        setTasks((test) =>
          test.filter((task) => task.gid !== selectedTask.gid)
        );
      })
      .catch(function (error) {
        if (error.response && error.response.status === 404) {
          handletasks();
        }
      });
  };
  return (
    <div className="list">
      <Stack direction="row">
        <div className="line"></div>
        <div className="tekst">TO DO LIST</div>
        <div className="line2"></div>
      </Stack>
      <div className="center-container">
        <Stack className="task-box">
          {showProgress ? (
            <Box sx={{ textAlign: "center" }}>
              <CircularProgress />
            </Box>
          ) : null}
          {tasks.length === 0 ? (
            <div className="notasks">No tasks found.</div>
          ) : (
            tasks.map((task) => (
              <div key={task.gid}>
                <div className="tasklist">
                  <li>{task.name}</li>
                  <TaskActions
                    ActionDelete={() => handleDeleteClick(task)}
                    ActionUpdate={() => handleUpdateClick(task)}
                  />
                </div>
              </div>
            ))
          )}
        </Stack>
      </div>

      <UpdateTask
        open2={Boolean(selectedTask2)}
        onClose2={handleUpdateConfirm}
        taskId={TaskId}
        taskName={TaskName}
        gettasks={handletasks}
        showprogress={setShowProgress}
      />

      <DeleteTask
        open={Boolean(selectedTask)}
        onClose={handleDeleteConfirm}
        onDelete={handleTaskDelete}
      />
      <AddNewTask
        showprogress={setShowProgress}
        gettasks={handletasks}
      ></AddNewTask>
    </div>
  );
}
