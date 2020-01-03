import React from 'react';
import { observer } from 'mobx-react';
import {
  Form,
  Input,
  Button,
} from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';

interface Iprops extends FormComponentProps {
  history: {
    push(url: string): Function
  }
}

@observer
class RSRSComputeForm extends React.Component<Iprops> {
  handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err: any, values: any) => {
      if(!err) {
        
      }
    });
  }
  
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 8 },
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
      <Form
        className="rsrs-form"
        {...formItemLayout}
        onSubmit={this.handleSubmit}
      >

      </Form>
    );
  }
}

export default RSRSComputeForm;
