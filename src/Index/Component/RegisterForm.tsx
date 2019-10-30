import React from 'react';
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Button,
} from 'antd';
import { CognitoUserAttribute, ISignUpResult, NodeCallback } from 'amazon-cognito-identity-js';
import { observer } from 'mobx-react';
import { Redirect } from 'react-router-dom';
import UserStore from '../Store/UserStore';

import '../Style/RegisterForm.scss';

type Iprops = Readonly<{
  form: any
}>

@observer
class RegisterForm extends React.Component<Iprops> {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    passwordInvalidate: undefined,
  };

  handleSubmit = (e:any) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err:any, values:any) => {
      if (!err) {
        // handle cognito register here
        var dataEmail = {
          Name: 'email',
          Value: values.email
        };
        var attributeEmail = new CognitoUserAttribute(dataEmail);
        var userPool = UserStore.userPool;
        userPool.signUp(values.email, values.password, [attributeEmail], [], 
          (err: any, result: any) => {
            if(!err) {
              UserStore.setCognitoUser(result);
              return <Redirect to="/" />
            } else {
              if(err.code === "InvalidPasswordException") {
                this.setState({ passwordInvalidate: "error" });
              }
              console.log(err);
            }
          })
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
    const passwordErrorHelp = "Passowrd should more than 8 words, contain number, lower and upper case letters";

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
        <Form.Item label="E-mail">
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
          validateStatus={this.state.passwordInvalidate}
          help={this.state.passwordInvalidate === "error" ? passwordErrorHelp : ""}
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
          <Button type="primary" htmlType="submit">
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    );
  }
}


export default Form.create({ name: 'register' })(RegisterForm);
