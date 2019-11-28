import React from 'react';
import { observer } from 'mobx-react';
import { Breadcrumb, Card } from 'antd';
import ReactMarkdown from 'react-markdown';
import Header from '../../../Index/Component/IndexHeader';
import Footer from '../../../Index/Component/IndexFooter';
import { HistoryInterface } from '../../../Utils/Interfaces';
import SimilarityComputeForm from '../Component/SimilarityComputeForm';
import StatisticsStore from '../Stores/StatisticsStore';
import '../Style/SimilarityComputeContainer.scss';

@observer
class SimilarityComputeContainer extends React.Component<HistoryInterface> {
  state = {
    instructionText: ''
  }

  componentDidMount = () => {
    const instructionReadPath = require('../MdTexts/SimilarityComputeMD.md');
    fetch(instructionReadPath)
    .then(res => res.text())
    .then(text => this.setState({ instructionText: text }));
  }

  render() {
    const { instructionText } = this.state;

    return (
      <div className="similarity-compute-container" >
        <Header history={this.props.history} />
        <div className="similarity-compute-main" >
          <div className="similarity-compute-navbar" >
            <Breadcrumb className="similarity-compute-breadcrumb" >
              <Breadcrumb.Item>
                <a href="/">Home</a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <a href="/products">Products</a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>Similarity Compute</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className="similarity-compute-title" >
            <h1>
              Stock Similarity Compute
            </h1>
          </div>
          <div className="similarity-compute-form-container" >
            <SimilarityComputeForm history={this.props.history} />
          </div>
          <div className="similarity-compute-result-container" >
            <div className="similarity-compute-board" >
              <h1>Score: {StatisticsStore.similarityScore}</h1>
            </div>
          </div>
          <div className="similarity-compute-instruction" >
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
    )
  }
}

export default SimilarityComputeContainer;
