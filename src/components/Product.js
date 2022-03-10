import React from 'react';

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

export default Product;
