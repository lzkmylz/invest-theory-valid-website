import React from 'react';
import { observer } from 'mobx-react';
import { List, Card, Collapse } from 'antd';
import Header from '../../../Index/Component/IndexHeader';
import Footer from '../../../Index/Component/IndexFooter';
import '../Style/DashboardContainer.scss';

interface Iprops {
  history: {
    push(url: String): Function
  }
}

@observer
class DashboardContainer extends React.Component<Iprops> {
  render() {
    const { Panel } = Collapse;
    const data = [{
      title: 'Statistics Based Products'
    }];
    const text = (
      <p style={{ paddingLeft: 24 }}>
        A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found
        as a welcome guest in many households across the world.
      </p>
    );
    return (
      <div className="product-dashboard-container" >
        <Header history={this.props.history} />
        <div className="product-dashboard-main" >
          <div className="product-container" >
            <List
              grid={{ gutter: 16, column: 3 }}
              dataSource={data}
              renderItem={(item: any) => (
                <List.Item>
                  <Card
                    className="product-card"
                    title={item.title}
                  >
                    <Collapse bordered={false} defaultActiveKey={['1']}>
                      <Panel header="This is panel header 1" key="1">
                        {text}
                      </Panel>
                      <Panel header="This is panel header 2" key="2">
                        {text}
                      </Panel>
                      <Panel header="This is panel header 3" key="3">
                        {text}
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
