import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import IndexContainer from './Container/IndexContainer';
import LoginContainer from './Container/LoginContainer';

class Index extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/" component={IndexContainer} exact={true} />
        <Route path="/login" component={LoginContainer} />
      </Switch>
    );
  }
}

export default Index;
