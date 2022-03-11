import React from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../services/api';
import Product from './Product';
import * as api from '../services/api';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      search: '',
      products: [],
      categories: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.renderProduct = this.renderProduct.bind(this);
  }

  componentDidMount() {
    this.showCategories();
  }

  async handleClick() {
    const { search } = this.state;
    const products = await api.getProductsFromCategoryAndQuery(undefined, search);
    this.setState({ products });
  }

  handleChange({ target: { value } }) {
    this.setState({ search: value });
  }

  showCategories = async () => {
    const category = await getCategories();
    this.setState({ categories: category });
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
    const { search, categories } = this.state;
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
        <section>
          {categories.map((elem) => (
            <button type="submit" key={ elem.id } data-testid="category">
              { elem.name }
            </button>
          ))}
        </section>
        {renderProduct()}
      </main>
    );
  }
}

export default Home;
