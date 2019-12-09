import React from 'react';
import Header from '../Component/IndexHeader';
import Footer from '../Component/IndexFooter';
import { HistoryInterface } from '../../Utils/Interfaces';

class SupportContainer extends React.Component<HistoryInterface> {

  render() {
    return (
      <div className="support-container" >
        <Header history={this.props.history} />
        This is support container
        <Footer />
      </div>
    )
  }
}

export default SupportContainer;
