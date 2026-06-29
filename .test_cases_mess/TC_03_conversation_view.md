# TC_03 — Xem Hội Thoại & Booking Actions

**Module:** Conversation View & Booking Actions  
**Spec ref:** Section 2.1 (View conversations), Section 2.3 (Send Messages), Section 4 (Typical User Flow)

---

## Kỹ thuật áp dụng
- **State Transition:** Trạng thái booking (Booking request → Accepted / Declined)
- **Happy Path:** Mở hội thoại, xem lịch sử tin, xem chi tiết booking
- **Decision Table:** Booking request (Accept / Decline / Expire)

---

| TC ID | Module | Test Scenario | Pre-Condition | Test Steps | Test Data | Expected Result | Priority |
|-------|--------|---------------|---------------|------------|-----------|-----------------|----------|
| YR_MSG_CONV_TC_001 | Conversation View | Click vào hội thoại — mở chat window và cập nhật URL | - Đang ở `/conversations`<br>- Có ít nhất 1 hội thoại trong list | 1. Truy cập `/conversations`<br>2. Click vào conversation item đầu tiên (`data-test-id="conversation-item"`) | — | 1. URL cập nhật thành `/conversations?id={uuid}&details=true`<br>2. Chat window mở ra bên phải<br>3. Ô soạn tin (`placeholder="Type a message..."`) hiển thị<br>4. Panel Details mở ra | Critical |
| YR_MSG_CONV_TC_002 | Conversation View | Lịch sử tin nhắn hiển thị đúng — thấy được tên người gửi | - Đã mở 1 hội thoại cụ thể | 1. Mở hội thoại "Guest from Booking.com" trong list<br>2. Quan sát khu vực chat | Hội thoại: Guest from Booking.com | 1. Hiển thị các tin nhắn theo thứ tự thời gian (cũ → mới)<br>2. Tên người gửi hiển thị cạnh mỗi tin (`data-test-id="message-sender-name"`)<br>3. Phân biệt rõ tin của host (bên phải) và tin của khách (bên trái) | High |
| YR_MSG_CONV_TC_003 | Conversation View | Panel Details hiển thị thông tin booking | - Đã mở 1 hội thoại có booking | 1. Click vào một conversation item có status "Booking request"<br>2. Quan sát panel bên phải (`data-test-id="guests-details"`) | Status: Booking request | 1. Panel Details hiển thị (`data-test-id="guests-details"`)<br>2. Hiển thị deadline chấp nhận: "Accept or decline within Xh Ym or this request will expire"<br>3. Hiển thị nút **Accept** (`data-test-id="btn-accept"`) và **Decline** (`data-test-id="btn-decline"`) | High |
| YR_MSG_CONV_TC_004 | Booking Actions | Chấp nhận (Accept) booking request thành công | - Đã mở hội thoại có status "Booking request"<br>- Booking request chưa hết hạn | 1. Mở hội thoại có status "Booking request"<br>2. Trong panel Details, click **Accept** (`data-test-id="btn-accept"`) | Status ban đầu: Booking request<br>Expiry: còn > 0 giờ | 1. Hệ thống xử lý Accept<br>2. Trạng thái booking chuyển sang "Confirmed"<br>3. Nút Accept/Decline biến mất hoặc thay bằng trạng thái mới<br>4. Không có lỗi hiển thị | Critical |
| YR_MSG_CONV_TC_005 | Booking Actions | Từ chối (Decline) booking request | - Đã mở hội thoại có status "Booking request"<br>- Booking request chưa hết hạn | 1. Mở hội thoại có status "Booking request"<br>2. Trong panel Details, click **Decline** (`data-test-id="btn-decline"`) | Status ban đầu: Booking request | 1. Hiện dialog/modal xác nhận từ chối (nếu có)<br>2. Sau xác nhận, status booking chuyển sang "Declined" hoặc "Cancelled"<br>3. Nút Accept/Decline biến mất<br>4. Hội thoại vẫn còn trong inbox | Critical |
| YR_MSG_CONV_TC_006 | Booking Actions | Booking request hiển thị countdown hết hạn | - Đã mở hội thoại có status "Booking request"<br>- Booking request sắp hết hạn (còn < 24h) | 1. Mở hội thoại "Booking request" có badge "Expires in 12 hours" trong conversation list<br>2. Quan sát panel Details | Hội thoại: Expires in 12 hours | 1. Panel Details hiển thị countdown: "Accept or decline within 12h 0m or this request will expire"<br>2. Chữ countdown hiển thị màu nổi bật (vàng/đỏ)<br>3. Countdown cập nhật theo thời gian thực | High |
| YR_MSG_CONV_TC_007 | Conversation View | Hội thoại "Past booking" không hiển thị nút Accept/Decline | - Đã truy cập `/conversations` | 1. Tìm hội thoại có status "Past booking" trong list<br>2. Click mở hội thoại đó<br>3. Quan sát panel Details | Status: Past booking<br>Guest: Canh Pham | 1. Panel Details hiển thị thông tin booking<br>2. **Không** xuất hiện nút Accept hoặc Decline<br>3. Có thể hiển thị thông tin lịch sử (check-in, check-out, số khách) | Medium |
