import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { observer } from 'mobx-react';
import GRUPredictAContainer from './Container/GRUPredictAContainer';
import GRUPredictSHIndexContainer from './Container/GRUPredictSHIndexContainer';

@observer
class Index extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/products/GRUPredictA" component={GRUPredictAContainer} />
        <Route path="/products/GRUPredictSHIndex" component={GRUPredictSHIndexContainer} />
      </Switch>
    );
  }
}

export default Index;
