import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserSession,
} from 'amazon-cognito-identity-js';
import { FormComponentProps } from 'antd/lib/form/Form';
import { observer } from 'mobx-react';
import UserStore, { UserAttributes } from '../Store/UserStore';

import '../Style/LoginForm.scss';

interface Iprops extends FormComponentProps {
  history: any;
}

@observer
class LoginForm extends React.Component<Iprops> {
  state = {
    notAuthorized: undefined,
    loading: false,
  }

  handleSubmit = (e:any) => {
    e.preventDefault();
    this.props.form.validateFields((err:any, values:any) => {
      if (!err) {
        this.setState({ loading: true });
        var authenticationData = {
          Username: values.username,
          Password: values.password
        };
        var authenticationDetails = new AuthenticationDetails(authenticationData);
        var userPool = UserStore.getUserPool();
        var userData = {
          Username: values.username,
          Pool: userPool
        };
        var cognitoUser = new CognitoUser(userData);
        cognitoUser.authenticateUser(authenticationDetails, {
          onSuccess: (result: CognitoUserSession) => {
            var accessToken = result.getAccessToken().getJwtToken();
            UserStore.setAccessToken(accessToken);
            cognitoUser.getUserAttributes((err, result) => {
              if(err) {
                console.log(err.message);
              }
              if(result === undefined) return;
              var userAttributes: UserAttributes = {
                email: '',
                nickname: '',
                sub: '',
                emailVerified: false,
                s3_avatar_url: ''
              };
              for (let i = 0; i < result.length; i++) {
                if(result[i].getName() === "email") userAttributes.email = result[i].getValue();
                if(result[i].getName() === "nickname") userAttributes.nickname = result[i].getValue();
                if(result[i].getName() === "sub") userAttributes.sub = result[i].getValue();
                if(result[i].getName() === "email_verified") userAttributes.emailVerified = Boolean(result[i].getValue());
              }
              UserStore.setUserAttributes(userAttributes);
              if(!values.remember) {
                localStorage.clear();
              }
              this.props.history.push("/");
            });
          },
          onFailure: (err) => {
            if(err.code === "NotAuthorizedException") {
              this.setState({ notAuthorized: "error", loading: false });
            }
          }
        });
      }
    });
  };

  resetErrorState = () => {
    this.setState({ notAuthorized: undefined });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const {
      notAuthorized,
      loading,
    } = this.state;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item
          validateStatus={notAuthorized}
        >
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
              id="login-username"
              size="small"
              onChange={this.resetErrorState}
            />,
          )}
        </Form.Item>
        <Form.Item
          validateStatus={notAuthorized}
          help={notAuthorized ? "Incorrect username or password" : ""}
        >
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
              size="small"
              onChange={this.resetErrorState}
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox style={{ color: "#1890ff" }} className="login-remember" >Remember me</Checkbox>)}
          <a className="login-form-forgot" href="/forget-password">
            Forgot password
          </a>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            size="small"
            loading={loading}
          >
            Sign In
          </Button>
          Or <a href="/register" className="login-registernow" >Sign Up now!</a>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create<Iprops>({ name: 'login' })(LoginForm);
