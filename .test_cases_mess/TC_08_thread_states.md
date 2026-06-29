# TC_08 — Thread States (Unread / Read / Archived)

**Module:** Thread State Management  
**Spec ref:** `mess_flow.md` Section 6 (Open Conversation), Section 9 (Thread States), Section 12 (AC)  
**Scope:** Chuyển đổi trạng thái thread, persistence sau reload/re-login

---

## Kỹ thuật áp dụng
- **State Transition:** Unread → Read (khi mở), Read → Unread (khi guest nhắn mới)
- **EP:** Thread đang Unread vs. đang Read
- **Reliability:** State persist sau reload, sau re-login

---

| TC ID | Module | Test Scenario | Pre-Condition | Test Steps | Test Data | Expected Result | Priority |
|-------|--------|---------------|---------------|------------|-----------|-----------------|----------|
| YR_MSG_STATE_TC_001 | Thread States | Mở thread Unread — tự động chuyển sang Read | - Có ít nhất 1 thread đang ở trạng thái Unread trong inbox | 1. Truy cập `/conversations`<br>2. Click **Unread** filter (`data-test-id="btn-unread"`)<br>3. Ghi nhớ số badge tin chưa đọc<br>4. Click mở 1 thread Unread<br>5. Đọc nội dung hội thoại<br>6. Quay lại danh sách | Thread: có tin chưa đọc | 1. Khi đang xem thread: visual Unread indicator biến mất<br>2. Quay lại list: thread không còn bold/highlight Unread<br>3. Badge đếm tin chưa đọc trong nav giảm đi 1<br>4. Thread không còn xuất hiện trong filter "Unread" | Critical |
| YR_MSG_STATE_TC_002 | Thread States | Trạng thái Read tồn tại sau khi reload trang | - Đã mở và đọc 1 thread (đang ở trạng thái Read) | 1. Mở 1 thread Unread → chuyển sang Read<br>2. Nhấn F5 reload `/conversations`<br>3. Quan sát thread vừa đọc | Thread: vừa được đọc | 1. Thread vẫn ở trạng thái **Read** sau reload<br>2. Không quay lại Unread<br>3. Visual indicator Unread không xuất hiện lại | High |
| YR_MSG_STATE_TC_003 | Thread States | Thread chuyển từ Read → Unread khi guest gửi tin mới | - Thread đang ở trạng thái Read<br>- Guest gửi message mới vào thread đó | **[Guest side]**<br>1. Guest gửi tin mới vào conversation đang ở trạng thái Read<br><br>**[Host side]**<br>2. Quan sát `/conversations` | Thread: đang Read<br>Message từ guest: `Tôi muốn hỏi thêm về check-in.` | 1. Thread chuyển từ Read → **Unread**<br>2. Visual Unread indicator xuất hiện lại (bold, chấm tròn)<br>3. Badge đếm tin chưa đọc tăng lên<br>4. Thread được move lên đầu danh sách | Critical |
| YR_MSG_STATE_TC_004 | Thread States | Trạng thái Unread tồn tại sau re-login | - Có thread Unread trong inbox<br>- Chưa mở thread đó | 1. Ghi nhớ thread Unread (tên guest, preview)<br>2. Đăng xuất: `Settings → Log out`<br>3. Đăng nhập lại: `canh.pham01@your.rentals` / `Canh1997`<br>4. Chọn account Canh Company<br>5. Truy cập `/conversations` | Credentials: `canh.pham01@your.rentals` / `Canh1997` | 1. Thread vẫn ở trạng thái **Unread** sau re-login<br>2. Badge đếm tin chưa đọc giống trước khi logout<br>3. Nội dung preview không thay đổi | High |
| YR_MSG_STATE_TC_005 | Thread States | Badge đếm tin chưa đọc trong menu Guests cập nhật đúng | - Biết số tin chưa đọc hiện tại (ví dụ: 9+) | 1. Truy cập `/conversations`<br>2. Ghi nhớ số badge trên menu Guests (nav bar)<br>3. Click vào 1 thread Unread, đọc xong, quay lại list<br>4. Quan sát badge trên menu Guests | Badge ban đầu: 9+ | 1. Sau khi đọc thread: số badge giảm đi 1 (hoặc cập nhật đúng)<br>2. Badge cập nhật real-time, không cần reload<br>3. Nếu đã đọc hết: badge biến mất hoặc về 0 | High |
| YR_MSG_STATE_TC_006 | Thread States | Thread mới (Unread) xuất hiện đúng trong filter Unread | - Click filter Unread trước khi thread mới đến | 1. Click filter **Unread** (`data-test-id="btn-unread"`)<br>2. Guest gửi inquiry mới<br>3. Quan sát danh sách (có thể cần reload) | Thread mới: inquiry từ guest mới | 1. Thread mới xuất hiện trong filter Unread sau khi guest gửi<br>2. Thread sort lên đầu danh sách Unread<br>3. Thông tin preview hiển thị đúng | High |
