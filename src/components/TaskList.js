import "../App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Stack from "@mui/material/Stack";
import DeleteTask from "./DeleteTask";
import TaskActions from "./TaskActions";
import AddNewTask from "./AddNewTask";
import UpdateTask from "./UpdateTask";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  const auth = "Bearer 1/1204522153610557:c273f615edb3d7722a3a6104335b636e";
  const project = "1204530829133645";

  const handleDeleteClick = (task) => {
    setSelectedTask(task);
  };

  const handleUpdateClick = (task) => {
    setSelectedTask(task);
  };

  const handleDeleteConfirm = () => {
    setSelectedTask(null);
  };

  const handleUpdateConfirm = () => {
    setSelectedTask(null);
  };

  const handletasks = () => {
    const options = {
      method: "GET",
      url: "https://app.asana.com/api/1.0/tasks",
      params: { project: project },
      headers: {
        accept: "application/json",
        authorization: auth,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setTasks(response.data.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  useEffect(() => {
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

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        setTasks((test) =>
          test.filter((task) => task.gid !== selectedTask.gid)
        );
      })
      .catch(function (error) {
        console.error(error);
        console.log(selectedTask);
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
                    taskId={task.gid}
                  />
                </div>
              </div>
            ))
          )}
        </Stack>
      </div>
      <DeleteTask
        open={Boolean(selectedTask)}
        onClose={handleDeleteConfirm}
        onDelete={handleTaskDelete}
      />
      <UpdateTask
        open2={Boolean(selectedTask)}
        onClose2={handleUpdateConfirm}
      />
      <AddNewTask gettasks={handletasks}></AddNewTask>
    </div>
  );
}
