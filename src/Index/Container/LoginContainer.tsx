import React from 'react';
import Header from '../Component/IndexHeader';
import Footer from '../Component/IndexFooter';
import LoginForm from '../Component/LoginForm';
import '../Style/LoginContainer.scss';

interface Iprops {
  history: {
    push(url: String): Function
  }
}

class LoginContainer extends React.Component<Iprops> {
  render() {    
    return (
      <div className="login-container background-dark" >
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
