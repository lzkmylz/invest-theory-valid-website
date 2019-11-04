import React from 'react';
import Header from '../Component/IndexHeader';
import Footer from '../Component/IndexFooter';
import ResetPasswordForm from '../Component/ResetPasswordForm';
import '../Style/ResetPasswordContainer.scss';

interface Iprops {
  history: {
    push(url: String): Function
  }
}

class ResetPasswordContainer extends React.Component<Iprops> {

  render() {
    return (
      <div className="resetpw-container" >
        <Header history={this.props.history} />
        <div className="resetpw-main" >
          <div className="resetpw-title" >
            <h1>Reset Password</h1>
            <p>Please input your new password:</p>
          </div>
          <ResetPasswordForm history={this.props.history} />
        </div>
        <Footer />
      </div>
    )
  }
}

export default ResetPasswordContainer;
