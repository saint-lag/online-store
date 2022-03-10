import React from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './components/Home';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Route path="/" component={ Home } />
      </BrowserRouter>
    );
  }
}

export default App;
