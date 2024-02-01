const cart = [];

retrieveItemsFromCache();

cart.forEach((item) => displayItem(item));

// altTxt: "Photo d'un canapé rouge, deux places";
// color: 'Silver';
// id: '034707184e8e4eefb46400b5a3774b5f';
// imageUrl: 'http://localhost:3000/images/kanap07.jpeg';
// price: 1999;
// quantity: 2;
// name: "canapé";

function retrieveItemsFromCache() {
  const numberOfItems = localStorage.length;
  for (let i = 0; i < numberOfItems; i++) {
    const item = localStorage.getItem(localStorage.key(i)) || '';
    const itemObject = JSON.parse(item);
    cart.push(itemObject);
  }
}

function displayItem(item) {
  const article = makeArticle(item);
  const imageDiv = makeImageDiv(item);
  article.appendChild(imageDiv);

  const cartItemContent = makeCartContent(item);
  article.appendChild(cartItemContent);

  displayArticle(article);
  displayTotalQuantity(item);
}

function displayTotalQuantity(item) {
  const totalQuantity = document.querySelector('#totalQuantity');
  totalQuantity.textContent = item.quantity;
}

function makeCartContent(item) {
  const cartItemContent = document.createElement('div');
  cartItemContent.classList.add('cart__item__content');

  const description = makeDescription(item);
  const settings = makeSettings(item);

  cartItemContent.appendChild(description);
  cartItemContent.appendChild(settings);
  return cartItemContent;
}

function makeSettings(item) {
  const settings = document.createElement('div');
  settings.classList.add('cart__item__content__settings');

  addQuantityToSettings(settings, item);
  addDeleteToSettings(settings);
  return settings;
}

function addDeleteToSettings(settings) {
  const div = document.createElement('div');
  div.classList.add('cart__item__content__settings__delete');
  const p = document.createElement('p');
  p.textContent = 'Supprimer';
  p.classList.add('deleteItem');
  div.appendChild(p);
  settings.appendChild(div);
}

function addQuantityToSettings(settings, item) {
  const quantity = document.createElement('div');
  quantity.classList.add('cart__item__content__settings__quantity');
  const p = document.createElement('p');
  p.textContent = 'Qté :';
  quantity.appendChild(p);

  const input = document.createElement('input');
  input.type = 'number';
  input.classList.add('itemQuantity');
  input.name = 'itemQuantity';
  input.min = '1';
  input.max = '100';
  input.value = item.quantity;
  quantity.appendChild(input);
  settings.appendChild(quantity);
}

function makeDescription(item) {
  const description = document.createElement('div');
  description.classList.add('cart__item__content__description');

  const h2 = document.createElement('h2');
  h2.textContent = item.name;
  const p = document.createElement('p');
  p.textContent = item.color;
  const p2 = document.createElement('p');
  p2.textContent = item.price + ' €';

  description.appendChild(h2);
  description.appendChild(p);
  description.appendChild(p2);
  return description;
}

function displayArticle(article) {
  document.querySelector('#cart__items').appendChild(article);
}

function makeArticle(item) {
  const article = document.createElement('article');
  article.classList.add('cart__item');
  article.dataset.id = item.id;
  article.dataset.color = item.color;
  return article;
}

function makeImageDiv(item) {
  const div = document.createElement('div'); // <div>
  div.classList.add('cart__item__img'); // <div class="cart__item__img">

  const image = document.createElement('img'); // <img></img>
  image.src = item.imageUrl; // <img src:..>
  image.alt = item.altTxt; // <img src:.. alt:..>
  div.appendChild(image);
  // <div class="cart__item__img">
  //     <img src:.. alt..> </img>
  // </div>
  return div;
}
