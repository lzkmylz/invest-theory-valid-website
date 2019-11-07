import React from 'react';
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Button,
} from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { observer } from 'mobx-react';
import UserStore from '../Store/UserStore';

import '../Style/RegisterForm.scss';

interface Iprops extends FormComponentProps {
  history: any;
}

@observer
class RegisterForm extends React.Component<Iprops, any> {
  state = {
    confirmDirty: false,
    passwordInvalidate: undefined,
    emailInvalidate: undefined,
    loading: false,
  };

  handleSubmit = (e:any) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err:any, values:any) => {
      if (!err) {
        this.setState({ loading: true });
        // handle cognito register here
        var attributeList = [];
        var dataEmail = {
          Name: 'email',
          Value: values.email
        };
        var dataNickname = {
          Name: 'nickname',
          Value: values.nickname
        }
        var attributeEmail = new CognitoUserAttribute(dataEmail);
        var attributeNickname = new CognitoUserAttribute(dataNickname);
        attributeList.push(attributeEmail);
        attributeList.push(attributeNickname);
        var userPool = UserStore.getUserPool();
        userPool.signUp(values.email, values.password, attributeList, [], 
          (err: any, result: any) => {
            if(!err) {
              UserStore.setCognitoUser(result.user);
              this.props.history.push('/signup-confirm');
            } else {
                if(err.code === "InvalidPasswordException") {
                  this.setState({
                    passwordInvalidate: "error",
                  });
                }
                if(err.code === "UsernameExistsException") {
                  this.setState({
                    emailInvalidate: "error",
                  });
                this.setState({ loading: false });
              }
            }
          });
      }
    });
  };

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
  };

  validateToNextPassword = (rule:any, value:String, callback:Function) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    if (this.state.passwordInvalidate === "error") {
      this.setState({ passwordInvalidate: undefined });
    }
    callback();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const {
      passwordInvalidate,
      emailInvalidate,
      loading,
    } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit} className="register-form" >
        <Form.Item
          label="E-mail"
          validateStatus={emailInvalidate}
          help={emailInvalidate === "error" ? "Email has already signed up. Please use another Email address or sign in." : ""}
        >
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ],
          })(<Input size="small" />)}
        </Form.Item>
        <Form.Item
          label="Password"
          validateStatus={passwordInvalidate}
          help={passwordInvalidate === "error" ? "Passowrd should more than 8 words, contain number, lower and upper case letters" : ""}
          hasFeedback
        >
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'Please input your password!',
              },
              {
                validator: this.validateToNextPassword,
              },
            ],
          })(<Input.Password size="small" />)}
        </Form.Item>
        <Form.Item
          label="Confirm Password"
          validateStatus={this.state.passwordInvalidate}
          hasFeedback
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
          })(<Input.Password onBlur={this.handleConfirmBlur} size="small" />)}
        </Form.Item>
        <Form.Item
          label={
            <span>
              Nickname&nbsp;
              <Tooltip title="What do you want others to call you?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator('nickname', {
            rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
          })(<Input size="small" />)}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
          >
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    );
  }
}


export default Form.create<Iprops>({ name: 'register' })(RegisterForm);
