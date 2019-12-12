import React from 'react';
import { observer } from 'mobx-react';
import { List, Card, Collapse } from 'antd';
import Header from '../../../Index/Component/IndexHeader';
import Footer from '../../../Index/Component/IndexFooter';
import { HistoryInterface } from '../../../Utils/Interfaces';
import '../Style/DashboardContainer.scss';

@observer
class DashboardContainer extends React.Component<HistoryInterface> {
  render() {
    const { Panel } = Collapse;
    const data = [{
      title: 'Statistics Based Products'
    }];
    const similarityText = (
      <p style={{ paddingLeft: 24 }}>
        Compute the similarity of two stocks. If two stocks have high similarity, they can
        be consider as a pair and use statistical arbitrage methods. <a href="/products/similarityCompute" >Details</a>
      </p>
    );
    return (
      <div className="product-dashboard-container" >
        <Header history={this.props.history} />
        <div className="product-dashboard-main" >
          <div className="product-container" >
            <List
              grid={{ gutter: 16, column: 2 }}
              dataSource={data}
              renderItem={(item: any) => (
                <List.Item>
                  <Card
                    className="product-card"
                    title={item.title}
                    cover={<img src="./statistics.jpg" alt="statistics-logo" />}
                  >
                    <Collapse bordered={false} defaultActiveKey={['1']}>
                      <Panel header="Stock Similarity Compute" key="1">
                        {similarityText}
                      </Panel>
                    </Collapse>
                  </Card>
                </List.Item>
              )}
            />
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default DashboardContainer;
