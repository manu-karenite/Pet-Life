import * as React from "react";
import { useNavigate } from "react-router-dom";
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
import { Logout } from "@mui/icons-material";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));
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
      type: "USER",
      payload: null,
    });
    if (window !== "undefined" && window.localStorage.getItem("UserLoggedIn")) {
      window.localStorage.removeItem("UserLoggedIn");
    }
    navigate("/login");
  };
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="sticky" style={{ backgroundColor: "#121916" }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              logo
            </Typography>
            {user && (
              <Button color="inherit" onClick={(e) => navigate("/menu")}>
                Hotels
              </Button>
            )}
            {user && (
              <Button color="inherit" onClick={(e) => navigate("/dashboard")}>
                Dashboard
              </Button>
            )}

            {user && (
              <Button
                color="inherit"
                onClick={(e) => navigate("/dashboard/my-profile")}
              >
                Profile
              </Button>
            )}
            {user && (
              <Button color="inherit" onClick={(e) => navigate("/contact")}>
                Contact Us
              </Button>
            )}

            {user && (
              <Button color="inherit" onClick={(e) => navigate("/about")}>
                About Us
              </Button>
            )}
            {/* for non loggedin user */}
            {!user && (
              <Button color="inherit" onClick={(e) => navigate("/menu")}>
                Hotels
              </Button>
            )}
            {!user && (
              <Button color="inherit" onClick={(e) => navigate("/about")}>
                About Us
              </Button>
            )}
            {!user && (
              <Button color="inherit" onClick={(e) => navigate("/contact")}>
                Contact Us
              </Button>
            )}
            {!user && (
              <Button color="inherit" onClick={(e) => navigate("/")}>
                Home
              </Button>
            )}
            {!user && (
              <Button color="inherit" onClick={(e) => navigate("/login")}>
                Login
              </Button>
            )}

            {user && (
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
                      backgroundColor: "grey",
                      color: "white",
                    }}
                  >
                    {`${user.name.split(" ")[0][0]}`}
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
        <MenuItem onClick={(e) => navigate("/dashboard/my-profile")}>
          <Avatar /> Profile
        </MenuItem>

        {user && (
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

export default Navbar;
