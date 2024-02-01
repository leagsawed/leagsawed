const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');
if (id != null) {
  let itemPrice = 0; // "let" permet de réassigner la valeur
  let imgUrl, altText, articleName;
}

fetch(`http://localhost:3000/api/products/${id}`)
  .then((response) => response.json())
  .then((res) => handleData(res));

// altTxt: "Photo d'un canapé rose, une à deux place";
// colors: (2)[('Pink', 'White')];
// description: 'Donec mattis nisl tortor, nec blandit sapien fermentum at. Proin hendrerit efficitur fringilla. Lorem ipsum dolor sit amet.';
// imageUrl: 'http://localhost:3000/images/kanap04.jpeg';
// name: 'Kanap Autonoé';
// price: 1499;
// _id: 'a557292fe5814ea2b15c6ef4bd73ed83';

function handleData(canap) {
  const { altTxt, colors, description, imageUrl, name, price } = canap; //crée une const pour chaque élément du array
  itemPrice = price; // on récupère le prix de l'objet canap et on réassigne le prix à la variable "let itemPrice" plus haut
  imgUrl = imageUrl;
  altText = altTxt;
  articleName = name;
  makeImageDiv(imageUrl, altTxt);
  makeTitle(name);
  makePrice(price);
  makeCartContent(description);
  makeColors(colors);
}

function makeImageDiv(imageUrl, altTxt) {
  const image = document.createElement('img');
  image.src = imageUrl;
  image.alt = altTxt;
  const parent = document.querySelector('.item__img');
  if (parent != null) parent.appendChild(image);
}

function makeTitle(name) {
  const h1 = document.querySelector('#title');
  if (h1 != null) h1.textContent = name;
}

function makePrice(price) {
  const span = document.querySelector('#price');
  if (span != null) span.textContent = price;
}

function makeCartContent(description) {
  const p = document.querySelector('#description');
  if (p != null) p.textContent = description;
}

function makeColors(colors) {
  const select = document.querySelector('#colors');
  if (select != null) {
    colors.forEach((color) => {
      const option = document.createElement('option'); // crée une balise html <option></option>
      option.value = color; // <option value=black></option>;
      option.textContent = color;
      console.log(option);
      select.appendChild(option);
    });
  }
}

const button = document.querySelector('#addToCart');
button.addEventListener('click', handleClick);

function handleClick() {
  const color = document.querySelector('#colors').value;
  const quantity = document.querySelector('#quantity').value;

  if (isOrderInvalid(color, quantity)) return;
  saveCart(color, quantity);
  redirectToCart();
}

function saveCart(color, quantity) {
  const data = {
    id: id,
    color: color,
    quantity: Number(quantity),
    price: itemPrice,
    imageUrl: imgUrl,
    altTxt: altText,
    name: articleName,
  };
  localStorage.setItem(id, JSON.stringify(data));
}

function isOrderInvalid(color, quantity) {
  if (color == null || color === '' || quantity == null || quantity == 0) {
    alert('Please select a color and quantity');
    return true;
  }
}

function redirectToCart() {
  window.location.href = 'cart.html';
}
