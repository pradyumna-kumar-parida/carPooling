import React, { useState } from "react";
import logoImg from "../assets/Images/logo-Img.png";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
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
import { CiLogout } from "react-icons/ci";
import { HiOutlineMenu } from "react-icons/hi";

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
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    localStorage.removeItem("authData");
    handleClose();
    setDrawerOpen(false);
    navigate("/login");
  };

  const headerVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4 },
    },
  };

  const user = JSON.parse(localStorage.getItem("user"))?.name;
  const role = localStorage.getItem("role");

  // Drawer content
  const DrawerList = (
    <Box sx={{ width: 260 }} role="presentation">
      {/* Nav Links */}
      <List>
        {[
          { label: "Offer a Ride", path: "/offer-ride" },
          { label: "Find a Ride", path: "/find-ride" },
          { label: "About", path: "/about" },
          { label: "Help", path: "/help" },
        ].map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              onClick={() => {
                navigate(item.path);
                setDrawerOpen(false);
              }}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* Show user options only if logged in */}
      {token && (
        <>
          <Divider />
          <List>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  navigate("/profile");
                  setDrawerOpen(false);
                }}
              >
                <ListItemText primary="Profile" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  navigate("/my-rides");
                  setDrawerOpen(false);
                }}
              >
                <ListItemText primary="My Rides" />
              </ListItemButton>
            </ListItem>

            {role === "driver" && (
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    navigate("/vechile-details");
                    setDrawerOpen(false);
                  }}
                >
                  <ListItemText primary="Vehicle Details" />
                </ListItemButton>
              </ListItem>
            )}

            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  navigate("/settings");
                  setDrawerOpen(false);
                }}
              >
                <ListItemText primary="Settings" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                onClick={handleLogout}
                sx={{ color: "error.main" }}
              >
                <CiLogout style={{ marginRight: 8, fontSize: 18 }} />
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
    <motion.header variants={headerVariants} initial="hidden" animate="visible">
      {/* LOGO */}
      <Link className="header-logo" to="/">
        <motion.div className="header-logo-icon">
          <img src={logoImg} alt="" loading="eager" />
        </motion.div>
        Carpooling
      </Link>

      {/* HAMBURGER ICON — opens Drawer from right */}
      <motion.nav variants={itemVariants} className="menu-icon">
        <p onClick={toggleDrawer(true)} style={{ cursor: "pointer" }}>
          <HiOutlineMenu />
        </p>
      </motion.nav>

      {/* MUI Drawer — slides from right */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>

      {/* DESKTOP NAV — unchanged */}
      <motion.nav variants={itemVariants} className="home-menus">
        <motion.div whileHover={{ scale: 1.05 }}>
          <Link to="/offer-ride">Offer a Ride</Link>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }}>
          <Link to="/find-ride">Find a Ride</Link>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }}>
          <Link to="/about">About</Link>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }}>
          <Link to="/help">Help</Link>
        </motion.div>
      </motion.nav>

      {/* AUTH SECTION — unchanged */}
      <motion.div className="auth-buttons" variants={itemVariants}>
        {!token ? (
          <>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link className="header-login-btn" to="/login">
                Log in
              </Link>
            </motion.div>

            <motion.div
              whileHover={{
                scale: 1.05,
                boxShadow: "0 6px 20px rgba(30, 64, 175, 0.4)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Link className="header-signup-btn" to="/signup">
                Sign up
              </Link>
            </motion.div>
          </>
        ) : (
          <>
            <Button
              onClick={handleClick}
              title={user}
              className="user-btn-logined"
            >
              <FaUserCircle size={48} />
            </Button>
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
                onClick={() => {
                  navigate("/profile");
                  handleClose();
                }}
              >
                Profile
              </MenuItem>
              <hr className="hr" />
              <MenuItem
                onClick={() => {
                  navigate("/my-rides");
                  handleClose();
                }}
              >
                My Rides
              </MenuItem>
              <hr className="hr" />
              {role === "driver" && (
                <MenuItem
                  onClick={() => {
                    navigate("/vechile-details");
                    handleClose();
                  }}
                >
                  Vechile Details
                </MenuItem>
              )}
              <hr className="hr" />
              <MenuItem
                onClick={() => {
                  navigate("/settings");
                  handleClose();
                }}
              >
                Settings
              </MenuItem>
              <hr className="hr" />
              <MenuItem onClick={handleLogout} className="logout">
                <CiLogout /> <p>Logout</p>
              </MenuItem>
            </Menu>
          </>
        )}
      </motion.div>
    </motion.header>
  );
};

export default Header;
