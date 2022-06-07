import React, { useState, useEffect, useCallback } from "react";
import NewTask from "../NewTask/NewTask";
import TasksList from "./TasksList";
import TasksSummary from "./TasksSummary";
import config from "../../config";
import Typography from "@mui/material/Typography";

const axios = require("axios");

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getTasksHandler = useCallback(() => {
    setIsLoading(true);

    axios
      .get(`${config.baseUrl}/tasks`, {
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log(response.data);

        const data = response.data;
        const loadedTasks = [];

        for (const key in data) {
          loadedTasks.push({
            id: data[key]._id,
            date: data[key].date,
            type: data[key].type,
            minute: data[key].minute,
            second: data[key].second,
            count: data[key].count,
          });
        }

        loadedTasks.reverse();

        setTasks(loadedTasks);
      })
      .catch((error) => {
        console.log(error);
      });

      

    setIsLoading(false);
  }, []);

  useEffect(() => {
    getTasksHandler();
  }, [getTasksHandler]);

  const addTaskHandler = (task) => {

    axios
    .post(`${config.baseUrl}/tasks`, task, {
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    }).then((response) => {
      console.log(response)

      setTasks((prevTasks) => {
        return [{
          id: response.data._id,
          date: response.data.date,
          type: response.data.type,
          minute: response.data.minute,
          second: response.data.second,
          count: response.data.count,
        }, ...prevTasks];
      });
    })
    .catch((error) => {
      console.log(error)
    });

    // setTasks((prevTasks) => {
    //   return [task, ...prevTasks];
    // });
  };

  const deleteItemHandler = (taskId) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.filter((task) => task.id !== taskId);
      return updatedTasks;
    });
  };

  return (
    <div>
      <NewTask onAddTask={addTaskHandler} />
      <TasksSummary items={tasks} />

      {isLoading ? (
        <Typography variant="h2" align="center">
          Loading...
        </Typography>
      ) : tasks.length === 0 ? (
        <Typography variant="h2" align="center">
          No tasks found.
        </Typography>
      ) : (
        <TasksList items={tasks} onDeleteItem={deleteItemHandler} />
      )}
    </div>
  );
};

export default Tasks;
