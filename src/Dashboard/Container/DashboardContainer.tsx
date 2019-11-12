import React from 'react';
import { Avatar, Button, Modal } from 'antd';
import { observer } from 'mobx-react';
import Header from '../../Index/Component/IndexHeader';
import Footer from '../../Index/Component/IndexFooter';
import UserStore from '../../Index/Store/UserStore';
import '../Style/DashboardContainer.scss';

interface Iprops {
  history: {
    push(url: String): Function
  }
}

@observer
class DashboardContainer extends React.Component<Iprops> {
  state = {
    ModalText: 'Content of the modal',
    visible: false,
    confirmLoading: false,
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({
      ModalText: 'The modal will be closed after two seconds',
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 2000);
  };

  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  };

  render() {
    const { visible, confirmLoading, ModalText } = this.state;

    return(
      <div className="dashboard-container" >
        <Modal
          title="Title"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <p>{ModalText}</p>
        </Modal>
        <Header history={this.props.history} />
        <div className="dashboard-main" >
          <div className="dashboard-user-profile" >
            <div className="dashboard-user-avatar" >
              <Avatar size={128} icon="user"/>
              <Button
                type="primary"
                size="small"
                onClick={this.showModal}
                className="dashboard-user-avatar-setter"
              >
                Set Avatar
              </Button>
            </div>
            <div className="user-info" >
              <p>Email: {UserStore.userAttributes.email}</p>
              <p>Name: {UserStore.userAttributes.nickname}</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default DashboardContainer;
