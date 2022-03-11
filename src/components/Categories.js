import React from 'react';
import PropTypes from 'prop-types';
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
    this.setState({ categories: await getCategories() });
  }

  tagNamefyer(str) {
    const splitted = str.split(' ');
    return splitted.map((word) => word.toLowerCase()).join('-');
  }

  createCategories() {
    const { categories } = this.state;
    const mainNavChildren = [];
    const { onClick } = this.props;
    categories.forEach((category) => {
      const { name, id } = category;
      const tagName = this.tagNamefyer(name);
      const categoryElBtn = React.createElement('button', {
        type: 'button',
        id,
        key: `${tagName}-btn`,
        onClick,
      });
      const categoryElLabel = React.createElement(
        'label',
        {
          key: `${tagName}-label`,
          htmlFor: id,
          'data-testid': 'category',
        },
        name,
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

Categories.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Categories;
