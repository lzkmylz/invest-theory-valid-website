import React from 'react';
import * as AWS from 'aws-sdk/global';
import Router from './Router';
import './App.scss';
import 'antd/dist/antd.css';
import 'reset-css';

const App: React.FC = () => {
  AWS.config.region = 'ap-southeast-1';
  return (
    <div className="App background-dark">
      <Router />
    </div>
  );
}

export default App;
