import React from 'react';
import '../Style/IndexFooter.scss';

interface Iprops {
  padding?: number | undefined
}

class IndexFooter extends React.Component<Iprops> {
  render() {
    return (
      <div
        className="index-footer-container background-dark" 
      >
        <p>@2019 Author: lzkmylz</p>
        <p>lzkmylz@gmail.com</p>
      </div>
    )
  }
}

export default IndexFooter;