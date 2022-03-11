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
      categories: await getCategories()
        .then((categories) => categories
          .map((category) => category.name)),
    });
  }

  cssNamefyer(str) {
    const splitted = str.split(' ');
    return splitted.map((word) => word
      .toLowerCase()).join('-');
  }

  createCategories() {
    const { categories } = this.state;
    const mainNavChildren = [];
    categories.forEach((categoryName) => {
      const categoryElBtn = React.createElement('button',
        { type: 'button', id: `${this.cssNamefyer(categoryName)}-btn` });
      const categoryElLabel = React.createElement('label',
        { htmlFor: `${this.cssNamefyer(categoryName)}-btn`,
          'data-testid': 'category' },
        categoryName);
      const categoryElDiv = React.createElement('div',
        { className: 'category-div', id: this.cssNamefyer(categoryName) },
        categoryElBtn, categoryElLabel);

      mainNavChildren.push(categoryElDiv);
    });
    const mainNav = React.createElement('nav', { id: 'main-nav' }, mainNavChildren);
    return mainNav;
  }

  render() {
    const { categories } = this.state;
    const { createCategories } = this;
    return (
      categories && createCategories()
    );
  }
}

export default Categories;
