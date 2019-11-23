import React from 'react';
import '../Style/IndexFooter.scss';

class IndexFooter extends React.Component {
  render() {
    return (
      <div
        className="index-footer-container background-light" 
      >
        <p>@2019 Author: lzkmylz</p>
        <p>lzkmylz@gmail.com</p>
      </div>
    )
  }
}

export default IndexFooter;