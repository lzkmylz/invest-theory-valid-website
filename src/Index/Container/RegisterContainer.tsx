import React from 'react';
import Header from '../Component/IndexHeader';
import Footer from '../Component/IndexFooter';
import RegisterForm from '../Component/RegisterForm';

import '../Style/RegisterContainer.scss';

class RegisterContainer extends React.Component {
  render() {
    return (
      <div className="register-container background-dark" >
        <Header />
        <div className="register-title" >
          <p>Sign Up</p>
        </div>
        <div className="register-content" >
          <RegisterForm />
        </div>
        <Footer />
      </div>
    )
  }
}

export default RegisterContainer;
