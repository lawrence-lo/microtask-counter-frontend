import React from "react";
import TaskItem from "./TaskItem";
import List from "@mui/material/List";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import Pagination from "@mui/material/Pagination";
import usePagination from "../../hooks/usePagination";
import Box from "@mui/material/Box";

const ITEMS_PER_PAGE = 10;

const TasksList = (props) => {
  const authUser = useSelector((state) => state.auth);
  const [user, setUser] = React.useState("");
  const { currentPage, getCurrentData, setCurrentPage, pageCount } =
    usePagination(props.items, ITEMS_PER_PAGE);

  const handleChange = (event) => {
    setUser(event.target.value);
    props.onSelectUser(event.target.value);
  };

  return (
    <div>
      {authUser.username === "admin" && (
        <>
          <Stack direction="row" justifyContent="center">
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="user-select-label">Select user</InputLabel>
              <Select
                labelId="user-select-label"
                id="user-select"
                value={user}
                label="Select user"
                onChange={handleChange}
              >
                {props.users.map((user) => (
                  <MenuItem value={user.id} key={user.id}>
                    {user.username}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
          <Divider />
        </>
      )}
      {props.items.length === 0 ? (
        <Typography variant="h2" align="center">
          {user !== "" && "No tasks found."}
        </Typography>
      ) : (
        <Box display="flex" flexDirection="column" alignItems="center">
          <List sx={{ width: "100%" }}>
            {getCurrentData().map((task) => (
              <TaskItem
                key={task.id}
                id={task.id}
                date={task.date}
                type={task.type}
                minute={task.minute}
                second={task.second}
                count={task.count}
                onDelete={props.onDeleteItem}
                onUpdate={props.onUpdateItem}
                types={props.types}
                selectedUser={user}
              />
            ))}
          </List>
          <Pagination
            onChange={(_, newPage) => setCurrentPage(newPage)}
            page={currentPage}
            count={pageCount}
            variant="outlined"
            shape="rounded"
            sx={{ py: 2 }}
          />
        </Box>
      )}
    </div>
  );
};

export default TasksList;
