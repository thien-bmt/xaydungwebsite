/**
 * Đặc Sản Tây Nguyên - Web Application Logic
 * Bao gồm: Render DOM, Tìm kiếm, Lọc danh mục, Giỏ hàng, Validation Form
 */

// ==========================================
// 1. Khởi tạo trạng thái ứng dụng (State)
// ==========================================
let cart = [];

// DOM Elements
const productListEl = document.querySelector("#product-list");
const emptyStateEl = document.querySelector("#empty-state");
const searchInputEl = document.querySelector("#search-input");
const clearSearchBtnEl = document.querySelector("#clear-search-btn");
const categoryFilterEl = document.querySelector("#category-filter");
const cartCountEl = document.querySelector("#cart-count");
const cartToggleBtnEl = document.querySelector("#cart-toggle-btn");
const orderCartItemsEl = document.querySelector("#order-cart-items");
const orderTotalPriceEl = document.querySelector("#order-total-price");
const orderFormEl = document.querySelector("#order-form");
const toastContainerEl = document.querySelector("#toast-container");

// Form inputs & error spans
const customerNameInput = document.querySelector("#customer-name");
const phoneInput = document.querySelector("#phone");
const addressInput = document.querySelector("#address");
const noteInput = document.querySelector("#note");

const errorCustomerName = document.querySelector("#error-customer-name");
const errorPhone = document.querySelector("#error-phone");
const errorAddress = document.querySelector("#error-address");

// ==========================================
// 2. Hàm hiển thị danh sách sản phẩm (DOM Render)
// ==========================================
function renderProducts(items) {
  if (!items || items.length === 0) {
    productListEl.innerHTML = "";
    emptyStateEl.classList.remove("hidden");
    return;
  }

  emptyStateEl.classList.add("hidden");
  productListEl.innerHTML = items.map(product => `
    <article class="product-card" id="product-${product.id}">
      <div class="card-img-wrapper">
        <img src="${product.image}" alt="${product.name}" loading="lazy">
        <span class="card-badge-category">${product.categoryName || product.category}</span>
        <span class="card-badge-stock ${product.stock > 10 ? 'in-stock' : 'low-stock'}">
          ${product.stock > 10 ? 'Còn hàng' : `Còn ${product.stock}`}
        </span>
      </div>
      <div class="card-body">
        <h3>${product.name}</h3>
        <p class="card-origin">Xuất xứ: ${product.origin}</p>
        <p class="card-desc">${product.description || ''}</p>
        <div class="card-footer">
          <span class="card-price">${product.price.toLocaleString("vi-VN")}&nbsp;đ</span>
          <button type="button" class="btn-add-to-cart" data-id="${product.id}">
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>
    </article>
  `).join("");
}

// ==========================================
// 3. Tìm kiếm & Lọc kết hợp (Filter & Search)
// ==========================================
function filterAndSearchProducts() {
  const keyword = searchInputEl.value.trim().toLowerCase();
  const selectedCategory = categoryFilterEl.value;

  // Hiển thị hoặc ẩn nút xoá từ khoá
  if (keyword.length > 0) {
    clearSearchBtnEl.classList.add("visible");
  } else {
    clearSearchBtnEl.classList.remove("visible");
  }

  // Lọc theo cả từ khoá và danh mục
  const filtered = products.filter(product => {
    const matchName = product.name.toLowerCase().includes(keyword);
    const matchCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchName && matchCategory;
  });

  renderProducts(filtered);
}

// Event Listeners cho Search & Filter
searchInputEl.addEventListener("input", filterAndSearchProducts);
categoryFilterEl.addEventListener("change", filterAndSearchProducts);

clearSearchBtnEl.addEventListener("click", () => {
  searchInputEl.value = "";
  filterAndSearchProducts();
  searchInputEl.focus();
});

// ==========================================
// 4. Xử lý Giỏ hàng (Cart Management)
// ==========================================
function addToCart(productId) {
  const product = products.find(item => item.id === productId);
  if (!product) return;

  // Kiểm tra xem sản phẩm đã có trong giỏ chưa
  const existingItem = cart.find(item => item.id === productId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      ...product,
      quantity: 1
    });
  }

  updateCartUI();
  showToast(`Đã thêm "${product.name}" vào giỏ hàng!`);
}

function updateCartUI() {
  // 1. Tính tổng số lượng
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCountEl.textContent = totalCount;

  // Hiệu ứng nhấp nháy badge
  cartCountEl.classList.add("pop");
  setTimeout(() => cartCountEl.classList.remove("pop"), 200);

  // 2. Tính tổng số tiền
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  orderTotalPriceEl.textContent = `${totalPrice.toLocaleString("vi-VN")} đ`;

  // 3. Render danh sách mini trong phần đơn hàng
  if (cart.length === 0) {
    orderCartItemsEl.innerHTML = `<p class="empty-cart-hint">Giỏ hàng của bạn đang trống. Hãy chọn sản phẩm trước khi đặt hàng!</p>`;
  } else {
    orderCartItemsEl.innerHTML = cart.map(item => `
      <div class="cart-item-row">
        <div class="cart-item-info">
          <span class="cart-item-name">${item.name}</span>
          <span class="cart-item-qty">Số lượng: ${item.quantity} x ${item.price.toLocaleString("vi-VN")} đ</span>
        </div>
        <span class="cart-item-price">${(item.price * item.quantity).toLocaleString("vi-VN")} đ</span>
      </div>
    `).join("");
  }
}

// Bắt sự kiện Click nút "Thêm vào giỏ hàng" từ product list
productListEl.addEventListener("click", function (event) {
  const target = event.target.closest(".btn-add-to-cart");
  if (target) {
    const productId = Number(target.dataset.id);
    addToCart(productId);
  }
});

// Nút xem giỏ hàng cuộn xuống phần đặt hàng
cartToggleBtnEl.addEventListener("click", () => {
  document.querySelector("#order-section").scrollIntoView({ behavior: "smooth" });
});

// ==========================================
// 5. Kiểm tra dữ liệu Form (Client Validation)
// ==========================================
function validateCustomerName(name) {
  if (!name || name.trim().length < 3) {
    return "Họ tên không được để trống và phải có ít nhất 3 ký tự.";
  }
  return "";
}

function validatePhone(phone) {
  const phoneRegex = /^[0-9]{10}$/;
  if (!phone || !phoneRegex.test(phone.trim())) {
    return "Số điện thoại không được để trống và phải gồm đúng 10 chữ số.";
  }
  return "";
}

function validateAddress(address) {
  if (!address || address.trim().length < 10) {
    return "Địa chỉ không được để trống và phải có ít nhất 10 ký tự.";
  }
  return "";
}

function validateCart() {
  if (cart.length === 0) {
    return "Giỏ hàng chưa có sản phẩm. Vui lòng chọn ít nhất 1 sản phẩm!";
  }
  return "";
}

// Validation trực tiếp khi người dùng nhập (Real-time feedback)
customerNameInput.addEventListener("input", () => {
  const err = validateCustomerName(customerNameInput.value);
  errorCustomerName.textContent = err;
  customerNameInput.parentElement.classList.toggle("has-error", !!err);
});

phoneInput.addEventListener("input", () => {
  const err = validatePhone(phoneInput.value);
  errorPhone.textContent = err;
  phoneInput.parentElement.classList.toggle("has-error", !!err);
});

addressInput.addEventListener("input", () => {
  const err = validateAddress(addressInput.value);
  errorAddress.textContent = err;
  addressInput.parentElement.classList.toggle("has-error", !!err);
});

// Xử lý submit form
orderFormEl.addEventListener("submit", function (event) {
  event.preventDefault();

  const nameVal = customerNameInput.value.trim();
  const phoneVal = phoneInput.value.trim();
  const addressVal = addressInput.value.trim();
  const noteVal = noteInput.value.trim();

  // Validate all fields
  const nameError = validateCustomerName(nameVal);
  const phoneError = validatePhone(phoneVal);
  const addressError = validateAddress(addressVal);
  const cartError = validateCart();

  // Hiển thị lỗi ra UI
  errorCustomerName.textContent = nameError;
  customerNameInput.parentElement.classList.toggle("has-error", !!nameError);

  errorPhone.textContent = phoneError;
  phoneInput.parentElement.classList.toggle("has-error", !!phoneError);

  errorAddress.textContent = addressError;
  addressInput.parentElement.classList.toggle("has-error", !!addressError);

  if (cartError) {
    showToast(cartError, "error");
    alert(cartError);
    return;
  }

  if (nameError || phoneError || addressError) {
    showToast("Vui lòng kiểm tra lại thông tin nhập trong form!", "error");
    return;
  }

  // Đặt hàng thành công
  const orderDetails = {
    customerName: nameVal,
    phone: phoneVal,
    address: addressVal,
    note: noteVal,
    items: [...cart],
    totalPrice: cart.reduce((sum, i) => sum + (i.price * i.quantity), 0),
    orderDate: new Date().toLocaleString("vi-VN")
  };

  console.log("Đơn hàng ghi nhận thành công:", orderDetails);

  alert(`Chúc mừng ${nameVal}! Đơn hàng của bạn đã được ghi nhận thành công.\nTổng thanh toán: ${orderDetails.totalPrice.toLocaleString("vi-VN")} đ`);
  showToast("Đặt hàng thành công! Cảm ơn quý khách.");

  // Reset form và giỏ hàng
  orderFormEl.reset();
  cart = [];
  updateCartUI();
});

// ==========================================
// 6. Toast Notification Helper
// ==========================================
function showToast(message, type = "success") {
  const toast = document.createElement("div");
  toast.className = `toast ${type === 'error' ? 'toast-error' : ''}`;
  toast.innerHTML = `<span>${message}</span>`;

  toastContainerEl.appendChild(toast);

  // Hiển thị với animation
  setTimeout(() => toast.classList.add("show"), 10);

  // Tự động xoá sau 3 giây
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ==========================================
// 7. Khởi chạy ban đầu (Initial Render)
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  renderProducts(products);
  updateCartUI();
});
