import React from 'react';
import { observer } from 'mobx-react';
import Header from '../../../Index/Component/IndexHeader';
import Footer from '../../../Index/Component/IndexFooter';
import '../Style/DashboardContainer.scss';

interface Iprops {
  history: {
    push(url: String): Function
  }
}

@observer
class DashboardContainer extends React.Component<Iprops> {
  render() {
    return (
      <div className="product-dashboard-container" >
        <Header history={this.props.history} />
        <div className="product-dashboard-main" >

        </div>
        <Footer />
      </div>
    )
  }
}

export default DashboardContainer;
