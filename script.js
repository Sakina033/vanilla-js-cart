import { CartService } from "./CartService.js"
import { showToast } from "./Toast.js"

const cartService = new CartService();
const productsContainer = document.querySelector(".products-container");
const cartIconContainer = document.querySelector(".cart-container");


cartIconContainer.addEventListener("click", () => {
  window.location.href = "cart.html";
});

function createCardHTML(product) {
  return `
    <div class="product-card" data-id="${product.id}">
      <span class="product-decor"></span>
      <div class="info-block">
        <div class="card-image-block">
          <img src="${product.image || "https://via.placeholder.com/150"}" alt="${product.title}" class="cart-image" />
        </div>

        <div class="card-info-block">
          <div class="title-block">
            <h3>${product.title}</h3>
            <p class="product-price">$${product.price}</p>
          </div>
          <span class="product-desc">${product.description}</span>
          <button class="add" type="button" data-id="${product.id}">Купить</button>
        </div>
      </div>
    </div>
  `;
}

async function init() {
  try {
    const res = await fetch("./data.json");
    const products = await res.json();

    productsContainer.innerHTML = products.map(createCardHTML).join("");
    window.allProducts = products;
  } catch (error) {
    console.error("Ошибка загрузки товаров:", error);
    productsContainer.innerHTML = "<p>Не удалось загрузить товары :(</p>";
  }
}

productsContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("add")) {
    const id = Number(event.target.dataset.id);
    if (!window.allProducts) return;
    
    const product = window.allProducts.find((p) => p.id === id);

    if (product) {
      cartService.add(product);
      showToast(`"${product.title}" добавлен в корзину!`);
    }
  }
})

init();