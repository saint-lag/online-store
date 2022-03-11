import React from 'react';
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
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.renderProduct = this.renderProduct.bind(this);
  }

  async handleClick() {
    const { search, id } = this.state;
    const products = await api.getProductsFromCategoryAndQuery(id, search);
    this.setState({ products });
  }

  async handleChange({ target: { value, id } }) {
    this.setState({ search: value, id });
    const products = await api.getProductsFromCategoryAndQuery(id, '');
    this.setState({ products });
  }

  renderProduct() {
    const { products } = this.state;
    return (products.length !== 0)
      ? (products.results.map(({ title, thumbnail, price }) => (
        <Product key={ title } title={ title } image={ thumbnail } price={ price } />
      )))
      : (<p>Nenhum produto foi encontrado</p>);
  }

  render() {
    const { search } = this.state;
    const { handleChange, handleClick, renderProduct } = this;
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
          onChange={ handleChange }
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
        <Categories onClick={ handleChange } />
        {renderProduct()}
      </main>
    );
  }
}

export default Home;
