import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Index from './Index/Index';
import DashboardIndex from './Dashboard/Index';
import Products from './Products/Index';

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
          <Route path="/donate" component={Index} />
          <Route path="/dashboard" component={DashboardIndex} />
          <Route path="/products" component={Products} />
          <Route path="/products/similarityCompute" component={Products} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Router;