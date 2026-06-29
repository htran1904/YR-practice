# TC_01 — Navigation & Unified Inbox

**Module:** Navigation & Unified Inbox  
**Spec ref:** Section 1 (Purpose), Section 2.1 (Unified Inbox), Section 4 (Typical User Flow)

---

## Kỹ thuật áp dụng
- **Happy Path:** Luồng điều hướng chính
- **State Transition:** Từ Dashboard → Guests menu → Messages
- **EP:** Trạng thái inbox (có hội thoại / không có)

---

| TC ID | Module | Test Scenario | Pre-Condition | Test Steps | Test Data | Expected Result | Priority |
|-------|--------|---------------|---------------|------------|-----------|-----------------|----------|
| YR_MSG_NAV_TC_001 | Navigation | Truy cập Messages qua menu Guests thành công | - Đã đăng nhập với tài khoản Canh Company<br>- Đang ở trang Dashboard | 1. Truy cập `https://goto.your.rentals/dashboard`<br>2. Click vào mục **Guests** trên thanh nav (`#guest-menu-item`)<br>3. Trong dropdown, click link **Messages** (`data-test-id="messages-menu"`) | URL: `https://goto.your.rentals/dashboard`<br>Account: canh.pham01@your.rentals | 1. Dropdown Guests mở ra<br>2. Hiển thị link "Messages" kèm badge số tin chưa đọc<br>3. Trang chuyển sang `/conversations`<br>4. Tiêu đề trang: "Messages \| Your.Rentals" | Critical |
| YR_MSG_NAV_TC_002 | Navigation | Truy cập Messages trực tiếp qua URL | - Đã đăng nhập và chọn account | 1. Nhập trực tiếp URL `https://goto.your.rentals/conversations` lên thanh địa chỉ<br>2. Nhấn Enter | URL: `https://goto.your.rentals/conversations` | 1. Trang Messages tải thành công<br>2. URL hiển thị `/conversations`<br>3. Page title: "Messages \| Your.Rentals"<br>4. Danh sách hội thoại hiển thị | High |
| YR_MSG_NAV_TC_003 | Navigation | Badge đếm tin chưa đọc hiển thị đúng trong menu Guests | - Đã đăng nhập<br>- Tài khoản có ít nhất 1 tin nhắn chưa đọc | 1. Truy cập bất kỳ trang nào (Dashboard, Listings...)<br>2. Click vào **Guests** trên thanh nav<br>3. Quan sát badge số bên cạnh link "Messages" | Account: canh.pham01@your.rentals (có 9+ tin chưa đọc) | 1. Badge hiển thị số lượng tin chưa đọc (ví dụ: "9+")<br>2. Badge màu nổi bật, dễ nhận thấy<br>3. Số trên badge khớp với số tin thực sự chưa đọc | High |
| YR_MSG_NAV_TC_004 | Unified Inbox | Danh sách hội thoại hiển thị đầy đủ thông tin mỗi item | - Đã truy cập trang `/conversations`<br>- Inbox có ít nhất 1 hội thoại | 1. Quan sát từng item trong danh sách hội thoại (`data-test-id="conversation-item"`) | Account: canh.pham01@your.rentals | Mỗi conversation item hiển thị:<br>1. Tên khách (`data-test-id="conversation-guest-name"`) — VD: "Guest from Booking.com"<br>2. Thời gian hoạt động cuối (`data-test-id="conversation-last-activity-at"`) — VD: "6 hours ago"<br>3. Nội dung tin nhắn cuối (`data-test-id="conversation-last-message"`) — VD: "Hello Tesstf 2"<br>4. Trạng thái booking (`data-test-id="conversation-status"`) — VD: "Booking request", "Confirmed" | High |
| YR_MSG_NAV_TC_005 | Unified Inbox | Hội thoại từ nhiều channel khác nhau đều hiển thị trong cùng 1 inbox | - Tài khoản có booking từ ít nhất 2 channel khác nhau (Booking.com, Airbnb...) | 1. Truy cập `/conversations`<br>2. Cuộn qua danh sách hội thoại<br>3. Quan sát trạng thái booking của các item | Account: canh.pham01@your.rentals | 1. Inbox hiển thị hội thoại từ nhiều channel trong cùng 1 danh sách<br>2. Mỗi hội thoại có trạng thái booking rõ ràng: "Booking request", "Confirmed", "Inquiry", "Past booking"...<br>3. Không có phân tách riêng theo channel | Medium |
| YR_MSG_NAV_TC_006 | Unified Inbox | Không truy cập được Messages khi chưa đăng nhập | - Chưa đăng nhập hoặc session đã hết hạn | 1. Mở tab ẩn danh (Incognito)<br>2. Truy cập trực tiếp `https://goto.your.rentals/conversations` | URL: `https://goto.your.rentals/conversations`<br>Session: không có | 1. Hệ thống redirect về trang login `/login`<br>2. Không hiển thị nội dung Messages<br>3. URL sau redirect: `https://goto.your.rentals/login` | Critical |
