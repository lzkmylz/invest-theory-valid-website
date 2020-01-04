import React from 'react';
import { observer } from 'mobx-react';
import { Row, Breadcrumb } from 'antd';
import { HistoryInterface } from '../../../Utils/Interfaces';
import Header from '../../../Index/Component/IndexHeader';
import Footer from '../../../Index/Component/IndexFooter';
import '../Styles/GRUPredictSHIndexContainer.scss';
import DLStore from '../Stores/DLStore';
import SHIndexChart from '../Components/SHIndexChart';

@observer
class GRUPredictSHIndexContainer extends React.Component<HistoryInterface> {
  componentDidMount() {
    DLStore.getIndexData();
    DLStore.getPredictIndexData();
  }

  render() {
    return (
      <div className="grupredict-sh-index" >
        <Header history={this.props.history} />
        <div className="grupredict-sh-main" >
          <Row>
            <Breadcrumb className="grupredict-sh-breadcrumb" >
              <Breadcrumb.Item>
                <a href="/">Home</a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <a href="/products">Products</a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>Predict China SH Index</Breadcrumb.Item>
            </Breadcrumb>
          </Row>
          <Row className="grupredict-sh-title" >
            <h1>Predict China SH Index with GRU</h1>
          </Row>
          <Row>
            <SHIndexChart />
          </Row>
        </div>
        <Footer />
      </div>
    );
  }
}

export default GRUPredictSHIndexContainer;
