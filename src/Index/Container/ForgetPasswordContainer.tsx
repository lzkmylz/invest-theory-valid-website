import React from 'react';
import Header from '../Component/IndexHeader';
import Footer from '../Component/IndexFooter';
import ForgetPasswordForm from '../Component/ForgetPasswordForm';
import { HistoryInterface } from '../../Utils/Interfaces';
import '../Style/ForgetPasswordContainer.scss';

class ForgetPasswordContainer extends React.Component<HistoryInterface> {
  render() {
    return (
      <div className="forgetpw-container" >
        <Header history={this.props.history} />
        <div className="forgetpw-main" >
          <div className="forgetpw-title" >
            <h1>Forget Password</h1>
          </div>
          <ForgetPasswordForm history={this.props.history} />
        </div>
        <Footer />
      </div>
    );
  }
}

export default ForgetPasswordContainer;
