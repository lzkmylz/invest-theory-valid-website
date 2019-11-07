import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { observer } from 'mobx-react';
import IndexContainer from './Container/IndexContainer';
import LoginContainer from './Container/LoginContainer';
import RegisterContainer from './Container/RegisterContainer';
import SignupConfirmContainer from './Container/SignupConfirmContainer';
import ResetPasswordContainer from './Container/ResetPasswordContainer';
import ForgetPasswordContainer from './Container/ForgetPasswordContainer';
import ForgetPasswordFeedBack from './Container/ForgetPasswordFeedBack';
import UserStore from './Store/UserStore';

@observer
class Index extends React.Component {
  render() {
    UserStore.initUserFromLocalStorage();
    return (
      <Switch>
        <Route path="/" component={IndexContainer} exact={true} />
        <Route path="/login" component={LoginContainer} />
        <Route path="/register" component={RegisterContainer} />
        <Route path="/signup-confirm" component={SignupConfirmContainer} />
        <Route path="/reset-password" component={ResetPasswordContainer} />
        <Route path="/forget-password" component={ForgetPasswordContainer} />
        <Route path="/reset-success" component={ForgetPasswordFeedBack} />
      </Switch>
    );
  }
}

export default Index;
