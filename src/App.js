import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import ShoppingCart from './components/ShoppingCart';
import ProductDetails from './components/ProductDetails';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cartProducts: [],
    };
    this.addCarts = this.addCarts.bind(this);
  }

  addCarts({ target: { name } }) {
    this.setState((prev) => ({ cartProducts: [...prev.cartProducts, name] }));
  }

  render() {
    const { cartProducts } = this.state;
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/shopping-cart"
            render={
              (props) => (<ShoppingCart
                { ...props }
                cartProducts={ cartProducts }
              />)
            }
          />
          <Route
            exact
            path="/product/:id"
            render={ (props) => (<ProductDetails
              { ...props }
              addCart={ this.addCarts }
            />) }
          />
          <Route
            exact
            path="/"
            render={ (props) => (<Home { ...props } addCart={ this.addCarts } />) }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
