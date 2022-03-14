import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Product extends React.Component {
  render() {
    const { title, image, price, id, addCart } = this.props;
    return (
      <>
        <Link to={ `/product/${id}` } data-testid="product-detail-link">
          <div data-testid="product">
            <h3>{title}</h3>
            <img src={ image } alt={ title } />
            <p>{price}</p>
          </div>
        </Link>
        <button
          type="button"
          data-testid="product-add-to-cart"
          name={ id }
          onClick={ addCart }
        >
          Comprar
        </button>
      </>
    );
  }
}

Product.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  addCart: PropTypes.func.isRequired,
};

export default Product;
