import React from 'react';
import { observer } from 'mobx-react';
import { HistoryInterface } from '../../../Utils/Interfaces';
import {
  Row,
  Select,
} from 'antd';
import Header from '../../../Index/Component/IndexHeader';
import Footer from '../../../Index/Component/IndexFooter';
import DLStore from '../Stores/DLStore';
import "../Styles/GRUPredictAContainer.scss";

@observer
class GRUPredictAContainer extends React.Component<HistoryInterface> {

  componentDidMount = () => {
    DLStore.getIndexData();
  }

  render() {
    const { Option } = Select;

    return (
      <div className="grupredict-a-container" >
        <Header history={this.props.history} />
        <div className="grupredict-a-main" >
          <Row className="grupredict-a-title-container" >
            <h1>Predict China A Stock with GRU</h1>
          </Row>
          <Row className="grupredict-a-select" >
            <span className="grupredict-a-selectname" >Select Stock:</span>
            <Select defaultValue="lucy" style={{ width: 120 }}>
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="disabled" disabled>
                Disabled
              </Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
          </Row>
        </div>
        <Footer />
      </div>
    );
  }
}

export default GRUPredictAContainer;
