import React from 'react';
import {
  Avatar,
  Button,
  Modal,
  Upload,
  Icon,
} from 'antd';
import { UploadChangeParam, RcFile } from 'antd/lib/upload'
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

function getBase64(file: any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

@observer
class DashboardContainer extends React.Component<Iprops> {
  state = {
    visible: false,
    confirmLoading: false,
    previewVisible: false,
    previewImage: '',
    fileList: [],
    file: null,
  }

  componentWillUnmount = () => {
    if(!Boolean(UserStore.accessToken)) {
      this.props.history.push("/");
    }
  }

  handleCancelPreview = () => {
    this.setState({ previewVisible: false });
  }

  handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  handleChange = ({ fileList }: UploadChangeParam) => this.setState({ fileList });

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    if(!this.state.file) {
      return;
    }

    this.setState({
      confirmLoading: true,
    });

    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 1000);
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  handlePreviewCancel = () => {
    this.setState({ previewVisible: false });
  }

  handleUploadAvatar = (file: RcFile, files: RcFile[]) => {
    this.setState({ file: file });
    return false;
  }

  render() {
    const {
      visible,
      confirmLoading,
      previewImage,
      previewVisible,
      fileList,
    } = this.state;

    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload New Avatar</div>
      </div>
    );

    return(
      <div className="dashboard-container" >
        <Modal
          title="Upload New Avatar"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <div className="avatar-modal-main" >
            <Upload
              accept=".jpg,.png"
              listType="picture-card"
              fileList={fileList}
              onPreview={this.handlePreview}
              onChange={this.handleChange}
              beforeUpload={this.handleUploadAvatar}
            >
              {fileList.length >= 1 ? null : uploadButton}
            </Upload>
          </div>
        </Modal>
        <Modal visible={previewVisible} footer={null} onCancel={this.handlePreviewCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
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
