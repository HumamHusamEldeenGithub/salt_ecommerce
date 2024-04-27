const MAX_PRODUCTS_PER_ITERATION = 6;

// Sample products data
let products = [
  { id: 1, name: "T-shirt", price: 20 },
  { id: 2, name: "Jeans", price: 30 },
  { id: 3, name: "Hoodie", price: 40 },
  { id: 4, name: "Sneakers", price: 50 },
  { id: 5, name: "Dress", price: 60 },
  { id: 6, name: "Jacket", price: 70 },
  { id: 7, name: "Skirt", price: 25 },
  { id: 8, name: "Polo Shirt", price: 35 },
  { id: 9, name: "Sweatpants", price: 45 },
  { id: 10, name: "Blouse", price: 30 },
  { id: 11, name: "Suit", price: 100 },
  { id: 12, name: "Leggings", price: 25 },
  { id: 13, name: "Cardigan", price: 40 },
  { id: 14, name: "Shorts", price: 30 },
  { id: 15, name: "Tank Top", price: 15 },
  { id: 16, name: "Tie", price: 20 },
  { id: 17, name: "Coat", price: 90 },
  { id: 18, name: "Sweater", price: 50 },
  { id: 19, name: "Romper", price: 35 },
  { id: 20, name: "Vest", price: 30 },
];

function createProductCard(product) {
  return `
  <div class="card product-card ${product.classes}" data-product-id="${product.id}" 
  onclick="window.location.href='product?product_id=${product.id}'">
    <img class="product-card-image" src="${product.image}" alt="Product Image">
    <div class="card-body">
      <h5 class="card-title">${product.name}</h5>
      <p class="card-text">$${product.price.sellingPrice}</p>
      <button class="btn btn-outline-dark" onclick="addToCart(event,${product.id})">Add to Cart</button>
    </div>
  </div>
`;
}

function displayBestSellerProducts() {
  const productsContainer = document.getElementById("best-seller");
  if (!productsContainer) return;
  var displayedProducts =
    productsContainer.children.length + MAX_PRODUCTS_PER_ITERATION;
  productsContainer.innerHTML = "";

  for (
    var i = 0;
    i < displayedProducts && i < trendyolProducts.data.contents.length;
    i++
  ) {
    var product = trendyolProducts.data.contents[i];
    const card = document.createElement("div");
    card.classList.add("col-md-4");

    const cardHtml = createProductCard({
      ...product,
      classes: "product-slider-card",
    });

    card.innerHTML = cardHtml;
    productsContainer.appendChild(card);
  }
}

function displayProducts() {
  const productsContainer = document.getElementById("products");
  if (!productsContainer) return;
  var displayedProducts =
    productsContainer.children.length + MAX_PRODUCTS_PER_ITERATION;
  productsContainer.innerHTML = "";

  for (
    var i = 0;
    i < displayedProducts && i < trendyolProducts.data.contents.length;
    i++
  ) {
    const product = trendyolProducts.data.contents[i];
    const card = document.createElement("div");
    card.classList.add("col-md-4");

    const cardHtml = createProductCard(product);

    card.innerHTML = cardHtml;
    productsContainer.appendChild(card);
  }
}

function addToCart(event, productId) {
  event.stopPropagation();
  var cartProducts = getCartProducts();

  const product = trendyolProducts.data.contents.find(
    (product) => product.id == productId
  );

  cartProducts.push({
    id: product.id,
    name: product.name,
    price: product.price.sellingPrice,
    image: product.image,
    size: getSelectedSize(),
  });

  setCartProducts(cartProducts);

  console.log(`Product with ID ${productId} added to cart.`);

  showAlert(`<b>${product.name}</b> has been added to cart`);

  try {
    renderCart();
  } catch (err) {}
}

function getSelectedSize() {
  var selectedSize = "S"; // default size
  var sizeOptions = document.querySelectorAll('.form-check-input');
  for (var i = 0; i < sizeOptions.length; i++) {
    if (sizeOptions[i].checked) {
      selectedSize = sizeOptions[i].value;
    }
  }
  return selectedSize;
}

function setCartProducts(products) {
  var jsonProducts = JSON.stringify(products);
  var encodedProducts = encodeURIComponent(jsonProducts);
  document.cookie = "cartProducts=" + encodedProducts + ";path=/";

  displayCartCounter();
}

function getCartProducts() {
  var name = "cartProducts=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var cookieArray = decodedCookie.split(";");
  for (var i = 0; i < cookieArray.length; i++) {
    var cookie = cookieArray[i];
    while (cookie.charAt(0) == " ") {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(name) == 0) {
      var jsonProducts = cookie.substring(name.length, cookie.length);
      return JSON.parse(jsonProducts);
    }
  }
  return [];
}

function getCartTotalPrice() {
  const products = getCartProducts();
  var totalPrice = 0;
  for (var i = 0; i < products.length; i++) {
    totalPrice += products[i].price;
  }
  return totalPrice.toFixed(2);
}

function clearCart(){
  setCartProducts([]);
}

function showMore() {
  displayProducts();
}

async function displayCartCounter() {
  const cartProducts = getCartProducts();
  while (document.getElementById("cart-counter") === null) {
    await delay(100);
  }
  const cartCounter = document.getElementById("cart-counter");
  cartCounter.innerHTML = cartProducts.length;
}

const productContainers = [
  ...document.querySelectorAll(".best-seller-product-container"),
];
const nxtBtn = [...document.querySelectorAll(".nxt-btn")];
const preBtn = [...document.querySelectorAll(".pre-btn")];

productContainers.forEach((item, i) => {
  let containerDimensions = item.getBoundingClientRect();
  let containerWidth = containerDimensions.width;

  nxtBtn[i].addEventListener("click", () => {
    item.scrollLeft += containerWidth;
  });

  preBtn[i].addEventListener("click", () => {
    item.scrollLeft -= containerWidth;
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const shopNowBtn = document.getElementById("shop-now-btn");
  if (!shopNowBtn) return;

  const shopSection = document.getElementById("feature-products-section");

  shopNowBtn.addEventListener("click", function () {
    shopSection.scrollIntoView({ behavior: "smooth" });
  });
});

function showAlert(alertMsg) {
  const alertElement = document.getElementById("alert-element");
  alertElement.innerHTML = alertMsg;
  alertElement.classList.remove("display-none");

  setTimeout(() => alertElement.classList.add("display-none"), 2500);
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

displayBestSellerProducts();
displayProducts();
displayCartCounter();
