import React from 'react';
import { observer } from 'mobx-react';
import {
  Form,
  Input,
  Button,
} from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';

import '../Style/RSRSComputeForm.scss';

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

  validateStockCode = (rule: any, value: any, callback: any) => {
    if(value) {
      let code = String(value.split('.')[0]);
      let suffix = String(value.split('.')[1]);
      if(suffix !== "SH" && suffix !== "SZ" && suffix !== "CYB") {
        callback('Incorrect stock code suffix!');
      }
      if(code.length !== 6) {
        callback('Incorrect code length!');
      }
    }
    callback();
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
        <Form.Item
          label="StockName"
        >
          {getFieldDecorator('stockName', {
            rules: [{
              required: true,
              validator: this.validateStockCode,
              message: "Please enter proper stock code!"
            }]
          })(<Input size="small" />)}
        </Form.Item>
        <Form.Item
          {...tailFormItemLayout}
        >
          <Button
            type="primary"
            htmlType="submit"
          >
            Compute RSRS
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create<Iprops>({ name: 'rsrs-compute-form' })(RSRSComputeForm);
