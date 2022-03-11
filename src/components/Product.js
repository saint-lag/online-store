import React from 'react';
import PropTypes from 'prop-types';

class Product extends React.Component {
  render() {
    const { title, image, price } = this.props;
    return (
      <div data-testid="product">
        <h3>{title}</h3>
        <img src={ image } alt={ title } />
        <p>{price}</p>
      </div>
    );
  }
}

Product.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
};

export default Product;
