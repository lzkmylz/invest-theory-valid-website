import React from 'react';
import '../Style/TitleContent.scss';
const Fade = require('react-reveal/Fade');

class TitleContent extends React.Component {
  render() {
    return (
      <div className="title-content-container" >
        <Fade bottom={true} >
          <h1 className="title-font" >Make Best Investment Decision</h1>
        </Fade>
        <Fade delay="1000" bottom={true} >
          <h1 className="title-font" >With Invest Valid</h1>
        </Fade>
      </div>
    )
  }
}

export default TitleContent;
