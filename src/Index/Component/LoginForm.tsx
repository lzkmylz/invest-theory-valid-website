import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { AuthenticationDetails, CognitoUser, CognitoUserSession } from 'amazon-cognito-identity-js';
import { observer } from 'mobx-react';
import * as AWS from 'aws-sdk/global';
import UserStore from '../Store/UserStore';
import { config } from '../Constants';

import '../Style/LoginForm.scss';

type Iprops = Readonly<{
  form: any
}>

@observer
class LoginForm extends React.Component<Iprops> {
  handleSubmit = (e:any) => {
    e.preventDefault();
    this.props.form.validateFields((err:any, values:any) => {
      if (!err) {
        var authenticationData = {
          Username: values.username,
          Password: values.password
        };
        var authenticationDetails = new AuthenticationDetails(authenticationData);
        var userData = {
          Username: values.username,
          Pool: UserStore.userPool
        };
        var cognitoUser = new CognitoUser(userData);
        cognitoUser.authenticateUser(authenticationDetails, {
          onSuccess: function(result: CognitoUserSession) {
            var loginUrl = `cognito-idp.${AWS.config.region}.amazonaws.com/${config.cognito.userPoolId}`;
            var options = {
              IdentityPoolId: config.cognito.userPoolId,
              Logins: {}
            }
            options.Logins[loginUrl] = result.getIdToken().getJwtToken();
            var credentials =  new AWS.CognitoIdentityCredentials(options);
            credentials.refresh(error => {
              if(error) {
                console.log(error);
              }
              AWS.config.credentials = credentials;
            });
          },
          onFailure: function(err) {
            alert(err.message || JSON.stringify(err));
          }
        });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
              id="login-username"
              size="small"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
              size="small"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox style={{ color: "#1890ff" }} className="login-remember" >Remember me</Checkbox>)}
          <a className="login-form-forgot" href="/forgetPassword">
            Forgot password
          </a>
          <Button type="primary" htmlType="submit" className="login-form-button" size="small" >
            Sign In
          </Button>
          Or <a href="/register" className="login-registernow" >Sign Up now!</a>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create({ name: 'login' })(LoginForm);
