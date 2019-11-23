import React from 'react';
import { observer } from 'mobx-react';
import Header from '../Component/IndexHeader';
import Footer from '../Component/IndexFooter';
import SignupConfirmForm from '../Component/SignupConfirmForm';

import '../Style/SignupConfirmContainer.scss';

interface Iprops {
  history: {
    push(url: String): Function
  }
}

@observer
class SignupConfirmContainer extends React.Component<Iprops> {
  
  render() {
    return (
      <div className="signup-confirm-container background-light" >
        <Header history={this.props.history} />
        <div className="signup-confirm-main" >
          <div className="signup-confirm-title" >
            <h1>Confirm Your Email</h1>
            <p>We have send an Email with captcha to your email, please enter it in the input below:</p>
          </div>
          <SignupConfirmForm history={this.props.history} />
        </div>
        <Footer />
      </div>
    );
  }
}

export default SignupConfirmContainer;
