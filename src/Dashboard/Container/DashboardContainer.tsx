import React from 'react';
import {
  Avatar,
  Button,
  Modal,
  Upload,
  Icon,
  message,
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
    filetype: null,
    uploadError: false,
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

  handleChange = async (info: UploadChangeParam) => {
    let data = await getBase64(info.fileList[0].originFileObj);
    this.setState({ file: data, filetype: info.file.type, fileList: info.fileList });
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    const file: string | null = this.state.file;
    const filetype: string | null = this.state.filetype;
    if(file == null || filetype == null) {
      message.error("Please upload new avatar or cancel");
      return;
    }
    this.setState({
      confirmLoading: true,
    });

    UserStore.UpdateAvatar(file, filetype)
      .then(data => {
        UserStore.UpdateS3Avatar(data.data.data).then(res => {
          this.setState({ confirmLoading: false, visible: false });
          this.props.history.push('/dashboard');
        }, err => {
          this.setState({ confirmLoading: false, visible: false });
          message.error(err.message);
        });
      });
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
