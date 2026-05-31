import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoImg from "../assets/Images/logo-Img.png";

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { useAuth } from "../context/AuthContext";
import { FaUserCircle, FaRoute, FaCarSide, FaCar, FaSearchLocation } from "react-icons/fa";
import { FiUser, FiSettings, FiLogOut, FiInfo, FiHelpCircle } from "react-icons/fi";
import { CgMenuRightAlt } from "react-icons/cg";

const getNavLinks = (role, isLoggedIn) => [
  ...(role === "driver" || !isLoggedIn
    ? [{ label: "Offer a Ride", path: "/offer-ride", icon: <FaCarSide /> }]
    : []),
  ...(role === "passenger" || !isLoggedIn
    ? [{ label: "Book a Ride", path: "/find-ride", icon: <FaSearchLocation /> }]
    : []),
  { label: "About", path: "/about", icon: <FiInfo /> },
  { label: "Help", path: "/help", icon: <FiHelpCircle /> },
];

const getAccountLinks = (role) => [
  { label: "Profile", path: "/profile", icon: <FiUser /> },
  { label: "My Rides", path: "/my-rides", icon: <FaRoute /> },
  ...(role === "driver"
    ? [
      { label: "Vehicle Registration", path: "/vehicle-registration", icon: <FaCarSide /> },
      { label: "Vehicle Details", path: "/vehicle-details", icon: <FaCar /> },
    ]
    : []),
  { label: "Settings", path: "/settings", icon: <FiSettings /> },
];

const Header = () => {
  const navigate = useNavigate();
 const { user, setUser } = useAuth();

console.log("Auth User:", user);
console.log("Is Logged In:", !!user);
  const isLoggedIn = !!user;
  const role = user?.role;
  const firstName = user?.name?.split(" ")[0]; // ✅ safe chaining

  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const menuOpen = Boolean(anchorEl);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null); // ✅ reset context so UI updates immediately
    setAnchorEl(null);
    setDrawerOpen(false);
    navigate("/login");
  };

  const navTo = (path) => {
    navigate(path);
    setAnchorEl(null);
    setDrawerOpen(false);
  };

  const navLinks = getNavLinks(role, isLoggedIn);       // ✅ use role from context
  const accountLinks = getAccountLinks(role);

  const DrawerContent = (
    <Box sx={{ width: 260 }} role="presentation">
      {isLoggedIn && (
        <>
          <List>
            <ListItem>
              <div className="user-profile-text">
                <span className="user-greeting">Hi,</span>
                <span className="user-role">{firstName}</span>
              </div>
            </ListItem>
          </List>
          <Divider />
        </>
      )}

      <List>
        {navLinks.map((item) => (
          <div key={item.label}>
            <ListItem disablePadding>
              <ListItemButton className="mobile-menu-sidebar" onClick={() => navTo(item.path)}>
                {item.icon}
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>

      {isLoggedIn ? (
        <List>
          {accountLinks.map((item) => (
            <div key={item.label}>
              <ListItem disablePadding>
                <ListItemButton className="mobile-menu-sidebar" onClick={() => navTo(item.path)}>
                  {item.icon}
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
              <Divider />
            </div>
          ))}
          <ListItem disablePadding>
            <ListItemButton className="mobile-menu-sidebar logout" onClick={handleLogout} sx={{ color: "error.main" }}>
              <FiLogOut />
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      ) : (
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navTo("/login")}>
              <ListItemText primary="Log in" />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton onClick={() => navTo("/signup")}>
              <ListItemText primary="Sign up" />
            </ListItemButton>
          </ListItem>
        </List>
      )}
    </Box>
  );

  return (
    <header>
      <Link className="header-logo" to="/">
        <div className="header-logo-icon">
          <img src={logoImg} alt="Carpooling logo" loading="eager" />
        </div>
        Carpooling
      </Link>

      <nav className="menu-icon">
        <CgMenuRightAlt onClick={() => setDrawerOpen(true)} style={{ cursor: "pointer" }} />
      </nav>

      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        {DrawerContent}
      </Drawer>

      <nav className="home-menus">
        {navLinks.map((item) => (
          <Link key={item.label} to={item.path}>{item.label}</Link>
        ))}
      </nav>

      <div className="auth-buttons">
        {!isLoggedIn ? (
          <>
            <Link className="header-login-btn" to="/login">Log in</Link>
            <Link className="header-signup-btn" to="/signup">Sign up</Link>
          </>
        ) : (
          <>
            <Button onClick={(e) => setAnchorEl(e.currentTarget)} className="user-btn-logined">
              <div className="user-profile-box">
                <div className="user-profile-text">
                  <span className="user-greeting">Hi,</span>
                  <span className="user-role">{firstName}</span>
                </div>
                <FaUserCircle size={42} />
              </div>
            </Button>

            <Menu
              anchorEl={anchorEl}
              open={menuOpen}
              onClose={() => setAnchorEl(null)}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              {accountLinks.map((item) => (
                <div key={item.label}>
                  <MenuItem className="drawer-menus" onClick={() => navTo(item.path)}>
                    {item.icon} {item.label}
                  </MenuItem>
                  <Divider />
                </div>
              ))}
              <MenuItem className="drawer-menus logout" onClick={handleLogout}>
                <FiLogOut /> Logout
              </MenuItem>
            </Menu>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;