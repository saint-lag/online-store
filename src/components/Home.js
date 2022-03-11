import React from 'react';
// import Categories from './Categories';
import './styles/home.css';

class Home extends React.Component {
  render() {
    return (
      <main>
        {/* <Categories /> */}
        <input type="text" />
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
      </main>
    );
  }
}

export default Home;
