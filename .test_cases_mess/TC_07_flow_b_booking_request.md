# TC_07 — Flow B: Booking Request (with message)

**Module:** Conversation Creation — Booking Request Flow  
**Spec ref:** `mess_flow.md` Section 4 (Flow B), Section 5 (Inbox Behavior), Section 12 (AC)  
**Scope:** Guest hoàn tất booking request kèm message → Thread booking xuất hiện trong inbox host

---

## Kỹ thuật áp dụng
- **State Transition:** Guest submit booking request → System tạo thread → Host thấy trong inbox
- **EP:** Booking request có message / không có message
- **Decision Table:** Thread liên kết bookingId + propertyId vs. inquiry (bookingId = null)
- **Negative Path:** Booking request không kèm message

---

| TC ID | Module | Test Scenario | Pre-Condition | Test Steps | Test Data | Expected Result | Priority |
|-------|--------|---------------|---------------|------------|-----------|-----------------|----------|
| YR_MSG_FLOW_TC_007 | Flow B — Booking Request | Guest gửi booking request kèm message — thread được tạo trong /conversations | - Listing `454481` đang active, còn ngày trống<br>- Guest có tài khoản hợp lệ<br>- Host đã đăng nhập tài khoản Canh Company | **[Guest side]**<br>1. Truy cập `https://goto.your.rentals/p/454481`<br>2. Chọn ngày: Check-in `2026-06-10`, Check-out `2026-06-12`<br>3. Chọn 2 guests<br>4. Click **"Book now"** / **"Request to book"**<br>5. Trong form booking, nhập message: `Xin chào host, chúng tôi là cặp đôi đến du lịch.`<br>6. Submit booking request<br><br>**[Host side]**<br>7. Truy cập `/conversations` | Listing ID: `454481`<br>Check-in: `2026-06-10`<br>Check-out: `2026-06-12`<br>Guests: 2<br>Message: `Xin chào host, chúng tôi là cặp đôi đến du lịch.` | 1. Booking request tạo thành công<br>2. Thread mới xuất hiện trong `/conversations`<br>3. Thread status: **"Booking request"**<br>4. Latest preview: "Xin chào host, chúng tôi là cặp đôi đến du lịch."<br>5. Thread đánh dấu **Unread**<br>6. Thread xuất hiện ở **đầu danh sách** | Critical |
| YR_MSG_FLOW_TC_008 | Flow B — Booking Request | Thread booking request liên kết đúng bookingId và propertyId | - Thread từ Booking Request đã tạo (TC_007) | 1. Mở thread booking request trong `/conversations`<br>2. Quan sát panel Details (`data-test-id="guests-details"`)<br>3. Kiểm tra thông tin booking | Listing: `454481`<br>Dates: `2026-06-10` → `2026-06-12` | 1. Panel Details hiển thị thông tin đặt phòng: listing, ngày check-in, check-out<br>2. Status hiển thị "Booking request"<br>3. Nút **Accept** và **Decline** hiển thị (vì là booking request chưa xử lý)<br>4. Thread có bookingId liên kết (không phải null như inquiry) | Critical |
| YR_MSG_FLOW_TC_009 | Flow B — Booking Request | Thread booking request hiển thị expiry countdown đúng | - Thread booking request đang pending, chưa hết hạn | 1. Mở thread với status "Booking request"<br>2. Quan sát countdown trong panel Details và badge trong list | Booking request: còn hạn chấp nhận | 1. Panel Details hiển thị: "Accept or decline within Xh Ym or this request will expire"<br>2. Conversation list item hiển thị badge "Expires in X hours" nếu sắp hết hạn<br>3. Countdown đếm ngược theo thời gian thực | High |
| YR_MSG_FLOW_TC_010 | Flow B — Booking Request | Booking request không kèm message — thread vẫn được tạo | - Guest hoàn tất booking request mà bỏ trống phần message (nếu optional) | 1. Truy cập listing `454481`<br>2. Chọn ngày và guests<br>3. Submit booking request nhưng **bỏ trống** phần message<br>4. Kiểm tra `/conversations` | Listing: `454481`<br>Message: (rỗng) | 1. Booking request vẫn submit được (nếu message là optional)<br>2. Thread xuất hiện trong `/conversations`<br>3. Latest message preview rỗng hoặc hiển thị text mặc định<br>4. Status vẫn là "Booking request" | Medium |
| YR_MSG_FLOW_TC_011 | Flow B — Booking Request | Thread booking sort lên đầu sau khi được tạo | - Inbox có ít nhất 1 conversation cũ hơn | 1. Ghi nhớ item đầu danh sách `/conversations`<br>2. Guest tạo booking request mới (theo TC_007)<br>3. Reload `/conversations` | Thread mới: booking request | 1. Thread booking request mới xuất hiện ở **vị trí đầu tiên** trong danh sách<br>2. Các thread cũ bị đẩy xuống | High |
| YR_MSG_FLOW_TC_012 | Flow B — Booking Request | Dữ liệu booking request thread tồn tại sau re-login | - Đã có thread booking request trong inbox | 1. Đăng xuất khỏi tài khoản host<br>2. Đăng nhập lại: `canh.pham01@your.rentals` / `Canh1997`<br>3. Truy cập `/conversations` | Credentials: `canh.pham01@your.rentals` / `Canh1997` | 1. Thread booking request vẫn tồn tại sau re-login<br>2. Nội dung, status, timestamp không thay đổi<br>3. Không bị mất thread hoặc thay đổi trạng thái | High |
