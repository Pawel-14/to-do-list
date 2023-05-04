import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Stack from "@mui/material/Stack";
import DeleteTaskConfirm from "./DeleteTaskConfirm";
import TaskActions from "./TaskActions";
export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };

  const handleCloseConfirm = () => {
    setSelectedTask(null);
  };

  const handleTaskDelete = () => {
    const options = {
      method: "DELETE",
      url: `https://app.asana.com/api/1.0/tasks/${selectedTask.gid}`,
      headers: {
        accept: "application/json",
        authorization:
          "Bearer 1/1204522153610557:c273f615edb3d7722a3a6104335b636e",
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

  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://app.asana.com/api/1.0/tasks",
      params: { project: "1204530829133645" },
      headers: {
        accept: "application/json",
        authorization:
          "Bearer 1/1204522153610557:c273f615edb3d7722a3a6104335b636e",
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
  }, []);

  return (
    <div className="list">
      <Stack direction="row">
        <div className="line"></div>
        <div className="tekst">TO DO LIST</div>
        <div className="line2"></div>
      </Stack>
      <div class="center-container">
        <Stack className="task-box">
          {tasks.length === 0 ? (
            <div className="notasks">No tasks found.</div>
          ) : (
            tasks.map((task) => (
              <div key={task.gid}>
                <div className="tasklist">
                  <li>{task.name}</li>
                  <TaskActions ActionDelete={() => handleTaskClick(task)} />
                </div>
              </div>
            ))
          )}
        </Stack>
      </div>
      <DeleteTaskConfirm
        open={selectedTask}
        onClose={handleCloseConfirm}
        onDelete={handleTaskDelete}
      />
    </div>
  );
}
