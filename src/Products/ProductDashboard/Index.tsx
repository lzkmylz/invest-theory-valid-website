import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { observer } from 'mobx-react';
import Dashboard from './Containers/DashboardContainer';

@observer
class Index extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/products" component={Dashboard} exact={true} />
      </Switch>
    );
  }
}

export default Index;
