import * as React from 'react';
import '../Style/IndexContainer.scss';
import Header from '../Component/IndexHeader';
import TitleContent from '../Component/TitleContent';
import ProductContent from '../Component/IndexProductContent';
import Footer from '../Component/IndexFooter';

class IndexContainer extends React.Component {
  render() {
    return (
      <div className="index-container background-dark">
        <Header />
        <TitleContent />
        <ProductContent />
        <Footer />
      </div>
    );
  }
}

export default IndexContainer;
