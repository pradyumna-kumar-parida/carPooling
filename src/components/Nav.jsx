import React, { useState } from "react";
import logoImg from "../assets/Images/logo-Img.png";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { FaUserCircle } from "react-icons/fa";

import { HiOutlineMenu } from "react-icons/hi";
import { FiUser } from "react-icons/fi";
import { FaRoute } from "react-icons/fa";
import { FaCarSide } from "react-icons/fa6";
import { FaCar } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { FiLogOut } from "react-icons/fi";
import { FiInfo } from "react-icons/fi";
import { FiHelpCircle } from "react-icons/fi";
import { FaSearchLocation } from "react-icons/fa";
const Header = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // MUI Menu state (for user avatar dropdown)
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // MUI Drawer state (for mobile hamburger)
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = (newOpen) => () => {
    setDrawerOpen(newOpen);
  };

  const handleLogout = () => {
    localStorage.clear();
    handleClose();
    setDrawerOpen(false);
    navigate("/login");
  };

  const user = JSON.parse(localStorage.getItem("user"))?.name;
  const role = localStorage.getItem("role");

  // Drawer content
  const DrawerList = (
    <Box sx={{ width: 260 }} role="presentation">
      {user && (
        <List>
          <ListItem>
            <div className="user-profile-text">
              <span className="user-greeting">Hi,</span>
              <span className="user-role">{user.split(" ")[0]}</span>
            </div>
          </ListItem>
        </List>
      )}
      <hr className="hr" />

      {/* Nav Links */}
      <List>
        {[
          ...(role === "driver" || !token
            ? [{ label: "Offer a Ride", path: "/offer-ride", icon: <FaCarSide /> }]
            : []),

          ...(role === "passenger" || !token
            ? [{ label: "Book a Ride", path: "/find-ride", icon: <FaSearchLocation /> }]
            : []),

          { label: "About", path: "/about", icon: <FiInfo /> },
          { label: "Help", path: "/help", icon: <FiHelpCircle /> },
        ].map((item) => (
          <>


            <ListItem key={item.label} disablePadding>
              <ListItemButton
                class="mobile-menu-sidebar"
                onClick={() => {
                  navigate(item.path);
                  setDrawerOpen(false);
                }}
              >
                <p>{item.icon}</p>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
            <hr className="hr" />

          </>

        ))}
      </List>

      {/* Show user options only if logged in */}
      {token && (
        <>
          <Divider />
          <List>
            <ListItem disablePadding>
              <ListItemButton
                class="mobile-menu-sidebar"
                onClick={() => {
                  navigate("/profile");
                  setDrawerOpen(false);
                }}
              >
                <FiUser />
                <ListItemText primary="Profile" />
              </ListItemButton>
            </ListItem>
            <hr className="hr" />

            <ListItem disablePadding>
              <ListItemButton
                class="mobile-menu-sidebar"
                onClick={() => {
                  navigate("/my-rides");
                  setDrawerOpen(false);
                }}
              >
                <FaRoute />
                <ListItemText primary="My Rides" />
              </ListItemButton>
            </ListItem>
            <hr className="hr" />

            {role === "driver" && (
              <ListItem disablePadding>
                <ListItemButton
                  class="mobile-menu-sidebar"
                  onClick={() => {
                    navigate("/vehicle-registration");
                    setDrawerOpen(false);
                  }}
                >
                  <FaCar />
                  <ListItemText primary="Vehicle Registration" />
                </ListItemButton>
              </ListItem>
            )}
            <hr className="hr" />

            <ListItem disablePadding>
              <ListItemButton
                class="mobile-menu-sidebar"
                onClick={() => {
                  navigate("/settings");
                  setDrawerOpen(false);
                }}
              >
                <FiSettings /> <ListItemText primary="Settings" />
              </ListItemButton>
            </ListItem>
            <hr className="hr" />

            <ListItem disablePadding>
              <ListItemButton
                class="mobile-menu-sidebar logout"
                onClick={handleLogout}
                sx={{ color: "error.main" }}
              >
                <FiLogOut />
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </List>
        </>
      )}

      {/* Show login/signup if not logged in */}
      {!token && (
        <>
          <Divider />
          <List>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  navigate("/login");
                  setDrawerOpen(false);
                }}
              >
                <ListItemText primary="Log in" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  navigate("/signup");
                  setDrawerOpen(false);
                }}
              >
                <ListItemText primary="Sign up" />
              </ListItemButton>
            </ListItem>
          </List>
        </>
      )}
    </Box>
  );

  return (
    <header>
      {/* LOGO */}
      <Link className="header-logo" to="/">
        <div className="header-logo-icon">
          <img src={logoImg} alt="" loading="eager" />
        </div>
        Carpooling
      </Link>

      {/* HAMBURGER ICON — opens Drawer from right */}
      <nav className="menu-icon">
        <p onClick={toggleDrawer(true)} style={{ cursor: "pointer" }}>
          <HiOutlineMenu />
        </p>
      </nav>

      {/* MUI Drawer — slides from right */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>

      {/* DESKTOP NAV — unchanged */}
      <nav className="home-menus">
        {(role === "driver" || !token) && (
          <div>
            <Link to="/offer-ride">Offer a Ride</Link>
          </div>
        )}
        {(role === "passenger" || !token) && (
          <div>
            <Link to="/find-ride">Book a Ride</Link>
          </div>
        )}

        <div>
          <Link to="/about">About</Link>
        </div>
        <div>
          <Link to="/help">Help</Link>
        </div>
      </nav>

      {/* AUTH SECTION — unchanged */}
      <div className="auth-buttons">
        {!token ? (
          <>
            <div>
              <Link className="header-login-btn" to="/login">
                Log in
              </Link>
            </div>

            <div>
              <Link className="header-signup-btn" to="/signup">
                Sign up
              </Link>
            </div>
          </>
        ) : (
          <div>
            {user && (
              <Button onClick={handleClick} className="user-btn-logined">
                <div className="user-profile-box">
                  <div className="user-profile-text">
                    <span className="user-greeting">Hi,</span>
                    <span className="user-role">{user.split(" ")[0]}</span>
                  </div>
                  <FaUserCircle size={42} />
                </div>
              </Button>
            )}

            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <MenuItem
                className="drawer-menus"
                onClick={() => {
                  navigate("/profile");
                  handleClose();
                }}
              >
                <FiUser /> Profile
              </MenuItem>
              <hr className="hr" />
              <MenuItem
                className="drawer-menus"
                onClick={() => {
                  navigate("/my-rides");
                  handleClose();
                }}
              >
                <FaRoute /> My Rides
              </MenuItem>
              <hr className="hr" />
              {role === "driver" && (
                <div>
                  <MenuItem
                    className="drawer-menus"
                    onClick={() => {
                      navigate("/vehicle-registration");
                      handleClose();
                    }}
                  >
                    <FaCarSide />
                    Vehicle Registration
                  </MenuItem>
                  <hr className="hr" />
                  <MenuItem
                    className="drawer-menus"
                    onClick={() => {
                      navigate("/vehicle-registration");
                      handleClose();
                    }}
                  >
                    <FaCar />
                    Vehicle Details
                  </MenuItem>
                </div>
              )}
              <hr className="hr" />
              <MenuItem
                className="drawer-menus"
                onClick={() => {
                  navigate("/settings");
                  handleClose();
                }}
              >
                <FiSettings /> Settings
              </MenuItem>
              <hr className="hr" />
              <MenuItem onClick={handleLogout} className="logout">
                <FiLogOut /> <p>Logout</p>
              </MenuItem>
            </Menu>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
