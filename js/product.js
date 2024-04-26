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
    <p><strong>Price:</strong> $${product.price.sellingPrice}</p>
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
