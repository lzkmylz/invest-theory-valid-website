import React from 'react';
import { Form, Input, Button } from 'antd';
import { observer } from 'mobx-react';
import { Redirect } from 'react-router-dom';
import Header from '../Component/IndexHeader';
import Footer from '../Component/IndexFooter';
import UserStore from '../Store/UserStore';

import '../Style/SignupConfirmContainer.scss';

type Iprops = Readonly<{
  form: any
}>

@observer
class SignupConfirmContainer extends React.Component<Iprops> {
  state = {
    captchaError: undefined,
  }

  handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err: any, values: any) => {
      UserStore.cognitoUser.confirmRegistration(values, true, (err, result) => {
        if(!err) {
          return <Redirect to="/" />
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
    return (
      <div className="signup-confirm-container background-dark" >
        <Header />
        <div className="signup-confirm-title" >
          <h1>Confirm Your Email</h1>
          <p>We have send an Email with captcha to your email, please enter it in the input below:</p>
        </div>
        <div className="signup-confirm-content" >
          <Form onSubmit={this.handleSubmit} className="signup-confirm-form" >
            <Form.Item
              className="signup-confirm-captha-input"
              validateStatus={this.state.captchaError}
              help={this.state.captchaError ? "Please enter correct captcha!" : ""}
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
              <Button type="primary" htmlType="submit">
                Confirm
              </Button>
            </Form.Item>
          </Form>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Form.create({ name: 'signup-confirm' })(SignupConfirmContainer);
