import React from 'react';
import { Form, Input, Button } from 'antd';
import Header from '../Component/IndexHeader';
import Footer from '../Component/IndexFooter';

type Iprops = Readonly<{
  form: any
}>

class SignupConfirmContainer extends React.Component<Iprops> {
  state = {
    captchaError: undefined,
  }

  handleSubmit = (e: any) => {

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
          <Form onSubmit={this.handleSubmit} >
            <Form.Item
              validateStatus={this.state.captchaError}
            >
              {getFieldDecorator('username', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input
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

export default SignupConfirmContainer;
