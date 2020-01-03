import React from 'react';
import { observer } from 'mobx-react';
import { Breadcrumb } from 'antd';
import Header from '../../../Index/Component/IndexHeader';
import Footer from '../../../Index/Component/IndexFooter';
import { HistoryInterface } from '../../../Utils/Interfaces';

import '../Style/RSRSComputeContainer.scss';

@observer
class RSRSComputeContainer extends React.Component<HistoryInterface> {
  render() {
    return (
      <div className="rsrs-container" >
        <Header history={this.props.history} />
        <div className="rsrs-main" >
          <div className="rsrs-navbar" >
            <Breadcrumb className="rsrs-breadcrumb" >
              <Breadcrumb.Item>
                <a href="/">Home</a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <a href="/products">Products</a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>RSRS Compute</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className="rsrs-title" >
            <h1>
              RSRS Compute
            </h1>
          </div>
          
        </div>
        <Footer />
      </div>
    );
  }
}

export default RSRSComputeContainer;
