import React from 'react';
import '../Style/IndexProductContent.scss';

class IndexProductContent extends React.Component {
  render() {
    return (
      <div className="index-product-container" >
        <div className="center-img" >
          <img className="stock-analysis-img" src='./index-analys.jpg' alt="stock data analysis" />
        </div>
      </div>
    )
  }
}

export default IndexProductContent;
