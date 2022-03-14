import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductsFromId } from '../services/api';

class ProductDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      title: '',
      image: '',
      price: '',
    };
    this.getDetails = this.getDetails.bind(this);
  }

  componentDidMount() {
    this.getDetails();
  }

  async getDetails() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const details = await getProductsFromId(id);
    const { title, thumbnail: image, price } = details;
    this.setState({ title, image, price });
  }

  render() {
    const { title, image, price } = this.state;
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const { addCart } = this.props;
    return (
      <section className="product-details-section">
        <div>
          <h2 data-testid="product-detail-name">{title}</h2>
          <img src={ image } alt={ title } />
          <p>{price}</p>
          <button
            type="button"
            data-testid="product-detail-add-to-cart"
            name={ id }
            onClick={ addCart }
          >
            Add
          </button>
        </div>
        <Link to="/shopping-cart" data-testid="shopping-cart-button">
          <button type="button">Carrinho</button>
        </Link>
      </section>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  addCart: PropTypes.func.isRequired,
};

export default ProductDetails;
