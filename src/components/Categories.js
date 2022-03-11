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

  tagNamefyer(str) {
    const splitted = str.split(' ');
    return splitted.map((word) => word.toLowerCase()).join('-');
  }

  createCategories() {
    const { categories } = this.state;
    const mainNavChildren = [];
    categories.forEach((categoryName) => {
      const tagName = this.tagNamefyer(categoryName);
      const categoryElBtn = React.createElement('button', {
        type: 'button',
        id: `${tagName}-btn`,
        key: `${tagName}-btn`,
      });
      const categoryElLabel = React.createElement(
        'label',
        {
          key: `${tagName}-label`,
          htmlFor: `${tagName}-btn`,
          'data-testid': 'category',
        },
        categoryName,
      );
      const categoryElDiv = React.createElement(
        'div',
        { className: 'category-div', id: tagName, key: `${tagName}-div` },
        categoryElBtn,
        categoryElLabel,
      );

      mainNavChildren.push(categoryElDiv);
    });
    const mainNav = React.createElement(
      'nav',
      { id: 'main-nav' },
      mainNavChildren,
    );
    return mainNav;
  }

  render() {
    const { categories } = this.state;
    const { createCategories } = this;
    return categories && createCategories();
  }
}

export default Categories;
