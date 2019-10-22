import React from 'react';
import Header from '../Component/IndexHeader';
import Footer from '../Component/IndexFooter';
import LoginForm from '../Component/LoginForm';
import '../Style/LoginContainer.scss';

class LoginContainer extends React.Component {
  render() {    
    return (
      <div className="login-container background-dark" >
        <Header />
        <div className="login-content" >
          <div className="img-flex-container" >
            <div className="login-img-container desktop " >
              <img src="./login-side.jpg" alt="data change world" className="login-side-img" />
            </div>
          </div>
          <div className="login-input-container" >
            <h3 className="login-title" >Login</h3>
            <LoginForm />
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default LoginContainer;
