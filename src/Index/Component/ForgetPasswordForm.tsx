import React from 'react';
import { Form, Input, Button } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import { observer } from 'mobx-react';
import UserStore from '../Store/UserStore';

interface Iprops extends FormComponentProps {
  history: {
    push(url: String): Function
  }
}

@observer
class ForgetPasswordForm extends React.Component<Iprops> {
  state = {
    confirmDirty: false,
    invalidCaptcha: undefined,
    newPWInvalid: undefined,
  }

  onCaptchaChange = () => {
    if(this.state.invalidCaptcha) {
      this.setState({ invalidCaptcha: undefined });
    }
  }

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
    const { invalidCaptcha, newPWInvalid } = this.state;

    return (
      <div className="forgetpw-form-container" >
        <Form className="forgetpw-form" >
          <Form.Item
            className="gorgetpw-captcha-input"
            validateStatus={invalidCaptcha}
          >
            {getFieldDecorator('captcha', {
              rules: [{ required: true, message: 'Please input your captcha!' }],
            })(
              <Input
                onChange={this.onCaptchaChange}
                placeholder="captcha"
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
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Change New Password
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Form.create<Iprops>({ name: 'forget-password' })(ForgetPasswordForm);
