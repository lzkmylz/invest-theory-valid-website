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
    const similarityText = (
      <p style={{ paddingLeft: 24 }}>
        Compute the similarity of two stocks. If two stocks have high similarity, they can
        be consider as a pair and use statistical arbitrage methods. <a href="/products/similarityCompute" >Details</a>
      </p>
    );
    const GRUPredictAH = (
      <p style={{ paddingLeft: 24 }} >
        Predict the price of stock in China A stock market based on its previous prices
        in A and HongKong H stock market.
        <a href="/products/GRUPredictAH" >Details</a>
      </p>
    )
    const data = [{
      title: 'Statistics Based Products',
      cover: "./statistics.jpg",
      coverAlt: "statistics-logo",
      panelHeader: ["Stock Similarity Compute"],
      panelText: [similarityText]
    }, {
      title: 'Deep Learning Based Products',
      cover: "./DL-logo.jpg",
      coverAlt: "DL-logo",
      panelHeader: ["A+H stock price predict based on GRU"],
      panelText: [GRUPredictAH]
    }];
    
    return (
      <div className="product-dashboard-container" >
        <Header history={this.props.history} />
        <div className="product-dashboard-main" >
          <div className="product-container" >
            <List
              grid={{ gutter: 16, column: 2 }}
              dataSource={data}
              renderItem={(item: any, ind) => (
                <List.Item>
                  <Card
                    className="product-card"
                    title={item.title}
                    cover={<img src={item.cover} alt={item.coverAlt} />}
                  >
                    <Collapse bordered={false}>
                      {
                        item.panelHeader.map((obj: any, index: number) => (
                          <Panel header={obj} key={index}>
                            {item.panelText[index]}
                          </Panel>
                        ))
                      }
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
