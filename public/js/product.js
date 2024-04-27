function createProductDesc(product) {
  return `            
  <div class="col-md-6 d-flex justify-content-center flex-align-center pb-5">
    <img
      src="${product.image}"
      alt="Product Image"
      class="product-desc-img "
    />
  </div>
  <div
    class="col-md-6 d-flex flex-column justify-content-center product-desc py-4 px-4"
  >
    <h2 class="mb-4">${product.name}</h2>
    <p class="lead">${product.promotions[0].name}
    </p>
    <h5>Price: $${product.price.sellingPrice}</h5>
  
    <div class="size-options">
      <strong>Size:</strong>
      <div class="size-option">
        <input class="form-check-input" type="radio" name="size" id="sizeS" value="S" checked>
        <label class="form-check-label size-label" for="sizeS">S</label>
      </div>
      <div class="size-option">
        <input class="form-check-input" type="radio" name="size" id="sizeM" value="M">
        <label class="form-check-label size-label" for="sizeM">M</label>
      </div>
      <div class="size-option">
        <input class="form-check-input" type="radio" name="size" id="sizeL" value="L">
        <label class="form-check-label size-label" for="sizeL">L</label>
      </div>
      <div class="size-option">
        <input class="form-check-input" type="radio" name="size" id="sizeXL" value="Xl">
        <label class="form-check-label size-label" for="sizeXL">XL</label>
      </div>
      <div class="size-option">
        <input class="form-check-input" type="radio" name="size" id="sizeXXL" value="XXL">
        <label class="form-check-label size-label" for="sizeXXL">XXL</label>
      </div>
    </div>
  

    <div class="mt-4">
      <button class="btn btn-outline-dark" onclick="addToCart(event,${product.id})">Add to Cart</button>
    </div>
  </div>
  </div>`;
}

function productRenderer() {
  const params = getQueryParams();
  const productID = params.product_id;

  const product = trendyolProducts.data.contents.find(
    (product) => product.id == productID
  );

  const productDesc = createProductDesc(product);
  const productContainer = document.getElementById("product-desc-div");

  productContainer.innerHTML = productDesc;
}

function getQueryParams() {
  const queryParams = {};
  const queryString = window.location.search.substring(1);
  const pairs = queryString.split("&");

  pairs.forEach((pair) => {
    const keyValue = pair.split("=");
    const key = decodeURIComponent(keyValue[0]);
    const value = decodeURIComponent(keyValue[1] || "");
    queryParams[key] = value;
  });

  return queryParams;
}

productRenderer();
