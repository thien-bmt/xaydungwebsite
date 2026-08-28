# Website Đặc Sản Tây Nguyên

Dự án xây dựng chức năng tương tác và kiểm tra dữ liệu cho website bán đặc sản Tây Nguyên bằng HTML5, CSS3 và JavaScript DOM.

---

## 1. Tính Năng Chính

- **Hiển thị sản phẩm bằng DOM**: Danh sách sản phẩm được render động từ mảng dữ liệu JavaScript thay vì viết cố định trong HTML.
- **Tìm kiếm theo tên sản phẩm**: Tìm kiếm trực tiếp (live search), không phân biệt hoa thường, tự động hiển thị thông báo khi không tìm thấy kết quả.
- **Lọc theo danh mục**: Lọc sản phẩm theo từng nhóm danh mục (Cà phê, Mật ong, Mắc ca, Gia vị, Trái cây, Đặc sản khác) đồng bộ cùng ô tìm kiếm.
- **Quản lý giỏ hàng**:
  - Thêm sản phẩm vào giỏ hàng và tự động cập nhật số lượng badge.
  - Tính tổng số lượng và tổng tiền thanh toán theo thời gian thực.
  - Hiển thị danh sách tóm tắt giỏ hàng trong phần đặt hàng.
- **Form đặt hàng & Kiểm tra dữ liệu (Client Validation)**:
  - **Họ tên**: Bắt buộc nhập, tối thiểu 3 ký tự.
  - **Số điện thoại**: Bắt buộc nhập, đúng định dạng 10 chữ số.
  - **Địa chỉ nhận hàng**: Bắt buộc nhập, tối thiểu 10 ký tự.
  - **Giỏ hàng**: Phải có tối thiểu 1 sản phẩm trước khi gửi đơn.
- **Giao diện hiện đại & Responsive**: Thiết kế tương thích tốt trên cả máy tính, máy tính bảng và điện thoại.

---

## 2. Cấu Trúc Thư Mục

```text
web_nang_Cao/
│
├── index.html              # Giao diện chính của website
│
├── css/
│   └── style.css           # Bảng mã định dạng CSS và Responsive
│
├── js/
│   ├── data.js             # Mảng dữ liệu sản phẩm mẫu (8 sản phẩm, >3 danh mục)
│   └── app.js              # Logic ứng dụng (DOM render, Search, Filter, Cart, Validation)
│
├── images/                 # Thư mục chứa hình ảnh sản phẩm
│
└── README.md               # Tài liệu hướng dẫn dự án
```

---

## 3. Hướng Dẫn Cài Đặt & Chạy Dự Án

1. **Clone repository:**
   ```bash
   git clone https://github.com/thien-bmt/xaydungwebsite.git
   cd xaydungwebsite
   ```

2. **Chuyển sang nhánh tính năng:**
   ```bash
   git checkout feature/dac-san-tay-nguyen
   ```

3. **Chạy trực tiếp:**
   - Mở file `index.html` bằng trình duyệt bất kỳ (Google Chrome, Firefox, Microsoft Edge,...).
   - Hoặc sử dụng extension **Live Server** trên Visual Studio Code để chạy trên cổng `http://127.0.0.1:5500`.

---

## 4. Trả Lời Câu Hỏi Thảo Luận

### Câu 1: Vì sao nên dùng `const` và `let` thay cho `var` trong JavaScript hiện đại?
- **Phạm vi (Scope)**: `var` có phạm vi function-scoped hoặc global-scoped, trong khi `let` và `const` có phạm vi **block-scoped** (trong cặp dấu `{}`), giúp tránh vô tình làm rò rỉ hoặc ghi đè biến.
- **Hoisting**: Biến khai báo bằng `var` bị hoisted và gán giá trị `undefined`, dễ sinh lỗi khó lường. `let` và `const` nằm trong *Temporal Dead Zone (TDZ)* và sẽ ném lỗi `ReferenceError` nếu truy cập trước khi khai báo.
- **Khai báo lại (Re-declaration)**: `var` cho phép khai báo lại cùng một tên biến trong cùng phạm vi, trong khi `let` và `const` sẽ báo lỗi cú pháp.
- **Tính bất biến**: `const` đảm bảo biến không bị gán lại sang một giá trị hoặc vùng nhớ khác, giúp mã nguồn rõ ràng và dễ bảo trì hơn.

### Câu 2: DOM giúp JavaScript thay đổi giao diện trang web như thế nào?
- DOM (Document Object Model) biểu diễn toàn bộ tài liệu HTML dưới dạng một cây đối tượng phân cấp.
- JavaScript có thể thông qua các API của DOM để:
  - **Truy vấn phần tử**: `document.querySelector()`, `document.getElementById()`,...
  - **Thay đổi nội dung & cấu trúc**: `element.innerHTML`, `element.textContent`, `document.createElement()`, `appendChild()`,...
  - **Thay đổi thuộc tính & kiểu dáng**: `element.setAttribute()`, `element.style`, `element.classList.add()`,...
  - **Lắng nghe & phản hồi sự kiện người dùng**: `element.addEventListener('click', ...)`, `'input'`, `'submit'`,... từ đó cập nhật giao diện theo thời gian thực mà không cần tải lại toàn bộ trang.

### Câu 3: Vì sao cần kiểm tra dữ liệu phía client trước khi gửi form?
- **Trải nghiệm người dùng (UX)**: Cung cấp phản hồi ngay lập tức cho người dùng khi nhập sai (thiếu thông tin, sai định dạng số điện thoại, chưa chọn sản phẩm...) mà không phải chờ phản hồi từ mạng.
- **Giảm tải cho Server**: Ngăn chặn các yêu cầu không hợp lệ gửi lên máy chủ, tiết kiệm băng thông và tài nguyên xử lý của server.
- **Tối ưu quy trình nhập liệu**: Hướng dẫn người dùng hoàn thành biểu mẫu một cách nhanh chóng và chính xác.

### Câu 4: Validation client có thể thay thế hoàn toàn validation phía server không? Vì sao?
- **Không thể thay thế**.
- **Lý do**:
  - Mã JavaScript ở phía Client chạy trên trình duyệt của người dùng nên có thể dễ dàng bị tắt (Disable JS), vượt qua hoặc chỉnh sửa trực tiếp thông qua DevTools, Postman, cURL, hoặc các công cụ gửi HTTP Request độc hại.
  - Validation client chỉ phục vụ **trải nghiệm người dùng (UX)**, còn validation phía server là lớp phòng vệ **bắt buộc để đảm bảo an toàn dữ liệu, logic nghiệp vụ và bảo mật hệ thống**.

### Câu 5: Khi số lượng sản phẩm tăng lên, mã JavaScript hiện tại cần được tổ chức lại như thế nào?
- **Phân trang (Pagination) / Tải theo cuộn (Infinite Scroll)**: Không tải và render toàn bộ hàng trăm/hàng nghìn sản phẩm cùng lúc; chỉ render theo từng trang (ví dụ 12-20 sản phẩm/lần).
- **Tách module (ES Modules)**: Chia nhỏ mã nguồn thành các module độc lập theo chức năng: `cart.js`, `products.js`, `validator.js`, `ui.js`, `api.js`.
- **Tích hợp API & Server-side Filtering/Search**: Chuyển logic tìm kiếm và lọc dữ liệu sang cơ sở dữ liệu phía backend (sử dụng Debounce cho ô tìm kiếm để hạn chế gọi API liên tục).
- **Quản lý trạng thái tập trung (State Management)**: Sử dụng mô hình quản lý State rõ ràng (như Redux pattern hoặc custom Store) để đồng bộ trạng thái giỏ hàng và bộ lọc hiệu quả.
