import React from 'react';
import Router from './Router';
import './App.scss';
import 'antd/dist/antd.css';
import 'reset-css';

const App: React.FC = () => {
  return (
    <div className="App background-dark">
      <Router />
    </div>
  );
}

export default App;
