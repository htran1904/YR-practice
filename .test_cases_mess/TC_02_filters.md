# TC_02 — Bộ lọc & Tìm kiếm

**Module:** Filters & Search  
**Spec ref:** Section 2.1 (Unified Inbox — Track unread messages)

---

## Kỹ thuật áp dụng
- **EP:** Phân nhóm trạng thái filter (bật / tắt / kết hợp)
- **Decision Table:** Filter đơn vs. filter kết hợp
- **Negative Path:** Filter không có kết quả trả về

---

| TC ID | Module | Test Scenario | Pre-Condition | Test Steps | Test Data | Expected Result | Priority |
|-------|--------|---------------|---------------|------------|-----------|-----------------|----------|
| YR_MSG_FLT_TC_001 | Filters | Click Unread filter — URL cập nhật và chỉ hiển thị tin chưa đọc | - Đang ở trang `/conversations`<br>- Có ít nhất 1 tin nhắn chưa đọc | 1. Truy cập `https://goto.your.rentals/conversations`<br>2. Click button **Unread** (`data-test-id="btn-unread"`) | Account: canh.pham01@your.rentals | 1. URL thay đổi thành `/conversations?statuses=unread`<br>2. Danh sách hội thoại chỉ hiển thị các tin chưa đọc<br>3. Số lượng item trong list ≤ tổng số hội thoại ban đầu | High |
| YR_MSG_FLT_TC_002 | Filters | Mở panel Filters — hiển thị đầy đủ các tùy chọn lọc | - Đang ở trang `/conversations` | 1. Truy cập `/conversations`<br>2. Click button **Filters** (`data-test-id="btn-filters"`) | — | 1. Panel Filters mở ra<br>2. Hiển thị checkbox **Request/Inquiries & Offers** (`data-test-id="checkbox-request-inquiries-and-offers"`)<br>3. Hiển thị checkbox **Currently staying** (`data-test-id="checkbox-currently-staying"`)<br>4. Hiển thị checkbox **Upcoming check-ins** (`data-test-id="checkbox-upcoming-check-ins"`)<br>5. Hiển thị ô tìm kiếm Listings (`data-test-id="input-search-Listings"`)<br>6. Hiển thị ô tìm kiếm Channels (`data-test-id="input-search-Channels"`) | High |
| YR_MSG_FLT_TC_003 | Filters | Lọc theo "Request/Inquiries & Offers" — chỉ hiện booking request và inquiry | - Đang ở trang `/conversations`<br>- Panel Filters đang mở | 1. Click **Filters**<br>2. Tick checkbox **Request/Inquiries & Offers**<br>3. Quan sát danh sách hội thoại | Filter: Request/Inquiries & Offers = ON | 1. Danh sách chỉ hiển thị các hội thoại có status: "Booking request", "Inquiry", "Pending booking"<br>2. Không hiển thị hội thoại "Confirmed", "Past booking", "Cancelled" | High |
| YR_MSG_FLT_TC_004 | Filters | Lọc theo Listing cụ thể — chỉ hiển thị hội thoại của listing đó | - Đang ở trang `/conversations`<br>- Panel Filters đang mở<br>- Tài khoản có ít nhất 2 listing | 1. Click **Filters**<br>2. Trong mục Listings, tìm kiếm listing "390818"<br>3. Tick checkbox listing "390818" (`data-test-id="checkbox-listings-390818"`)<br>4. Quan sát kết quả | Listing ID: 390818 | 1. Danh sách hội thoại chỉ hiển thị các hội thoại thuộc listing 390818<br>2. Các hội thoại thuộc listing khác bị ẩn | Medium |
| YR_MSG_FLT_TC_005 | Filters | Lọc theo Channel (Booking.com) — chỉ hiển thị hội thoại từ Booking.com | - Đang ở trang `/conversations`<br>- Panel Filters đang mở | 1. Click **Filters**<br>2. Trong mục Channels, tick **Booking.com** (`data-test-id="checkbox-channels-BOCM"`)<br>3. Quan sát danh sách | Channel: Booking.com (BOCM) | 1. Danh sách chỉ hiển thị hội thoại từ Booking.com<br>2. Hội thoại từ Airbnb, direct booking... bị ẩn | Medium |
| YR_MSG_FLT_TC_006 | Filters | Kết hợp filter Unread + Booking request | - Đang ở trang `/conversations` | 1. Click **Unread** để lọc tin chưa đọc<br>2. Click **Filters** → tick **Request/Inquiries & Offers**<br>3. Quan sát danh sách | Filter combo: Unread + Request/Inquiries | 1. Danh sách chỉ hiển thị các hội thoại vừa chưa đọc vừa là booking request / inquiry<br>2. URL phản ánh cả 2 điều kiện lọc | Medium |
| YR_MSG_FLT_TC_007 | Filters | Filter trả về danh sách rỗng khi không có hội thoại phù hợp | - Đang ở trang `/conversations`<br>- Panel Filters đang mở | 1. Click **Filters**<br>2. Tick **Currently staying**<br>3. Đồng thời tick thêm một Channel không có booking nào (ví dụ: Locasun — LIKI)<br>4. Quan sát danh sách | Filter: Currently staying + Channel Locasun (LIKI) | 1. Danh sách hội thoại hiển thị trống (empty state)<br>2. Hiển thị thông báo không có kết quả (ví dụ: "No conversations found" hoặc tương tự)<br>3. Không hiển thị lỗi hay crash | Low |
