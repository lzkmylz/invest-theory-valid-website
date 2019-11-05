import React from 'react';
import Header from '../Component/IndexHeader';
import Footer from '../Component/IndexFooter';
import '../Style/ForgetPasswordContainer.scss';

interface Iprops {
  history: {
    push(url: String): Function
  }
}

class ForgetPasswordContainer extends React.Component<Iprops> {
  render() {
    return (
      <div className="forgetpw-container" >
        <Header history={this.props.history} />
        <div className="forgetpw-main" >
          <div className="forgetpw-title" >
            <h1>Forget Password</h1>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default ForgetPasswordContainer;
