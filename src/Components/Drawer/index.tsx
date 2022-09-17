import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { List, ListItem, ListItemText, Drawer } from "@material-ui/core";
import { Logo, useStyles } from "./styles";

const AppDrawer: React.FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState(localStorage.getItem("token"));
  const [refreshToken, setRefreshToken] = useState(
    localStorage.getItem("refresh")
  );

  useEffect(() => {
    if (!refreshToken && !accessToken) {
      localStorage.clear();
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, refreshToken]);

  const handleLogout = () => {
    setAccessToken("");
    setRefreshToken("");
  };

  const handleGoToOrders = () => {
    navigate("/orders");
  };

  const handleGoToDashboard = () => {
    navigate("/");
  };

  return (
    <Drawer className={classes.drawer} variant="permanent" anchor="left">
      <Logo alt={"logo"} src={process.env.PUBLIC_URL + "./logo.svg"} />

      <List>
        <ListItem button>
          <ListItemText onClick={handleGoToDashboard} primary={"Dashboard"} />
        </ListItem>
        <ListItem button>
          <ListItemText onClick={handleGoToOrders} primary={"Orders"} />
        </ListItem>
        <ListItem button>
          <ListItemText onClick={handleLogout} primary={"Logout"} />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default AppDrawer;
