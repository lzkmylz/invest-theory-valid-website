import React from 'react';
import { Form, Input, Button } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import { observer } from 'mobx-react';
import UserStore from '../Store/UserStore';
import '../Style/ResetPasswordForm.scss';

interface Iprops extends FormComponentProps {
  history: any;
}

@observer
class ResetPasswordForm extends React.Component<Iprops> {
  state = {
    confirmDirty: false,
    newPWInvalid: undefined,
    limitExceed: undefined,
  }

  handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err: any, values: any) => {
      if(err) {
        console.log(err);
        return;
      }
      if(UserStore.cognitoUser != null) {
        UserStore.cognitoUser.changePassword(
          values.oldpassword,
          values.password,
          (err: any, result) => {
            if (err) {
              if(err.code === "InvalidPasswordException") {
                this.setState({ newPWInvalid: "error" })
              }
              if(err.code === "LimitExceededException") {
                this.setState({ limitExceed: 'error' })
              }
              console.log(err)
            }
            console.log('call result: ' + result);
          }
        );
      }
    });
  }

  handleConfirmBlur = (e:any) => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule:any, value:String, callback:Function) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
    if(this.state.newPWInvalid) this.setState({ newPWInvalid: undefined });
  };

  validateToNextPassword = (rule:any, value:String, callback:Function) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    if(this.state.newPWInvalid) this.setState({ newPWInvalid: undefined });
    callback();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { newPWInvalid, limitExceed } = this.state;

    return (
      <div className="resetpw-form-container" >
        <Form onSubmit={this.handleSubmit} className="resetpw-form" >
        <Form.Item
          >
            {getFieldDecorator('oldpassword', {
            rules: [
              {
                required: true,
                message: 'Please input your old password!',
              }
            ],
          })(
              <Input.Password
                placeholder="Old Password"
              />,
            )}
          </Form.Item>
          <Form.Item
            validateStatus={newPWInvalid}
            help={newPWInvalid ? "Passowrd should more than 8 words, contain number, lower and upper case letters" : ""}
          >
            {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'Please input your new password!',
              },
              {
                validator: this.validateToNextPassword,
              },
            ],
          })(
              <Input.Password
                placeholder="New Password"
              />,
            )}
          </Form.Item>
          <Form.Item
            validateStatus={newPWInvalid}
          >
            {getFieldDecorator('confirm', {
            rules: [
              {
                required: true,
                message: 'Please confirm your password!',
              },
              {
                validator: this.compareToFirstPassword,
              },
            ],
          })(
              <Input.Password
                placeholder="Confirm New Password"
              />,
            )}
          </Form.Item>
          <Form.Item
            validateStatus={limitExceed}
            help={limitExceed ? "Attempt limit exceeded, please try after some time" : ""}
          >
            <Button type="primary" htmlType="submit" className="resetps-form-btn" >
              Reset Password
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

export default Form.create<Iprops>({ name: 'reset-password' })(ResetPasswordForm);
