import React from 'react';
import { getCategories } from '../services/api';

class Categories extends React.Component {
  constructor() {
    super();
    this.state = {
      categories: null,
    };
    this.createCategories = this.createCategories.bind(this);
  }

  async componentDidMount() {
    this.setState({
      categories: await getCategories().then((categories) => (categories)),
    });
  }

  createCategories() {
    const { categories } = this.state;
    categories.map((category) => category.name).forEach((categoryName) => {
      const categoryElDiv = document.createElement('div');
      const categoryElBtn = document.createElement('button');
      const categoryElLabel = document.createElement('label');

      categoryElBtn.outerHTML = `<button id=${categoryName}Btn type="radio" >`;
      categoryElLabel.outerHTML = `<label htmlFor=${categoryName}
      Btn data-testid="category" ></label>`;
      categoryElLabel.innerText = categoryName;

      document.categoryElDiv.appendChild(categoryElBtn);
      document.categoryElDiv.appendChild(categoryElLabel);
      document.getElementById('main-nav').appendChild(categoryElDiv);
    });
  }

  render() {
    const { categories } = this.state;
    const { createCategories } = this;
    return (
      <nav id="main-nav">{categories && createCategories}</nav>
    );
  }
}

export default Categories;
