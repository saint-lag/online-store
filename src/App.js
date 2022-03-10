import React from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './components/Home';
import ShoppingCart from './components/ShoppingCart';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Route path="/shopping-cart" component={ ShoppingCart } />
        <Route path="/" component={ Home } />
      </BrowserRouter>
    );
  }
}

export default App;
