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
    this.increaseQuantity = this.increaseQuantity.bind(this);
    this.decreaseQuantity = this.decreaseQuantity.bind(this);
    this.emptyQuantity = this.emptyQuantity.bind(this);
  }

  componentDidMount() {
    this.displayProduct();
  }

  async displayProduct() {
    const { cartProducts } = this.props;
    const { products } = this.state;
    const setProducts = [...new Set(cartProducts)];
    for (let index = 0; index < setProducts.length; index += 1) {
      products.push(api.getProductsFromId(setProducts[index]));
    }
    const newProducts = await Promise.all(products);
    this.setState({ products: newProducts });
  }

  increaseQuantity({ target: { name } }) {
    const { updateCart, cartProducts } = this.props;
    const moreProducts = [...cartProducts, name];
    updateCart(moreProducts);
  }

  decreaseQuantity({ target: { name } }) {
    const { updateCart, cartProducts } = this.props;
    const { products } = this.state;
    const index = cartProducts.indexOf(name);
    if (index >= 0) {
      cartProducts.splice(index, 1);
      updateCart(cartProducts);
    }
    const i = products.map(({ id }) => id).indexOf(name);
    if (i >= 0) {
      products.splice(i, 1);
    }
    this.setState({ products });
  }

  emptyQuantity({ target: { name } }) {
    const { updateCart, cartProducts } = this.props;
    const { products } = this.state;
    const removeProducts = cartProducts.filter((e) => e !== name);
    updateCart(removeProducts);
    this.setState({ products: products.filter(({ id }) => id !== name) });
  }

  renderProducts() {
    const { products } = this.state;
    const { cartProducts } = this.props;
    return (products.length > 0)
      ? (
        <div>
          {products.map(({ title, thumbnail, id }) => {
            const filterProducts = cartProducts.filter((e) => e === id);
            if (filterProducts.length > 0) {
              return (
                <div key={ title }>
                  <h2 data-testid="shopping-cart-product-name">{ title }</h2>
                  <img src={ thumbnail } alt={ title } />
                  <p
                    data-testid="shopping-cart-product-quantity"
                  >
                    { filterProducts.length }

                  </p>
                  <button
                    type="button"
                    name={ id }
                    onClick={ this.emptyQuantity }
                    data-testid="product-decrease-quantity"
                  >
                    X

                  </button>
                  <button
                    type="button"
                    data-testid="product-increase-quantity"
                    name={ id }
                    onClick={ this.increaseQuantity }
                  >
                    +

                  </button>
                  <button
                    type="button"
                    data-testid="product-decrease-quantity"
                    name={ id }
                    onClick={ this.decreaseQuantity }
                  >
                    -

                  </button>
                </div>
              );
            }
          })}
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
  updateCart: PropTypes.func.isRequired,
};

export default ShoppingCart;
