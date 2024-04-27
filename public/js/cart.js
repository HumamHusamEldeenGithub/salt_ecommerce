function renderCart() {
  const cartItems = getCartProducts();

  const cartElements = createCartItems();
  const cartContianer = document.getElementById("cartContianer");

  cartContianer.innerHTML =
    cartItems.length !== 0
      ? `
      <div class="d-flex justify-content-between align-items-center">
        <h2>Your cart</h2>
        <h6>Cart items : <span id="total-items-count">${cartItems.length}</span></h6>
      </div>
      <div class="row">
        <ul id="cart-list-container" class="list-group">${cartElements}</ul>
      </div>
      <div class="d-flex flex-column align-items-end pt-5">
        <h5>Total Price = $ <span id="total-price">${getCartTotalPrice()}</span></h5>
        <button class="btn btn-outline-dark mt-3 d-flex align-items-center" onclick="window.location.href='./checkout'">
        <i class="bi bi-cart"></i> Checkout</button>
      </div>`
      : 
      `<div class="d-flex flex-column justify-content-center text-center">
      <h2>Your cart is empty<br/>Start browsing our products!</h2>
      </div>
      <div class="d-flex justify-content-center pt-3">
      <button class="btn btn-outline-dark " onclick="window.location.href='./products'">Go To Products Page</button>
      </div>`;
}

function createCartItem(product) {
  return `    
    <li class="list-group-item" style="cursor:pointer;" onclick="openProductPage(${product.id})">
    <div class="row">
    <div
    class="d-sm-none d-flex justify-content-end justify-content-end align-items-center"
  >
    <button
      class="btn btn-outline-dark"
      onclick="removeFromCart(event,${product.id})"
    >
      X
    </button>
  </div>
      <div
        class="col-md-2 col-sm-3 col-12 d-flex justify-content-center"
      >
        <img
          class="cart-product-image"
          src="${product.image}"
          alt="Product Image"
        />
      </div>
      <div
        class="col-md-5 col-sm col-12 d-flex flex-column justify-content-center text-center"
      >
        <h5 class="card-title">
        ${product.name}
        </h5>
        <p class="card-text py-3"><strong>$${product.price}</strong></p>
      </div>
      <div class="col-md col-sm col-12 d-flex justify-content-center align-items-center py-3">
        <p class="card-text"><strong>Size:</strong>  <span class="size-label">${product.size}</span></p>
      </div>
      <div
        class="col-md col-sm col-12 d-none d-sm-flex justify-content-center justify-content-md-end justify-content-end align-items-center"
      >
        <button
          class="btn btn-outline-dark"
          onclick="removeFromCart(event,${product.id})"
        >
          X
        </button>
      </div>
    </div>
  </li>
`;
}

function createCartItems() {
  return getCartProducts().map(createCartItem).join("");
}

function removeFromCart(event, productID) {
  event.stopPropagation();
  const cartItems = getCartProducts();

  const index = cartItems.findIndex((product) => product.id == productID);
  cartItems.splice(index, 1);

  setCartProducts(cartItems);
  renderCart();
}

function openProductPage(productId) {
  window.location.href = `product?product_id=${productId}`;
}

renderCart();
