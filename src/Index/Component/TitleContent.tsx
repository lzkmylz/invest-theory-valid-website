import React from 'react';
import { Button } from 'antd';
import '../Style/TitleContent.scss';
const Fade = require('react-reveal/Fade');

class TitleContent extends React.Component {
  render() {
    return (
      <div className="title-content-container" >
        <Fade bottom={true} >
          <h1 className="title-font" >Make Best Investment Decision</h1>
        </Fade>
        <Fade delay={1000} bottom={true} >
          <h1 className="title-style" >With Invest Valid</h1>
        </Fade>
        <Fade delay={2000} bottom={true} >
          <p className="content-style" >We Use Big Data And Morden Finance Theory To Valid Your Investment And Get Better Return.</p>
        </Fade>
        <Button type="primary" size="large" className="content-getstart-btn" >
          <a href="/login" >Get Start</a>
        </Button>
      </div>
    )
  }
}

export default TitleContent;
