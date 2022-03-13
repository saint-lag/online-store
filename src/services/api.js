export async function getCategories() {
  const url = 'https://api.mercadolibre.com/sites/MLB/categories';
  const response = await fetch(url);
  const categories = await response.json();
  return categories;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  if (categoryId) {
    const urlCategory = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`;
    const responseCategory = await fetch(urlCategory);
    const dataCategory = await responseCategory.json();
    return dataCategory;
  }
  const urlQuery = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
  const responseQuery = await fetch(urlQuery);
  const dataQuery = await responseQuery.json();
  return dataQuery;
}

export async function getProductsFromId(id) {
  const url = `https://api.mercadolibre.com/items/${id}`;
  const response = await fetch(url);
  const dataId = await response.json();
  return dataId;
}
