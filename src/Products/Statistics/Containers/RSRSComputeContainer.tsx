import React from 'react';
import { observer } from 'mobx-react';
import { Breadcrumb } from 'antd';
import Header from '../../../Index/Component/IndexHeader';
import Footer from '../../../Index/Component/IndexFooter';
import { HistoryInterface } from '../../../Utils/Interfaces';
import RSRSComputeForm from '../Component/RSRSComputeForm';

import '../Style/RSRSComputeContainer.scss';
import StatisticsStore from '../Stores/StatisticsStore';

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
          <RSRSComputeForm history={this.props.history} />
          <div className="rsrs-result" >
            {
              StatisticsStore.rsrsScore ?
              <h2>RSRS Compute Result: {StatisticsStore.rsrsScore}</h2> :
              ''
            }
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default RSRSComputeContainer;
