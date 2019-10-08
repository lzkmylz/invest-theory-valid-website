import * as React from 'react';
import '../Style/IndexContainer.scss';
import Header from '../Component/IndexHeader';
import TitleContent from '../Component/TitleContent';

class IndexContainer extends React.Component {
  render() {
    return (
      <div className="index-container background-dark">
        <Header />
        <TitleContent />
      </div>
    );
  }
}

export default IndexContainer;
