import * as React from 'react';
import '../Style/IndexContainer.scss';
import Header from '../Component/IndexHeader';

class IndexContainer extends React.Component {
  render() {
    return (
      <div className="index-container background-dark">
        <Header />
      </div>
    );
  }
}

export default IndexContainer;
