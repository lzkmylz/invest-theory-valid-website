import * as React from 'react';
import '../Style/IndexContainer.scss';
import Header from '../Component/IndexHeader';
import TitleContent from '../Component/TitleContent';
import ProductContent from '../Component/IndexProductContent';
import Footer from '../Component/IndexFooter';

interface Iprops {
  history: {
    push(url: String): Function
  }
}

class IndexContainer extends React.Component<Iprops> {
  render() {
    return (
      <div className="index-container background-light">
        <Header history={this.props.history} />
        <TitleContent />
        <ProductContent />
        <Footer />
      </div>
    );
  }
}

export default IndexContainer;
