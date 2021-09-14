"use strict-mode";
import React from "react";
import SidePanel from "./components/SidePanel";
import Login from "./screens/Login";
import Dashboard from "@material-ui/icons/Dashboard";
import Header from "./components/Header";
import FoodProducts from "./screens/FoodProducts";
import Orders from "./screens/Orders";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import { Backdrop, makeStyles, CircularProgress } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { userLogout, userSession } from "./redux/loginSlice";
import { auth } from "./authentication/firebase";
import "./App.css";

const useStyle = makeStyles((theme) => ({
  screenContainer: {
    display: "flex",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const Layout = (props) => {
  const { currentLink, mobileOpen, handleDrawerToggle, component } = props;
  return (
    <>
      <Header
        handleDrawerToggle={handleDrawerToggle}
        currentLink={currentLink}
      />
      <SidePanel
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        currentLink={currentLink}
      />
      {component}
    </>
  );
};

const PrivateRoute = (props) => {
  const { component: Component, currentLink, ...rest } = props;

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const { loginStatus } = useSelector((state) => state.login);

  const history = useHistory();

  const classes = useStyle();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  React.useEffect(() => {
    history.push(props.path);
  }, [props.path, history]);

  return (
    <div className={classes.screenContainer}>
      <Route
        {...rest}
        render={() =>
          loginStatus === "success" || loginStatus === "loggedIn" ? (
            <Layout
              currentLink={currentLink}
              mobileOpen={mobileOpen}
              handleDrawerToggle={handleDrawerToggle}
              component={<Component />}
            />
          ) : (
            <Redirect to={"/"} />
          )
        }
      />
    </div>
  );
};

function App() {
  const classes = useStyle();

  const { user, loginStatus } = useSelector((state) => state.login);
  const dispatch = useDispatch();

  React.useEffect(() => {
    //console.log(user,loginStatus);
    if (!user && loginStatus !== "loading") {
      auth.onAuthStateChanged((isUser) => {
        if (isUser) {
          dispatch(userSession({ user: isUser, status: "loggedIn" }));
        } else {
          dispatch(userLogout());
        }
      });
    }
  });
  return (
    <div className="App">
      <React.StrictMode>
        <Backdrop className={classes.backdrop} open={loginStatus === "loading"}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <Router>
          <Switch>
            <Route component={Login} path="/" exact />
            <PrivateRoute
              component={Dashboard}
              currentLink={"Dashboard"}
              path={"/dashboard"}
              exact
            />
            <PrivateRoute
              component={FoodProducts}
              currentLink={"Food Products"}
              path={"/foodProducts"}
              exact
            />
            <PrivateRoute
              component={Orders}
              currentLink={"Orders"}
              path={"/orders"}
              exact
            />
          </Switch>
        </Router>
      </React.StrictMode>
    </div>
  );
}

export default App;
