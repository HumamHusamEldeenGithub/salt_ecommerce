function createSummeryItem(product) {
  return `    
      <li class="list-group-item" style="cursor:pointer;" onclick="openProductPage(${product.id})">
      <div class="row">
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
          class="col-md-9 col-sm col-12 d-flex flex-column justify-content-center"
        >
          <h5 class="card-title">
          ${product.name}
          </h5>

        </div>
        <div
          class="col-md col-sm col-12 d-flex justify-content-center align-items-center"
        >
        <p class="card-text"><b>$${product.price}</b></p>
        </div>
      </div>
    </li>
  `;
}

function createSummeryItems() {
  return getCartProducts().map(createSummeryItem).join("");
}
function renderOrderSummary() {
  const checkoutSummeryItemsContainer = document.getElementById(
    "checkout-summary-ul"
  );
  const checkoutSummeryTotalPrice = document.getElementById(
    "summery-total-price"
  );
  const checkoutSummeryItems = createSummeryItems();

  checkoutSummeryItemsContainer.innerHTML = checkoutSummeryItems;
  checkoutSummeryTotalPrice.innerHTML = getCartTotalPrice();
}

function renderCheckout() {
  renderOrderSummary();
}

function showErrorAlert(inputName) {
  const errorAlert = document.getElementById("errorAlert");
  errorAlert.style.display = "block";
  errorAlert.innerHTML = `Please fill in all required fields. Invalid ${inputName}`;
  return false;
}

function checkFormValues() {
  const name = document.getElementById("name").value;
  if (name.trim() === "") {
    return showErrorAlert("Name");
  }
  const address = document.getElementById("address").value;
  if (address.trim() === "") {
    return showErrorAlert("Address");
  }
  const payment = document.getElementById("payment").value;
  if (payment.trim() === "" || payment.trim() === "Select Payment Method") {
    return showErrorAlert("Payment");
  }
  const card = document.getElementById("card").value;
  if (card.trim() === "") {
    return showErrorAlert("Card");
  }
  const expiry = document.getElementById("expiry").value;
  if (expiry.trim() === "") {
    return showErrorAlert("Expiry Date");
  }
  const cvv = document.getElementById("cvv").value;
  if (cvv.trim() === "") {
    return showErrorAlert("CVV");
  }
}

function handleSubmit(event) {
  document.getElementById("errorAlert").style.display = "none";
  event.preventDefault();
  
  if (checkFormValues() === false) return;
  
  clearCart();

  var myModal = document.getElementById('confirmation-modal');
  var modalInstance = new bootstrap.Modal(myModal);
  modalInstance.show();
}

renderCheckout();
document
  .getElementById("checkoutForm")
  .addEventListener("submit", handleSubmit);
