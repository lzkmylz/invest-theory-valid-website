import React from 'react';
import Header from '../Component/IndexHeader';
import Footer from '../Component/IndexFooter';
import Countdown, { CountdownRenderProps } from "react-countdown-now";
import '../Style/ForgetPasswordFeedBack.scss';

interface Iprops {
  history: {
    push(url: String): Function
  }
}

class ForgetPasswordFeedBack extends React.Component<Iprops> {
  render() {
    const renderer = ({ hours, minutes, seconds, completed }: CountdownRenderProps) => {
      if (completed) {
        this.props.history.push("/");
      } else {
        return <span>{seconds}</span>;
      }
    };

    return (
      <div className="forgetpw-feedback-container" >
        <Header history={this.props.history} />
        <div className="forgetpw-feedback-main" >
          <h1>Reset Password Success</h1>
          <h3>Now you can sign in with your new password!</h3>
          <Countdown date={Date.now() + 5000} renderer={renderer} />
        </div>
        <Footer />
      </div>
    )
  }
}

export default ForgetPasswordFeedBack;
