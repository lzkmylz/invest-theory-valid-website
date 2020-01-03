import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { observer } from 'mobx-react';
import UserStore from '../Index/Store/UserStore';
import ProductDashboard from './ProductDashboard/Index';
import Statistics from './Statistics/Index';
import DL from './DL/Index';

@observer
class Index extends React.Component {
  render() {
    UserStore.initUserFromLocalStorage();
    return (
      <Switch>
        <Route path="/products" component={ProductDashboard} exact={true} />
        <Route path="/products/similarityCompute" component={Statistics} />
        <Route path="/products/rsrsCompute" component={Statistics} />
        <Route path="/products/GRUPredictA" component={DL} />
        <Route path="/products/GRUPredictSHIndex" component={DL} />
      </Switch>
    );
  }
}

export default Index;
