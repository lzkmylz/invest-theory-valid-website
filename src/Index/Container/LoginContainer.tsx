import React from 'react';
import Header from '../Component/IndexHeader';
import Footer from '../Component/IndexFooter';
import LoginForm from '../Component/LoginForm';
import { HistoryInterface } from '../../Utils/Interfaces';
import '../Style/LoginContainer.scss';

class LoginContainer extends React.Component<HistoryInterface> {
  render() {    
    return (
      <div className="login-container background-light" >
        <Header history={this.props.history} />
        <div className="login-content" >
          <div className="img-flex-container" >
            <div className="login-img-container desktop " >
              <img src="./login-side.jpg" alt="data change world" className="login-side-img" />
            </div>
          </div>
          <div className="login-input-container" >
            <h1 className="login-title" >Sign In</h1>
            <LoginForm history={this.props.history} />
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default LoginContainer;
