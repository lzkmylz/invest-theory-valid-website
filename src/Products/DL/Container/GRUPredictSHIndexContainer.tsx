import React from 'react';
import { observer } from 'mobx-react';
import { Row } from 'antd';
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
  }

  render() {
    return (
      <div className="grupredict-sh-index" >
        <Header history={this.props.history} />
        <div className="grupredict-sh-main" >
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
