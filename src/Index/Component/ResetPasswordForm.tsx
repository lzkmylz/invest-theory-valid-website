import React from 'react';
import { Form, Input, Button } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import { observer } from 'mobx-react';
import UserStore from '../Store/UserStore';
import '../Style/ResetPasswordForm.scss';

interface Iprops extends FormComponentProps {
  history: any;
}

@observer
class ResetPasswordForm extends React.Component<Iprops> {
  state = {
    confirmDirty: false,
  }

  handleSubmit = (e: any) => {
    this.props.form.validateFieldsAndScroll((err: any, values: any) => {
      if(err) {
        console.log(err);
        return;
      }

    });
  }

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
    callback();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="resetpw-form-container" >
        <Form onSubmit={this.handleSubmit} className="resetpw-form" >
          <Form.Item
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
                className="resetpw-pw1"
                placeholder="New Password"
              />,
            )}
          </Form.Item>
          <Form.Item
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
                className="resetpw-pw2"
                placeholder="Confirm New Password"
              />,
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Reset Password
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

export default Form.create<Iprops>({ name: 'reset-password' })(ResetPasswordForm);
