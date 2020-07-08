import React from 'react';
import logo from './logo.svg';
import './App.css';
import MainComponent from './component/MainComponent';
import SideComponent from './component/SideComponent';

function App() {
  return (
    <div className="row">
      <SideComponent />
      <MainComponent />
    </div>
  );
}

export default App;
