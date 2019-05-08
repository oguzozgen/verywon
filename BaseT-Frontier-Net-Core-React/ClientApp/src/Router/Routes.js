import React from "react";
import { Switch, Route } from "react-router-dom";
import { withOidcSecure } from "@axa-fr/react-oidc-context";
import Home from "../pages/Home/Home";
import Dashboard from "../pages/Dashboard/Dashboard";
import Admin from "../pages/Admin/Admin";
import Profile from "../pages/Profile/Profile";
import Visualization from "../pages/Visualization/Visualization";

const Routes = () => (
  <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/Visualization" component={Visualization}/>
    <Route path="/dashboard" component={withOidcSecure(Dashboard)} />
    <Route path="/admin" component={Admin} />
  </Switch>
);

export default Routes;