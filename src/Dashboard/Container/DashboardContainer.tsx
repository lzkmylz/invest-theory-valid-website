import React from 'react';
import Header from '../../Index/Component/IndexHeader';
import Footer from '../../Index/Component/IndexFooter';
import '../Style/DashboardContainer.scss';

interface Iprops {
  history: {
    push(url: String): Function
  }
}

class DashboardContainer extends React.Component<Iprops> {
  render() {
    return(
      <div className="dashboard-container" >
        <Header history={this.props.history} />
        <div className="dashboard-main" >

        </div>
        <Footer />
      </div>
    );
  }
}

export default DashboardContainer;
