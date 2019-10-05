import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Index from './Index/Index';

class Router extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Index} exact={true} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Router;