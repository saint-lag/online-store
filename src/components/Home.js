import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Product from './Product';
import Categories from './Categories';
import * as api from '../services/api';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      search: '',
      products: [],
      id: '',
    };
    this.handleChangeBtn = this.handleChangeBtn.bind(this);
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.renderProduct = this.renderProduct.bind(this);
  }

  async handleClick() {
    const { search, id } = this.state;
    const products = await api.getProductsFromCategoryAndQuery(id, search);
    this.setState({ products });
  }

  async handleChangeBtn({ target: { id } }) {
    this.setState({ id });
    const products = await api.getProductsFromCategoryAndQuery(id);
    this.setState({ products });
  }

  async handleChangeInput({ target: { value } }) {
    this.setState({ search: value });
  }

  renderProduct() {
    const { products } = this.state;
    const { addCart } = this.props;
    return (products.length !== 0)
      ? (products.results.map(({ title, thumbnail, price, id }) => (
        <Product
          key={ id }
          title={ title }
          image={ thumbnail }
          price={ price }
          id={ id }
          addCart={ addCart }
        />
      )))
      : (<p>Nenhum produto foi encontrado</p>);
  }

  render() {
    const { search } = this.state;
    const { handleChangeBtn, handleChangeInput, handleClick, renderProduct } = this;
    return (
      <main>
        <input type="text" />
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        <input
          type="text"
          data-testid="query-input"
          value={ search }
          onChange={ handleChangeInput }
        />
        <button
          type="button"
          data-testid="query-button"
          onClick={ handleClick }
        >
          Pesquisar
        </button>
        <Link to="/shopping-cart" data-testid="shopping-cart-button">
          <button type="button">Carrinho</button>
        </Link>
        <Categories onClick={ handleChangeBtn } />
        {renderProduct()}
      </main>
    );
  }
}

Home.propTypes = {
  addCart: PropTypes.func.isRequired,
};

export default Home;
