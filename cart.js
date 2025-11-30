import { CartService } from "./CartService.js"

const cartService = new CartService();
const cartItemsContainer = document.querySelector(".cart-items-container");
const totalPriceElement = document.getElementById("cart-total-price");
const clearCartBtn = document.querySelector(".clear-cart-button");

function renderCart() {
  const cart = cartService.getCart(); 

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
            <div class="empty-cart-message">
                <h3>Ваша корзина пуста 🌸</h3>
                <p>Самое время выбрать новое платье!</p>
                <a href="index.html" class="back-to-shop-btn">Вернуться к покупкам</a>
            </div>
        `;
    updateTotal();
    return;
  }

  cartItemsContainer.innerHTML = cart.map(product => `
    <div class="cart-item-card product-card">
      <div class="info-block">
        <div class="card-image-block">
          <img src="${product.image || "https://via.placeholder.com/150"}" alt="${product.title}" class="cart-image"/>
        </div>
                
        <div class="card-info-block">
          <div class="title-block">
            <h3>${product.title}</h3>
            <p class="product-price">$${product.price}</p>
          </div>
          <div class="card-info-footer">
            <span class="product-desc">${product.description}</span>
            <div class="cart-item-actions">
              <div class="quantity-control">
                <button class="quantity-btn minus" type="button" data-id="${product.id}">−</button>
                <input type="number" value="${product.quantity || 1}" min="1" class="item-quantity" readonly>
                <button class="quantity-btn plus" type="button" data-id="${product.id}">+</button>
              </div>
              <img src="./image/delete.svg" alt="Удалить" class="remove" data-id="${product.id}">
            </div>
          </div>
        </div>
      </div>
    </div>  
  `).join("");
  
  updateTotal();
}

function updateTotal() {
  const total = cartService.getTotal();
  totalPriceElement.textContent = `$${total}`;
}

cartItemsContainer.addEventListener("click", (e) => {
  const target = e.target;
  const id = Number(target.dataset.id);

  if (target.classList.contains("remove")) {
    cartService.remove(id);
    renderCart();
    return;
  }

  if (target.classList.contains("plus")) {
    cartService.changeQuantity(id, 1);
    renderCart();
    return;
  }

  if (target.classList.contains("minus")) {
    cartService.changeQuantity(id, -1);
    renderCart();
    return;
  }
});

if (clearCartBtn) {
  clearCartBtn.addEventListener("click", () => {
    cartService.clear();
    renderCart();
  });
}

renderCart();