import * as React from 'react';
import '../Style/IndexContainer.scss';
import Header from '../Component/IndexHeader';
import TitleContent from '../Component/TitleContent';
import ProductContent from '../Component/IndexProductContent';
import Footer from '../Component/IndexFooter';
import { HistoryInterface } from '../../Utils/Interfaces';

class IndexContainer extends React.Component<HistoryInterface> {
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
