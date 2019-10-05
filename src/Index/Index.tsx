import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import IndexContainer from './Container/IndexContainer';

class Index extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/" component={IndexContainer} />
      </Switch>
    );
  }
}

export default Index;
