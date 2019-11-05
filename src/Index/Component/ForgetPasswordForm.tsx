import React from 'react';
import { Form, Input, Button } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import { observer } from 'mobx-react';
import _ from 'lodash';
import UserStore from '../Store/UserStore';
import '../Style/ForgetPasswordForm.scss';

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
    getCaptchaCoding: false,
    captchaCodingCount: -1,
    timerRecord: 0,
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

  getCaptcha = _.throttle(() => {
    this.setState({ getCaptchaCoding: true, captchaCodingCount: 30 });
    var record = setInterval(() => {
      if(this.state.captchaCodingCount >= 0) {
        this.setState({ captchaCodingCount: this.state.captchaCodingCount - 1 });
      } else {
        if(this.state.timerRecord !== 0) {
          clearInterval(this.state.timerRecord);
          this.setState({ getCaptchaCoding: false });
        }
      }
    }, 1000);
    this.setState({ timerRecord: record });

  }, 30000)

  render() {
    const { getFieldDecorator } = this.props.form;
    const {
      invalidCaptcha,
      newPWInvalid,
      getCaptchaCoding,
      captchaCodingCount,
    } = this.state;

    return (
      <div className="forgetpw-form-container" >
        <Form className="forgetpw-form" autoComplete="off" >
          <Form.Item
            className="forgetpw-captcha-input"
            validateStatus={invalidCaptcha}
          >
            {getFieldDecorator('captcha', {
              rules: [{ required: true, message: 'Please input your captcha!' }],
            })(
              <Input
                name="hidden"
                autoComplete="false"
                onChange={this.onCaptchaChange}
                placeholder="captcha"
              />,
            )}
          </Form.Item>
          <Button
            className="forgetpw-get-captcha"
            type="primary"
            disabled={getCaptchaCoding}
            onClick={this.getCaptcha}
          >
            {
              captchaCodingCount <= 0 ? "Get Captcha" : `Waiting (${captchaCodingCount})s`
            }
          </Button>
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
            <Button type="primary" htmlType="submit" className="forgetpw-btn" >
              Change New Password
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Form.create<Iprops>({ name: 'forget-password' })(ForgetPasswordForm);
