# TC_06 — Flow A: Contact With Host (Inquiry)

**Module:** Conversation Creation — Inquiry Flow  
**Spec ref:** `mess_flow.md` Section 3 (Flow A), Section 5 (Inbox Behavior), Section 12 (AC)  
**Scope:** Guest gửi inquiry từ trang property → Thread xuất hiện trong inbox host

---

## Kỹ thuật áp dụng
- **State Transition:** Guest submit form → System tạo thread → Host thấy trong inbox
- **EP:** Inquiry hợp lệ (có message) vs. không có message
- **Negative Path:** Duplicate inquiry từ cùng 1 guest, inbox behavior khi không có message

---

| TC ID | Module | Test Scenario | Pre-Condition | Test Steps | Test Data | Expected Result | Priority |
|-------|--------|---------------|---------------|------------|-----------|-----------------|----------|
| YR_MSG_FLOW_TC_001 | Flow A — Inquiry | Guest gửi inquiry — conversation thread được tạo và xuất hiện trong /conversations | - Listing `390818` đang active và public<br>- Host đã đăng nhập tài khoản Canh Company<br>- Guest chưa có conversation với listing này | **[Guest side]**<br>1. Mở tab ẩn danh (hoặc session guest riêng)<br>2. Truy cập `https://goto.your.rentals/p/390818`<br>3. Click **"Contact with host"**<br>4. Điền form: First name = `Test`, Last name = `Guest`, Email = `test_guest_inquiry_001@gmail.com`<br>5. Nhập message: `Xin chào, tôi muốn hỏi về phòng này.`<br>6. Click **Submit / Send**<br><br>**[Host side]**<br>7. Truy cập `https://goto.your.rentals/conversations` (tab host) | Property ID: `390818`<br>Guest email: `test_guest_inquiry_001@gmail.com`<br>Message: `Xin chào, tôi muốn hỏi về phòng này.` | 1. Form submit thành công, không có lỗi<br>2. Trong /conversations của host: thread mới xuất hiện<br>3. Thread hiển thị tên guest: "Test Guest"<br>4. Latest message preview: "Xin chào, tôi muốn hỏi về phòng này."<br>5. Thread được đánh dấu **Unread**<br>6. Thread được sort lên **đầu danh sách** | Critical |
| YR_MSG_FLOW_TC_002 | Flow A — Inquiry | Thread inquiry hiển thị metadata đúng trong inbox | - Đã có conversation từ Flow A được tạo thành công (TC_001) | 1. Truy cập `/conversations`<br>2. Click mở thread "Test Guest" vừa tạo<br>3. Quan sát thông tin hiển thị | Thread: vừa tạo từ inquiry | 1. `conversation-guest-name` = "Test Guest"<br>2. `conversation-status` = "Inquiry"<br>3. `conversation-last-message` = "Xin chào, tôi muốn hỏi về phòng này."<br>4. `conversation-last-activity-at` hiển thị thời gian gần đây (vừa tạo)<br>5. Thread liên kết đúng listing 390818 | High |
| YR_MSG_FLOW_TC_003 | Flow A — Inquiry | Thread inquiry được đánh dấu Unread ngay sau khi tạo | - Đã có thread mới từ inquiry (chưa mở) | 1. Truy cập `/conversations`<br>2. Quan sát thread "Test Guest" trước khi click mở | Thread: chưa được mở | 1. Thread hiển thị visual indicator Unread (bold text, chấm tròn, hoặc màu nổi bật)<br>2. Badge đếm tin chưa đọc trong menu tăng thêm 1<br>3. Thread xuất hiện trong filter "Unread" | High |
| YR_MSG_FLOW_TC_004 | Flow A — Inquiry | Thread inquiry sort lên đầu danh sách (newest first) | - Đã có ít nhất 1 conversation cũ hơn trong inbox<br>- Vừa tạo thread inquiry mới | 1. Ghi nhớ vị trí item đầu tiên trong `/conversations`<br>2. Tạo inquiry mới theo bước TC_001<br>3. Reload `/conversations` | Thread mới: "Test Guest" | 1. Thread "Test Guest" (mới nhất) xuất hiện ở **đầu danh sách** (/conversations)<br>2. Các thread cũ hơn bị đẩy xuống dưới | High |
| YR_MSG_FLOW_TC_005 | Flow A — Inquiry | Không tạo thread trùng khi cùng 1 guest gửi inquiry lần 2 | - Guest `test_guest_inquiry_001@gmail.com` đã có conversation với listing 390818 | 1. Guest gửi inquiry lần 2 với cùng email và listing<br>2. Nội dung message: `Hỏi thêm lần 2`<br>3. Reload `/conversations` | Guest email: `test_guest_inquiry_001@gmail.com`<br>Listing: 390818 | 1. **Không** tạo thread mới — tin nhắn mới được append vào thread đã có<br>2. Tổng số conversation không tăng thêm 1 thread mới cho cùng guest<br>3. Latest preview cập nhật thành "Hỏi thêm lần 2" | High |
| YR_MSG_FLOW_TC_006 | Flow A — Inquiry | Dữ liệu thread inquiry tồn tại sau khi reload trang | - Đã có thread inquiry trong inbox | 1. Mở `/conversations`, ghi nhớ thread "Test Guest"<br>2. Nhấn F5 (reload trang)<br>3. Quan sát lại danh sách | — | 1. Thread "Test Guest" vẫn xuất hiện sau reload<br>2. Nội dung, trạng thái, timestamp không thay đổi<br>3. Thứ tự sắp xếp giữ nguyên | High |
