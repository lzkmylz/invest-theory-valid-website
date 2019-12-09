import React from 'react';
import { Button } from 'antd';
import { observer } from 'mobx-react';
import Header from '../Component/IndexHeader';
import Footer from '../Component/IndexFooter';
import { HistoryInterface } from '../../Utils/Interfaces';
import "../Style/SupportContainer.scss";
import "react-chat-elements/dist/main.css";

const ChatElement = require('react-chat-elements');
const MessageList = ChatElement.MessageList;
const MessageInput = ChatElement.Input;

@observer
class SupportContainer extends React.Component<HistoryInterface> {
  state = {
    massages: [{
      position: 'left',
      type: 'text',
      text: 'Please enter your questions here and wait response from our QA system.',
      date: new Date(),
    }]
  }

  render() {
    const { massages } = this.state;
    return (
      <div className="support-container" >
        <Header history={this.props.history} />
        <div className="support-content" >
          <div className="support-title" >
            <h1>Support</h1>
          </div>
          <div className="chat-board-container" >
            <div className="chat-msg-container" >
              <MessageList
                className='message-list'
                lockable={false}
                toBottomHeight={'100%'}
                dataSource={massages}
              />
            </div>
            <MessageInput
              className="msg-input"
              placeholder="Type here..."
              multiline={true}
              rightButtons={
                <Button type="primary" >Send</Button>
              }
            />
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default SupportContainer;
