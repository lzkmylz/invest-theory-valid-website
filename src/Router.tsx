import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Index from './Index/Index';
import DashboardIndex from './Dashboard/Index';

class Router extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Index} exact={true} />
          <Route path="/login" component={Index} />
          <Route path="/register" component={Index} />
          <Route path="/signup-confirm" component={Index} />
          <Route path="/reset-password" component={Index} />
          <Route path="/forget-password" component={Index} />
          <Route path="/reset-success" component={Index} />
          <Route path="/dashboard" component={DashboardIndex} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Router;