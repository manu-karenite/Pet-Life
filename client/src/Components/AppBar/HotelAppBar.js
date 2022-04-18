import * as React from "react";

import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Settings from "@mui/icons-material/Settings";
import { useState } from "react";
import {
  AppBar,
  Tooltip,
  Avatar,
  Divider,
  ListItemIcon,
  MenuItem,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  MenuIcon,
  Menu,
} from "@mui/material";
import { PersonAdd, Logout } from "@mui/icons-material";

const HotelAppBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { hotel } = useSelector((state) => ({ ...state }));
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logoutHandler = () => {
    dispatch({
      type: "HOTEL",
      payload: null,
    });
    if (
      window !== "undefined" &&
      window.localStorage.getItem("hotelLoggedIn")
    ) {
      window.localStorage.removeItem("hotelLoggedIn");
    }
    navigate("/hotel/login");
  };
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="sticky">
          <Toolbar>
            {hotel && (
              <Button
                color="inherit"
                onClick={(e) => navigate("/hotel/dashboard")}
              >
                Home
              </Button>
            )}
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Hotels @ Pet-Life
            </Typography>

            {/* <Button color="inherit">Login</Button>
          <Button color="inherit">SignUp</Button> */}
            {!hotel && (
              <Button color="inherit" onClick={(e) => navigate("/hotel/login")}>
                Login
              </Button>
            )}
            {!hotel && (
              <Button
                color="inherit"
                onClick={(e) => navigate("/hotel/register")}
              >
                SignUp
              </Button>
            )}
            {hotel && hotel.name}
            {hotel && (
              <Tooltip title="Account settings">
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      backgroundColor: "#000",
                      color: "white",
                    }}
                  >
                    {`${hotel.name.split(" ")[0][0]}`}
                  </Avatar>
                </IconButton>
              </Tooltip>
            )}
          </Toolbar>
        </AppBar>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={(e) => navigate("/hotel/profile")}>
          <Avatar /> Profile
        </MenuItem>
        <Divider />

        {hotel && (
          <MenuItem onClick={logoutHandler}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        )}
      </Menu>
    </>
  );
};

export default HotelAppBar;
