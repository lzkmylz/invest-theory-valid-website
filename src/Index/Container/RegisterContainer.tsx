import React from 'react';
import Header from '../Component/IndexHeader';
import Footer from '../Component/IndexFooter';
import RegisterForm from '../Component/RegisterForm';
import { HistoryInterface } from '../../Utils/Interfaces';
import '../Style/RegisterContainer.scss';

class RegisterContainer extends React.Component<HistoryInterface> {
  render() {
    return (
      <div className="register-container background-light" >
        <Header history={this.props.history} />
        <div className="register-main" >
          <div className="register-title" >
            <p>Sign Up</p>
          </div>
          <div className="register-content" >
            <RegisterForm history={this.props.history} />
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default RegisterContainer;
