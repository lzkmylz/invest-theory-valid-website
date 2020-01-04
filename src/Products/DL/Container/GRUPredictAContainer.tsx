import React from 'react';
import { observer } from 'mobx-react';
import { HistoryInterface } from '../../../Utils/Interfaces';
import {
  Row,
  Select,
  Card,
  Breadcrumb
} from 'antd';
import ReactMarkdown from 'react-markdown';
import Header from '../../../Index/Component/IndexHeader';
import Footer from '../../../Index/Component/IndexFooter';
import DLStore from '../Stores/DLStore';
import StockChart from '../Components/StockChart';
import "../Styles/GRUPredictAContainer.scss";

@observer
class GRUPredictAContainer extends React.Component<HistoryInterface> {
  state = {
    instructionText: ''
  }

  onSelectChange = (value: any) => {
    DLStore.getStockData(value);
    DLStore.getGRUPredictData(value);
  }

  componentDidMount = () => {
    DLStore.getStockData("601939.SH");
    DLStore.getGRUPredictData("601939.SH");
    const instructionReadPath = require('../MdTexts/GRUPredictA.md');
    fetch(instructionReadPath)
    .then(res => res.text())
    .then(text => this.setState({ instructionText: text }));
  }

  render() {
    const { instructionText } = this.state;
    const { Option } = Select;

    return (
      <div className="grupredict-a-container" >
        <Header history={this.props.history} />
        <div className="grupredict-a-main" >
          <Row>
            <Breadcrumb className="grupredict-a-breadcrumb" >
              <Breadcrumb.Item>
                <a href="/">Home</a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <a href="/products">Products</a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>Predict China A Stock</Breadcrumb.Item>
            </Breadcrumb>
          </Row>
          <Row className="grupredict-a-title-container" >
            <h1>Predict China A Stock with GRU</h1>
          </Row>
          <Row className="grupredict-a-select" >
            <span className="grupredict-a-selectname" >Select Stock:</span>
            <Select defaultValue="601939.SH" style={{ width: 120 }} onChange={this.onSelectChange} >
              <Option value="601939.SH" >601939.SH</Option>
              <Option value="600276.SH" >600276.SH</Option>
              <Option value="600340.SH" >600340.SH</Option>
              <Option value="000415.SZ" >000415.SZ</Option>
            </Select>
          </Row>
          <Row className="grupredict-chart-row" >
            <StockChart />
          </Row>
          <Row className="grupredict-instruction-row" >
            <Card
              title="Instruction"
              className="grupredict-instruction-card"
            >
              <ReactMarkdown
                escapeHtml={false}
                source={instructionText}
              />
            </Card>
          </Row>
        </div>
        <Footer />
      </div>
    );
  }
}

export default GRUPredictAContainer;
