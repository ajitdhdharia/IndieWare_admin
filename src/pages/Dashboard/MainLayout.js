import * as React from "react";
import { useState } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import Collapse from "@mui/material/Collapse";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import PeopleIcon from "@mui/icons-material/People";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import CategoryIcon from "@mui/icons-material/Category";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

import "../../styles/main_layout.css";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function MainLayout() {
  const [open, setOpen] = useState(true);
  const [openNestedList, setOpenNestedList] = useState({});
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleClick = (item) => {
    setOpenNestedList((prevOpen) => ({ ...prevOpen, [item]: !prevOpen[item] }));
  };

  const menuItems = [
    ["Dashboard", <SpaceDashboardIcon />, []],
    ["Customers", <PeopleIcon />, []],
    ["Queries", <ContactPageIcon />, []],
    [
      "Catalog",
      <Inventory2Icon />,
      [
        ["Add Product", <AddBusinessIcon />],
        ["Product List", <ReceiptLongIcon />],
        ["Catogeries", <CategoryIcon />],
      ],
    ],
  ];

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
        >
          <Toolbar
            className="admin-appbar"
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Ajit Dhdharia
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer className="admin-drawer" variant="permanent" open={open}>
          <Toolbar
            className="admin-drawer-bar"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <Typography
              component="h1"
              variant="h6"
              className="dashboard-heading"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Admin Dashboard
            </Typography>
            <IconButton className="chevron-icon" onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {menuItems.map((item, index) => (
              <React.Fragment key={index}>
                {item[0].trim().toLowerCase() !== "catalog" ? (
                  <Link
                    className="drawer-link"
                    to={
                      item[0].trim().toLowerCase() === "dashboard"
                        ? "/dashboard"
                        : `/dashboard/${item[0].trim().toLowerCase()}`
                    }
                  >
                    <ListItemButton
                      onClick={() => item[2].length > 0 && handleClick(item[0])}
                    >
                      <ListItemIcon className="icon">{item[1]}</ListItemIcon>
                      <ListItemText className="drawer-text" primary={item[0]} />
                      {item[2].length > 0 &&
                        (openNestedList[item[0]] ? (
                          <ExpandLess />
                        ) : (
                          <ExpandMore />
                        ))}
                    </ListItemButton>
                  </Link>
                ) : (
                  <ListItemButton
                    onClick={() => item[2].length > 0 && handleClick(item[0])}
                  >
                    <ListItemIcon className="icon">{item[1]}</ListItemIcon>
                    <ListItemText primary={item[0]} />
                    {item[2].length > 0 &&
                      (openNestedList[item[0]] ? (
                        <ExpandLess />
                      ) : (
                        <ExpandMore />
                      ))}
                  </ListItemButton>
                )}
                <Collapse
                  in={openNestedList[item[0]]}
                  timeout="auto"
                  unmountOnExit
                >
                  {item[2].map((nestedItem, nestedIndex) => (
                    <Link
                      className="drawer-link"
                      key={nestedIndex}
                      to={`/dashboard/${nestedItem[0]
                        .replace(/ +/g, "")
                        .toLowerCase()
                        .trim()}`}
                    >
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon className="icon">
                          {nestedItem[1]}
                        </ListItemIcon>
                        <ListItemText primary={nestedItem[0]} />
                      </ListItemButton>
                    </Link>
                  ))}
                </Collapse>
              </React.Fragment>
            ))}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          {/* Outlet for other pages */}
          <Outlet />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
