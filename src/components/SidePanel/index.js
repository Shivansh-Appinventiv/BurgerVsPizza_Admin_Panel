import {
  Divider,
  Drawer,
  Hidden,
  List,
  ListItem,
  Typography,
  useTheme,
  ListItemText,
  ListItemIcon,
} from "@material-ui/core";
import React from "react";
import DashboardIcon from "@material-ui/icons/Dashboard";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import ViewListIcon from "@material-ui/icons/ViewList";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useHistory } from "react-router-dom";
import { auth } from "../../authentication/firebase";
import { useDispatch } from "react-redux";
import { userLogout } from "../../redux/loginSlice";

const sidePanelList = [
  { title: "Dashboard", icon: <DashboardIcon />, href: "/dashboard" },
  { title: "Food Products", icon: <FastfoodIcon />, href: "/foodProducts" },
  { title: "Orders", icon: <ViewListIcon />, href: "/orders" },
];

export default function SidePanel(props) {
  const { window, mobileOpen, handleDrawerToggle, currentLink } = props;
  const theme = useTheme();
  const history = useHistory();
  const dispatch = useDispatch();

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const handleLink = (href) => {
    history.push(href);
    //dispatch(setLink(href));
  };

  const handleLogOut = () => {
    auth.signOut();
    dispatch(userLogout());
  };

  const drawer = (
    <div
      style={{
        width: "300px",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <div>
        <img
          src={`https://st3.depositphotos.com/1007566/12989/v/950/depositphotos_129895116-stock-illustration-hacker-character-avatar-icon.jpg`}
          alt={`avatarAdmin`}
          height={150}
          width={150}
          title={"admin"}
        />
        <Typography variant={"h4"} component={"h2"}>
          {"Admin Panel"}
        </Typography>
      </div>
      <Divider />
      <div>
        <List>
          {sidePanelList.map((item, index) => (
            <ListItem
              button
              key={item.title}
              style={{
                border: "1px solid grey",
                margin: "2px 0",
                background: currentLink === item.title ? "grey" : "inherit",
                color: currentLink === item.title ? "white" : "inherit",
              }}
              onClick={() => handleLink(item.href)}
            >
              <ListItemIcon
                style={{
                  color: currentLink === item.title ? "white" : "inherit",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItem>
          ))}
        </List>
      </div>
      <div>
        <List>
          <ListItem button onClick={() => handleLogOut()}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary={"Logout"} />
          </ListItem>
        </List>
      </div>
    </div>
  );

  return (
    <nav>
      <Hidden smUp implementation={"css"}>
        <Drawer
          container={container}
          variant={"temporary"}
          anchor={theme.direction === "rtl" ? "right" : "left"}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden smDown implementation={"css"}>
        <Drawer open variant={"permanent"}>
          {drawer}
        </Drawer>
      </Hidden>
    </nav>
  );
}
