// ================= CART SYSTEM =================
document.addEventListener("DOMContentLoaded", () => {
  const cartItems = document.querySelectorAll(".cart-item");
  const subtotalElement = document.querySelector(".subtotal-price");
  const totalElement = document.querySelector(".final-total");

  // ===== CART LOGIC =====
  if (cartItems.length > 0 && subtotalElement && totalElement) {
    function updateCartTotal() {
      let subtotal = 0;

      cartItems.forEach((item) => {
        const totalPrice = item.querySelector(".total-price");

        if (!totalPrice) return;

        let itemTotal = parseFloat(totalPrice.textContent.replace("$", ""));
        subtotal += itemTotal;
      });

      subtotalElement.textContent = "$" + subtotal;
      totalElement.textContent = "$" + subtotal;
    }

    cartItems.forEach((item) => {
      const minusBtn = item.querySelector(".quantity button:first-child");
      const plusBtn = item.querySelector(".quantity button:last-child");
      const quantitySpan = item.querySelector(".quantity span");
      const totalPrice = item.querySelector(".total-price");

      const basePrice = parseFloat(item.dataset.price);

      let quantity = 1;

      if (!minusBtn || !plusBtn || !quantitySpan || !totalPrice) return;

      function updateItem() {
        let total = basePrice * quantity;

        quantitySpan.textContent = quantity;
        totalPrice.textContent = "$" + total;

        updateCartTotal();
      }

      plusBtn.addEventListener("click", () => {
        quantity++;
        updateItem();
      });

      minusBtn.addEventListener("click", () => {
        if (quantity > 1) {
          quantity--;
          updateItem();
        }
      });
    });

    updateCartTotal();
  }

  // ================= LOGIN UI SYSTEM =================

  const isLoggedIn = localStorage.getItem("user") === "loggedIn";

  const loginBtns = document.querySelectorAll(".login-btn");
  const userIcons = document.getElementById("userIcons");
  const logoutBtn = document.getElementById("logoutBtn");

  function updateUI() {
    if (isLoggedIn) {
      loginBtns.forEach((btn) => (btn.style.display = "none"));

      if (userIcons) userIcons.style.display = "flex";
      if (logoutBtn) logoutBtn.style.display = "inline-block";
    } else {
      loginBtns.forEach((btn) => (btn.style.display = "inline-block"));

      if (userIcons) userIcons.style.display = "none";
      if (logoutBtn) logoutBtn.style.display = "none";
    }
  }

  updateUI();

  // ================= LOGOUT =================

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("user");
      location.reload();
    });
  }

  // ================= TOAST SYSTEM =================

  const cartButtons = document.querySelectorAll(".add-cart-btn");
  const toast = document.getElementById("toast");

  if (cartButtons.length > 0 && toast) {
    cartButtons.forEach((button) => {
      button.addEventListener("click", () => {
        toast.style.opacity = "1";

        setTimeout(() => {
          toast.style.opacity = "0";
        }, 2000);
      });
    });
  }
  // ================= CHECKOUT SUCCESS MESSAGE =================

  const placeOrderBtn = document.querySelector(".place-order-btn");

  if (placeOrderBtn) {
    placeOrderBtn.addEventListener("click", (e) => {
      e.preventDefault();

      const message = document.createElement("div");

      message.classList.add("success-toast");

      message.innerHTML = `
      <span>✔</span>
      Order placed successfully!
    `;

      document.body.appendChild(message);

      setTimeout(() => {
        message.classList.add("show");
      }, 100);

      setTimeout(() => {
        message.classList.remove("show");

        setTimeout(() => {
          message.remove();
        }, 300);
      }, 3000);
    });
  }

  // ================= BUY NOW SYSTEM =================

  const buyNowButtons = document.querySelectorAll(".buy-now-btn");

  buyNowButtons.forEach((button) => {
    button.addEventListener("click", () => {
      window.location.href = "../../Pages/payment/checkout.html";
    });
  });
});

const checkoutBtn = document.querySelector(".checkout-btn");

if (checkoutBtn) {
  checkoutBtn.addEventListener("click", () => {
    window.location.href = "../../Pages/payment/checkout.html";
  });
}
