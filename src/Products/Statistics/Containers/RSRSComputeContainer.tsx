import React from 'react';
import { observer } from 'mobx-react';
import { Breadcrumb, Card } from 'antd';
import ReactMarkdown from 'react-markdown';
import Header from '../../../Index/Component/IndexHeader';
import Footer from '../../../Index/Component/IndexFooter';
import { HistoryInterface } from '../../../Utils/Interfaces';
import RSRSComputeForm from '../Component/RSRSComputeForm';

import '../Style/RSRSComputeContainer.scss';
import StatisticsStore from '../Stores/StatisticsStore';

@observer
class RSRSComputeContainer extends React.Component<HistoryInterface> {
  state = {
    instructionText: ''
  }

  componentDidMount = () => {
    const instructionReadPath = require('../MdTexts/RSRSComputeMD.md');
    fetch(instructionReadPath)
    .then(res => res.text())
    .then(text => this.setState({ instructionText: text }));
  }

  render() {
    const { instructionText } = this.state;

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
          <div className="rsrs-instruction" >
            <Card
              title="Instruction"
            >
              <ReactMarkdown
                escapeHtml={false}
                source={instructionText}
              />
            </Card>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default RSRSComputeContainer;
