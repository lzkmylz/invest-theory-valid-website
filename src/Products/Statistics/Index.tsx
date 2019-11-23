import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { observer } from 'mobx-react';
import SimilarityComputeContainer from './Containers/SimilarityComputeContainer';

@observer
class Index extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/products/similarityCompute" component={SimilarityComputeContainer}  />
      </Switch>
    );
  }
}

export default Index;
