import React from 'react';
import { Form, Input, Button } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import { observer } from 'mobx-react';
import UserStore from '../Store/UserStore';

interface Iprops extends FormComponentProps {
  history: any;
}

@observer
class SignupConfirmForm extends React.Component<Iprops> {
  state = {
    captchaError: undefined,
    loading: false,
  }

  handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err: any, values: any) => {
      if(UserStore.cognitoUser == null) return;
      this.setState({ loading: true });
      UserStore.cognitoUser.confirmRegistration(values.captcha, true, (err, result) => {
        if(!err) {
          this.props.history.push('/')
        } else {
          this.setState({ captchaError: 'error' });
        }
      });
    });
  }

  onCaptchaChange = (e: React.ChangeEvent) => {
    if(this.state.captchaError) {
      this.setState({ captchaError: undefined });
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const {
      captchaError,
      loading,
    } = this.state;
    return (
      <div className="signup-confirm-content" >
        <Form onSubmit={this.handleSubmit} className="signup-confirm-form" >
          <Form.Item
            className="signup-confirm-captha-input"
            validateStatus={captchaError}
            help={captchaError ? "Please enter correct captcha!" : ""}
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
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
            >
              Confirm
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Form.create<Iprops>({ name: 'signup-confirm' })(SignupConfirmForm);
