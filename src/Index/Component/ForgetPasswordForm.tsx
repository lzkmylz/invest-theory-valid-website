import React from 'react';
import { Form, Input, Button } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import { observer } from 'mobx-react';
import _ from 'lodash';
import { CognitoUser } from 'amazon-cognito-identity-js';
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
    captchaSendState: undefined,
    loading: false,
  }

  componentWillUnmount = () => {
    if(this.state.timerRecord) {
      clearInterval(this.state.timerRecord);
    }
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

  handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields((err: any, values: any) => {
      if(err) return;
      this.setState({ loading: true });
      var code = values.captcha;
      var newPassword = values.password;
      if(UserStore.cognitoUser != null) {
        UserStore.cognitoUser.confirmPassword(code, newPassword, {
          onSuccess: () => {
            this.props.history.push('/');
          },
          onFailure: (err:any) => {
            if(err.code === "CodeMismatchException") {
              this.setState({ invalidCaptcha: 'error' });
            } else if(err.code === "InvalidPasswordException") {
              this.setState({ newPWInvalid: 'error' });
            }
          }
        });
      }
    });
  }

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

    // get captcha
    var cognitoUser = new CognitoUser({
      Username: this.props.form.getFieldValue('email'),
      Pool: UserStore.userPool
    });
    UserStore.setCognitoUser(cognitoUser);
    cognitoUser.forgotPassword({
      onSuccess: data => {
        this.setState({ captchaSendState: 'success' });
      },
      onFailure: err => {
        this.setState({ captchaSendState: 'error' });
      }
    });
  }, 30000)

  render() {
    const { getFieldDecorator } = this.props.form;
    const {
      invalidCaptcha,
      newPWInvalid,
      getCaptchaCoding,
      captchaCodingCount,
      captchaSendState,
      loading,
    } = this.state;

    var captchaSendHelp = '';
    if(captchaSendState === "success") {
      captchaSendHelp = 'Captcha has send to your email.';
    } else if (captchaSendState === "error") {
      captchaSendHelp = "Captcha send failed, please check your email.";
    }

    return (
      <div className="forgetpw-form-container" >
        <Form
          className="forgetpw-form"
          autoComplete="off"
          onSubmit={this.handleSubmit}
        >
          <Form.Item
            className="forgetpw-email-input"
            validateStatus={captchaSendState}
            help={captchaSendHelp}
          >
            {getFieldDecorator('email', {
              rules: [{ required: true, message: 'Please input your email!' }],
            })(
              <Input
                name="hidden"
                autoComplete="false"
                onChange={this.onCaptchaChange}
                placeholder="Email"
              />,
            )}
          </Form.Item>
          <Form.Item
            className="forgetpw-captcha-input"
            validateStatus={invalidCaptcha}
            help={invalidCaptcha ? "Invalid verification code provided, please try again." : ""}
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
              captchaCodingCount < 0 ? "Get Captcha" : `Waiting (${captchaCodingCount})s`
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
                autoComplete="off"
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
            <Button
              type="primary"
              htmlType="submit"
              className="forgetpw-btn"
              loading={loading}
            >
              Change New Password
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Form.create<Iprops>({ name: 'forget-password' })(ForgetPasswordForm);
