import React from 'react';
import Header from '../Component/IndexHeader';
import Footer from '../Component/IndexFooter';

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
        <p>content</p>
        <Footer />
      </div>
    )
  }
}

export default ResetPasswordContainer;
