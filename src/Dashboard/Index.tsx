import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { observer } from 'mobx-react';
import DashboardContainer from './Container/DashboardContainer';
import UserStore from '../Index/Store/UserStore';

@observer
class Index extends React.Component {
  render() {
    UserStore.initUserFromLocalStorage();
    return (
      <Switch>
        <Route path="/dashboard" component={DashboardContainer} exact={true} />
      </Switch>
    );
  }
}

export default Index;
