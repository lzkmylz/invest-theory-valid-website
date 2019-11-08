import React from 'react';
import Header from '../Component/IndexHeader';
import Footer from '../Component/IndexFooter';
import '../Style/DonateContainer.scss';

interface Iprops {
  history: {
    push(url: String): Function
  }
}

class DonateContainer extends React.Component<Iprops> {
  render() {
    return (
      <div className="donate-container" >
        <Header history={this.props.history} />
        <div className="donate-main" >

        </div>
        <Footer />
      </div>
    );
  }
}

export default DonateContainer;
