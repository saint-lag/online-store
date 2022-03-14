import React from 'react';
import PropTypes from 'prop-types';
import * as api from '../services/api';

class ShoppingCart extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
    };
    this.displayProduct = this.displayProduct.bind(this);
    this.renderProducts = this.renderProducts.bind(this);
  }

  componentDidMount() {
    this.displayProduct();
  }

  async displayProduct() {
    const { cartProducts } = this.props;
    const { products } = this.state;
    for (let index = 0; index < cartProducts.length; index += 1) {
      products.push(api.getProductsFromId(cartProducts[index]));
    }
    const newProducts = await Promise.all(products);
    this.setState({ products: newProducts });
  }

  renderProducts() {
    const { products } = this.state;
    return (products.length > 0)
      ? (
        <div>
          {products.map(({ title, thumbnail }) => (
            <div key={ title }>
              <h2 data-testid="shopping-cart-product-name">{ title }</h2>
              <img src={ thumbnail } alt={ title } />
            </div>
          ))}
          <p data-testid="shopping-cart-product-quantity">{ products.length }</p>
        </div>
      )
      : (<p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>);
  }

  render() {
    return (
      <section>
        { this.renderProducts() }
      </section>
    );
  }
}

ShoppingCart.propTypes = {
  cartProducts: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

export default ShoppingCart;
