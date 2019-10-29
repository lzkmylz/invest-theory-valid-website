import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import IndexContainer from './Container/IndexContainer';
import LoginContainer from './Container/LoginContainer';
import RegisterContainer from './Container/RegisterContainer';
import SignupConfirmContainer from './Container/SignupConfirmContainer';

class Index extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/" component={IndexContainer} exact={true} />
        <Route path="/login" component={LoginContainer} />
        <Route path="/register" component={RegisterContainer} />
        <Route path="/signup-confirm" component={SignupConfirmContainer} />
      </Switch>
    );
  }
}

export default Index;
