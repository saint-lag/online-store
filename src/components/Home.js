import React from 'react';
import './styles/home.css';
import Categories from './Categories';

class Home extends React.Component {
  render() {
    return (
      <main>
        <input type="text" />
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        <Categories />
      </main>
    );
  }
}

export default Home;
