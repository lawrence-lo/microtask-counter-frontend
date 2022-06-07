import React from "react";
// import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import LogoutIcon from "@mui/icons-material/Logout";
import Link from "@mui/material/Link";

const Navbar = (props) => {
  const history = useHistory();

  const logoutHandler = () => {
    localStorage.clear();
    history.push("/login");
    props.onLogout();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ boxShadow: 0 }}>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
            }}
          >
            <Link
              href="/"
              sx={{
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Microtask Counter
            </Link>
          </Typography>
          {localStorage.getItem("token") !== null && (
            <Typography variant="h6" color="inherit" component="div">
              {props.user.username}
            </Typography>
          )}
          {localStorage.getItem("token") !== null && (
            <Button
              variant="contained"
              disableElevation
              component="div"
              onClick={logoutHandler}
              sx={{ ml: 2 }}
            >
              <LogoutIcon />
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default Navbar;
