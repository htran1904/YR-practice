# TC_04 — Soạn & Gửi Tin Nhắn

**Module:** Send Message  
**Spec ref:** Section 2.3 (Send Messages to Guests), Section 4 (Typical User Flow)

---

## Kỹ thuật áp dụng
- **Happy Path:** Soạn và gửi tin nhắn thành công
- **Boundary Value Analysis (BVA):** Độ dài nội dung tin nhắn (rỗng / ngắn / dài / max)
- **EP:** Nội dung hợp lệ vs. không hợp lệ (chỉ khoảng trắng)
- **Negative Path:** Gửi tin trống, ô soạn thảo rỗng

---

| TC ID | Module | Test Scenario | Pre-Condition | Test Steps | Test Data | Expected Result | Priority |
|-------|--------|---------------|---------------|------------|-----------|-----------------|----------|
| YR_MSG_SEND_TC_001 | Send Message | Soạn tin nhắn — ô soạn thảo nhận input thành công | - Đang xem 1 hội thoại (compose area visible) | 1. Truy cập `/conversations`<br>2. Click vào conversation item đầu tiên<br>3. Click vào ô soạn tin (`placeholder="Type a message..."`)<br>4. Gõ nội dung: `Xin chào, cảm ơn bạn đã đặt phòng!` | Nội dung: `Xin chào, cảm ơn bạn đã đặt phòng!` | 1. Ô soạn tin nhận focus<br>2. Nội dung gõ hiển thị đúng trong textarea<br>3. Giá trị textarea = `Xin chào, cảm ơn bạn đã đặt phòng!` | High |
| YR_MSG_SEND_TC_002 | Send Message | Nút Send bị disable khi ô soạn tin rỗng | - Đang xem 1 hội thoại<br>- Ô soạn tin đang trống | 1. Mở 1 hội thoại bất kỳ<br>2. Đảm bảo ô soạn tin trống (không nhập gì)<br>3. Quan sát nút Send (`data-test-id="action-icon-send"`) | Nội dung: (rỗng) | 1. Nút Send (`data-test-id="action-icon-send"`) ở trạng thái disabled<br>2. Không thể click nút Send khi chưa nhập nội dung | Critical |
| YR_MSG_SEND_TC_003 | Send Message | Nút Send active sau khi nhập nội dung | - Đang xem 1 hội thoại<br>- Ô soạn tin đang trống | 1. Mở 1 hội thoại bất kỳ<br>2. Nhập nội dung vào ô soạn tin: `Thông tin nhận phòng: Check-in 14:00`<br>3. Quan sát nút Send | Nội dung: `Thông tin nhận phòng: Check-in 14:00` | 1. Nút Send chuyển sang trạng thái active (enabled)<br>2. Có thể click nút Send | High |
| YR_MSG_SEND_TC_004 | Send Message | Gửi tin nhắn thành công — tin hiển thị trong chat | - Đang xem 1 hội thoại<br>- Tài khoản có quyền gửi tin cho guest | 1. Mở hội thoại với guest "Canh Pham"<br>2. Nhập nội dung: `Xin chào! Đây là tin nhắn kiểm tra tự động.`<br>3. Click nút Send (`data-test-id="action-icon-send"`) | Nội dung: `Xin chào! Đây là tin nhắn kiểm tra tự động.`<br>Hội thoại: Canh Pham | 1. Tin nhắn xuất hiện trong khung chat ngay lập tức<br>2. Tin nhắn hiển thị ở bên phải (phía host)<br>3. Ô soạn tin tự động xóa trống sau khi gửi<br>4. Không có thông báo lỗi | Critical |
| YR_MSG_SEND_TC_005 | Send Message | Gửi tin chỉ chứa khoảng trắng — không được gửi | - Đang xem 1 hội thoại | 1. Mở 1 hội thoại bất kỳ<br>2. Nhập vào ô soạn tin: `     ` (5 dấu cách)<br>3. Click nút Send (nếu active) | Nội dung: `     ` (whitespace only) | 1. Hệ thống không gửi tin (tin trắng không hợp lệ)<br>2. Nút Send vẫn disabled HOẶC hiển thị thông báo lỗi validation<br>3. Không có tin mới xuất hiện trong chat | High |
| YR_MSG_SEND_TC_006 | Send Message | Gửi tin nhắn dài (boundary — nội dung > 500 ký tự) | - Đang xem 1 hội thoại | 1. Mở 1 hội thoại bất kỳ<br>2. Nhập nội dung 600 ký tự: `Kính gửi quý khách, thông tin nhận phòng chi tiết như sau: Địa chỉ: 123 Đường ABC, Quận 1, TP.HCM. Giờ nhận phòng: 14:00. Giờ trả phòng: 12:00 ngày hôm sau. Mật khẩu wifi: YourRentals2026. Hướng dẫn: Bước 1 - Đến sảnh chính. Bước 2 - Lấy chìa khóa tại lễ tân. Bước 3 - Thang máy số 2 lên tầng 5, phòng 501. Mọi thắc mắc vui lòng liên hệ hotline: 1900 1234. Chúc quý khách nghỉ ngơi vui vẻ!` | Nội dung: 600 ký tự | 1. Hệ thống chấp nhận input hoặc hiển thị giới hạn ký tự còn lại<br>2. Nếu có giới hạn: hiển thị counter "X/MAX ký tự"<br>3. Nếu không có giới hạn: tin nhắn gửi thành công và hiển thị đầy đủ | Medium |
| YR_MSG_SEND_TC_007 | Send Message | Gửi tin nhắn bằng phím Enter | - Đang xem 1 hội thoại<br>- Biết rõ behavior Enter (gửi tin hay xuống dòng) | 1. Mở 1 hội thoại bất kỳ<br>2. Nhập nội dung: `Hẹn gặp lại!`<br>3. Nhấn phím **Enter** | Nội dung: `Hẹn gặp lại!`<br>Phím: Enter | **Nếu Enter = Gửi tin:**<br>1. Tin nhắn được gửi ngay lập tức<br>2. Ô soạn tin trở về rỗng<br><br>**Nếu Enter = Xuống dòng:**<br>1. Con trỏ chuyển xuống dòng mới trong textarea<br>2. Tin chưa được gửi | Medium |
