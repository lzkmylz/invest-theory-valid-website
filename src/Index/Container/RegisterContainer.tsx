import React from 'react';
import Header from '../Component/IndexHeader';
import Footer from '../Component/IndexFooter';
import RegisterForm from '../Component/RegisterForm';

import '../Style/RegisterContainer.scss';

type Iprops = Readonly<{
  history: {
    push(url: String): void
  }
}>

class RegisterContainer extends React.Component<Iprops> {
  render() {
    return (
      <div className="register-container background-dark" >
        <Header />
        <div className="register-title" >
          <p>Sign Up</p>
        </div>
        <div className="register-content" >
          <RegisterForm history={this.props.history} />
        </div>
        <Footer />
      </div>
    )
  }
}

export default RegisterContainer;
