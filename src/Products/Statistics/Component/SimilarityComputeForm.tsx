import React from 'react';
import {
  Form,
  Input,
  Button,
  Select
} from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import { observer } from 'mobx-react';
import '../Style/SimilarityComputeForm.scss';

interface Iprops extends FormComponentProps {
  history: {
    push(url: string): Function
  }
}

@observer
class SimilarityComputeForm extends React.Component<Iprops> {
  handleSubmit = (e: any) => {
    this.props.form.validateFieldsAndScroll((err: any, values: any) => {
      if(!err) {

      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { Option } = Select;
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
        className="similarity-compute-form"
        {...formItemLayout}
        onSubmit={this.handleSubmit}
      >
        <Form.Item
          label="stock1"
        >
          {getFieldDecorator('stock1', {
            rules: [{
              required: true,
              message: "Please enter stock code!"
            }]
          })(<Input size="small" />)}
        </Form.Item>
        <Form.Item
          label="stock2"
        >
          {getFieldDecorator('stock2', {
            rules: [{
              required: true,
              message: "Please enter stock code!"
            }]
          })(<Input size="small" />)}
        </Form.Item>
        <Form.Item
          label="DateRange"
        >
          {getFieldDecorator('DateRange', {
            rules: [{
              required: true,
            }]
          })(
            <Select defaultValue="10" >
              <Option value="10" >Last 10 Trade Days</Option>
              <Option value="20" >Last 20 Trade Days</Option>
              <Option value="60" >Last 60 Trade Days</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout} >
          <Button
            type="primary"
            htmlType="submit"
          >
            Compute Similarity
          </Button>
        </Form.Item>
      </Form>
    )
  }
}

export default Form.create<Iprops>({ name: 'similarity-compute-form' })(SimilarityComputeForm)
