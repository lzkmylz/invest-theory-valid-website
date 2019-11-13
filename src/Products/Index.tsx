import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { observer } from 'mobx-react';
import UserStore from '../Index/Store/UserStore';
import ProductDashboard from './ProductDashboard/Index';

@observer
class Index extends React.Component {
  render() {
    UserStore.initUserFromLocalStorage();
    return (
      <Switch>
        <Route path="/products" component={ProductDashboard} exact={true} />
      </Switch>
    );
  }
}

export default Index;
