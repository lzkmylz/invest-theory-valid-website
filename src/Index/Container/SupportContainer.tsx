import React from 'react';
import { Button } from 'antd';
import { observer } from 'mobx-react';
import $ from 'jquery';
import Header from '../Component/IndexHeader';
import Footer from '../Component/IndexFooter';
import { HistoryInterface } from '../../Utils/Interfaces';
import "../Style/SupportContainer.scss";
/// <reference path=".../../Utils/react-chat-elements.d.ts" />
import {
  MessageList,
  Input,
} from 'react-chat-elements';
import RobotStore from '../Store/RobotStore';
import "react-chat-elements/dist/main.css";


@observer
class SupportContainer extends React.Component<HistoryInterface> {
  componentDidMount = () => {
    $(".msg-input").keypress((e) => {
      if(e.key === "Enter") {
        let text = String($(".rce-input").val());
        if(text) {
          this.addToMessages(text.toString());
        }
        $(".rce-input").val("")
      }
    });
    RobotStore.initMessages();
  }

  addToMessages = (text: string) => {
    let message = {
      position: 'right',
      type: 'text',
      text: text.toString(),
      date: new Date(),
    }
    RobotStore.addToMessages(message);
    RobotStore.getAnswer(text);
  }

  onSubmitMessage = async (e: any) => {
    let text = await $(".rce-input").val();
    if(text) {
      this.addToMessages(text.toString());
    }
    $(".rce-input").val("");
  }

  render() {
    return (
      <div className="support-container" >
        <Header history={this.props.history} />
        <div className="support-content" >
          <div className="support-title" >
            <h1 className="support-title-h1" >Support</h1>
          </div>
          <div className="chat-board-container" >
            <div className="chat-msg-container" >
              <MessageList
                className='message-list'
                lockable={false}
                toBottomHeight={'100%'}
                dataSource={RobotStore.messages}
              />
            </div>
            <Input
              className="msg-input"
              placeholder="Type here..."
              multiline={false}
              rightButtons={
                <Button type="primary" onClick={this.onSubmitMessage} >Send</Button>
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
