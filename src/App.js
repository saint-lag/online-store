import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import ShoppingCart from './components/ShoppingCart';
import ProductDetails from './components/ProductDetails';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/shopping-cart" component={ ShoppingCart } />
          <Route
            exact
            path="/product/:id"
            render={ (props) => (<ProductDetails { ...props } />) }
          />
          <Route exact path="/" component={ Home } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
