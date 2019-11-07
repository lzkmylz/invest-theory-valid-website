import React from 'react';
import { Layout, Menu } from 'antd';
import Header from '../../Index/Component/IndexHeader';
import Footer from '../../Index/Component/IndexFooter';
import '../Style/DashboardContainer.scss';

interface Iprops {
  history: {
    push(url: String): Function
  }
}

const { Sider, Content } = Layout;

class DashboardContainer extends React.Component<Iprops> {
  render() {
    return(
      <div className="dashboard-container" >
        <Header history={this.props.history} />
        <div className="dashboard-main" >
          <Layout className="dashboard-layout" >
            <Sider width={200} theme="dark" >
              <Menu
                mode="inline"
                defaultSelectedKeys={['profile']}
                style={{ height: '100%' }}
              >
                <Menu.Item key="profile" >
                  Profile
                </Menu.Item>
                <Menu.Item key="analytics" >
                  Analytics
                </Menu.Item>
              </Menu>
            </Sider>
            <Content>
              Content
            </Content>
          </Layout>
        </div>
        <Footer />
      </div>
    );
  }
}

export default DashboardContainer;
