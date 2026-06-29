# TC_05 — Quick Replies, Generate Reply & Đính kèm file

**Module:** Message Templates / Quick Replies / Generate Reply / File Attachments  
**Spec ref:** Section 2.4 (Message Templates), Section 2.5 (File Attachments), Section 2.6 (Channel Limitations)

---

## Kỹ thuật áp dụng
- **Happy Path:** Sử dụng Quick Reply, Generate Reply, đính kèm file
- **EP:** Channel có hỗ trợ messaging vs. không hỗ trợ (Agoda, Trip.com...)
- **State Transition:** Trạng thái Generate Reply dialog (đóng → mở → generate → insert)
- **Negative Path:** Channel không hỗ trợ messaging

---

| TC ID | Module | Test Scenario | Pre-Condition | Test Steps | Test Data | Expected Result | Priority |
|-------|--------|---------------|---------------|------------|-----------|-----------------|----------|
| YR_MSG_TMPL_TC_001 | Quick Replies | Mở Quick Replies từ ô soạn tin | - Đang xem 1 hội thoại<br>- Tài khoản có ít nhất 1 quick reply đã tạo | 1. Mở 1 hội thoại bất kỳ<br>2. Click button **Quick Replies** (`data-test-id="btn-quick-replies"`) | Account: canh.pham01@your.rentals | 1. Menu hoặc popup Quick Replies mở ra<br>2. Hiển thị danh sách các template đã tạo<br>3. Mỗi template hiển thị tên và nội dung preview | High |
| YR_MSG_TMPL_TC_002 | Quick Replies | Chọn quick reply — nội dung tự động điền vào ô soạn tin | - Đang xem 1 hội thoại<br>- Danh sách Quick Replies đang mở<br>- Có ít nhất 1 template | 1. Click **Quick Replies**<br>2. Click vào 1 template trong danh sách (ví dụ: "Check-in instructions") | Template: "Check-in instructions"<br>Content: "Dear Guest, your check-in time is 14:00..." | 1. Nội dung template tự động điền vào ô soạn tin<br>2. Popup Quick Replies đóng lại<br>3. Ô soạn tin có nội dung của template, sẵn sàng chỉnh sửa thêm hoặc gửi | High |
| YR_MSG_TMPL_TC_003 | Quick Replies | Mở Manage Quick Replies — trang quản lý template | - Đang ở trang `/conversations` | 1. Click button **Manage Quick Replies** (`data-test-id="manage-quick-replies-button"`) | — | 1. Dialog hoặc trang Manage Quick Replies mở ra<br>2. Hiển thị danh sách template hiện có<br>3. Có option tạo mới template | Medium |
| YR_MSG_TMPL_TC_004 | Generate Reply | Click Generate Reply — dialog AI mở ra | - Đang xem 1 hội thoại<br>- Có ít nhất 1 tin nhắn từ khách | 1. Mở hội thoại "Guest from Booking.com"<br>2. Click button **Generate reply** (`data-test-id="btn-generate-reply"`) | Hội thoại: Guest from Booking.com<br>Tin nhắn khách: "Hello Tesstf 2" | 1. Dialog Generate Reply mở ra (`role="dialog"`)<br>2. Dialog hiển thị tiêu đề "Generate suggested replies in seconds" hoặc tương tự<br>3. Có option sinh gợi ý reply từ AI | High |
| YR_MSG_TMPL_TC_005 | File Attachments | Đính kèm file vào tin nhắn — dialog chọn file mở ra | - Đang xem 1 hội thoại<br>- Trình duyệt cho phép upload file | 1. Mở 1 hội thoại bất kỳ<br>2. Click nút đính kèm (attachment icon) bên cạnh ô soạn tin | File: `check-in-guide.pdf` (PDF, 500KB) | 1. Dialog chọn file của hệ thống mở ra<br>2. Có thể chọn file từ máy tính<br>3. Sau khi chọn file: file preview hiển thị trong ô soạn tin hoặc khu vực đính kèm | Medium |
| YR_MSG_TMPL_TC_006 | Channel Limitations | Channel không hỗ trợ messaging — hiển thị thông báo phù hợp | - Đang ở trang `/conversations`<br>- Có booking từ channel không hỗ trợ (Agoda, Trip.com, Locasun, Cozystay) | 1. Tìm hội thoại từ channel Agoda hoặc Trip.com trong danh sách<br>2. Click mở hội thoại đó<br>3. Quan sát khu vực soạn tin | Channel: Agoda / Trip.com / Locasun / Cozystay | 1. Hệ thống hiển thị thông báo rõ ràng: channel này không hỗ trợ messaging qua Your.Rentals<br>2. Ô soạn tin bị disabled hoặc ẩn đi<br>3. Có hướng dẫn liên hệ guest qua email thay thế<br>4. Không có lỗi/crash | High |
