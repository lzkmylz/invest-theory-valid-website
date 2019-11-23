import React from 'react';
import { observer } from 'mobx-react';
import { Breadcrumb } from 'antd';
import Header from '../../../Index/Component/IndexHeader';
import Footer from '../../../Index/Component/IndexFooter';
import { HistoryInterface } from '../../../Utils/Interfaces';
import '../Style/SimilarityComputeContainer.scss';

@observer
class SimilarityComputeContainer extends React.Component<HistoryInterface> {

  render() {
    return (
      <div className="similarity-compute-container" >
        <Header history={this.props.history} />
        <div className="similarity-compute-main" >
          <div className="similarity-compute-navbar" >
            <Breadcrumb>
              <Breadcrumb.Item>
                <a href="/">Home</a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <a href="/products">Products</a>
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className="similarity-compute-title" >
            <h1>
              Stock Similarity Compute
            </h1>
          </div>
          
        </div>
        <Footer />
      </div>
    )
  }
}

export default SimilarityComputeContainer;
