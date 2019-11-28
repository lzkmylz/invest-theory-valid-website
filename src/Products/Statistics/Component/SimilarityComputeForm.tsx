import React from 'react';
import {
  Form,
  Input,
  Button,
  Select
} from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import { observer } from 'mobx-react';
import StatisticsStore from '../Stores/StatisticsStore';
import '../Style/SimilarityComputeForm.scss';

interface Iprops extends FormComponentProps {
  history: {
    push(url: string): Function
  }
}

@observer
class SimilarityComputeForm extends React.Component<Iprops> {
  state = {
    loading: false,
  }
  handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err: any, values: any) => {
      if(!err) {
        let { stock1, stock2, DateRange } = values;
        this.setState({ loading: true });
        StatisticsStore.similarityCompute(
          stock1, stock2, DateRange
        ).then(data => {
          StatisticsStore.similarityScore = Number(data.data.score);
          this.setState({ loading: false });
        })
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
    let { loading } = this.state;
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
              validator: this.validateStockCode,
              message: "Please enter proper stock code!"
            }]
          })(<Input size="small" />)}
        </Form.Item>
        <Form.Item
          label="stock2"
        >
          {getFieldDecorator('stock2', {
            rules: [{
              required: true,
              message: "Please enter right stock code!"
            }]
          })(<Input size="small" />)}
        </Form.Item>
        <Form.Item
          label="DateRange"
        >
          {getFieldDecorator('DateRange', {
            initialValue: "30",
            rules: [{
              required: true,
            }]
          })(
            <Select >
              <Option value="30" >Last 30 Trade Days</Option>
              <Option value="60" >Last 60 Trade Days</Option>
              <Option value="90" >Last 90 Trade Days</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout} >
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
          >
            Compute Similarity
          </Button>
        </Form.Item>
      </Form>
    )
  }
}

export default Form.create<Iprops>({ name: 'similarity-compute-form' })(SimilarityComputeForm)
