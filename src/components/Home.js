import React from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../services/api';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    this.showCategories();
  }

  showCategories = async () => {
    const category = await getCategories();
    this.setState({ categories: category });
  }

  render() {
    const { categories } = this.state;
    return (
      <main>
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
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
      </main>
    );
  }
}

export default Home;
