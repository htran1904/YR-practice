# TC_09 — Host Reply & Guest Follow-up

**Module:** Host Reply / Guest Follow-up Flow  
**Spec ref:** `mess_flow.md` Section 7 (Host Reply), Section 8 (Guest Follow-up), Section 12 (AC)  
**Scope:** Host gửi reply → Guest gửi follow-up → Thread behavior, inbox update

---

## Kỹ thuật áp dụng
- **State Transition:** Thread Unread → Read → (Host reply) → Guest follow-up → Unread lại
- **Negative Path:** Guest follow-up KHÔNG tạo thread mới
- **Reliability:** Append đúng thứ tự, không mất tin, không duplicate

---

| TC ID | Module | Test Scenario | Pre-Condition | Test Steps | Test Data | Expected Result | Priority |
|-------|--------|---------------|---------------|------------|-----------|-----------------|----------|
| YR_MSG_REPLY_TC_001 | Host Reply | Host reply — tin nhắn được append vào thread hiện có | - Đã mở 1 conversation (có ít nhất 1 tin từ guest) | 1. Truy cập `/conversations`<br>2. Mở thread "Canh Pham"<br>3. Nhập vào compose area: `Cảm ơn bạn đã đặt phòng! Check-in lúc 14:00.`<br>4. Click Send (`data-test-id="action-icon-send"`) | Conversation: Canh Pham<br>Reply: `Cảm ơn bạn đã đặt phòng! Check-in lúc 14:00.` | 1. Tin nhắn của host xuất hiện **cuối cùng** trong thread (chronological order)<br>2. Tin nhắn hiển thị ở **bên phải** (phía host)<br>3. **Không** tạo thread mới — vẫn trong cùng conversation<br>4. Ô compose tự động xóa sau khi send | Critical |
| YR_MSG_REPLY_TC_002 | Host Reply | Host reply cập nhật latest message preview trong inbox | - Đã gửi reply thành công (TC_001) | 1. Sau khi send reply, quay lại danh sách `/conversations`<br>2. Quan sát thread "Canh Pham" trong list | Reply: `Cảm ơn bạn đã đặt phòng! Check-in lúc 14:00.` | 1. `conversation-last-message` cập nhật thành: "You: Cảm ơn bạn đã đặt phòng! Check-in lúc 14:00."<br>2. Timestamp cập nhật thành "Just now" hoặc thời điểm vừa gửi<br>3. Preview hiển thị đúng nội dung tin cuối | High |
| YR_MSG_REPLY_TC_003 | Host Reply | Host reply move thread lên đầu danh sách | - Inbox có ít nhất 2 conversation<br>- Thread "Canh Pham" không phải item đầu tiên | 1. Ghi nhớ vị trí thread "Canh Pham" trong list<br>2. Host gửi reply vào thread "Canh Pham"<br>3. Quan sát danh sách | Thread: Canh Pham (không phải #1) | 1. Sau khi send reply: thread "Canh Pham" **move lên vị trí đầu tiên**<br>2. Các thread khác bị đẩy xuống<br>3. Thứ tự sắp xếp phản ánh "newest activity first" | High |
| YR_MSG_REPLY_TC_004 | Guest Follow-up | Guest gửi follow-up — append vào thread cũ, KHÔNG tạo thread mới | - Thread "Canh Pham" đã tồn tại và có lịch sử<br>- Host biết total conversation count hiện tại | **[Guest side]**<br>1. Guest gửi tin tiếp theo vào hội thoại đã có: `Cho tôi hỏi thêm về chỗ để xe.`<br><br>**[Host side]**<br>2. Quan sát `/conversations`<br>3. Đếm số conversation (so sánh với trước) | Thread: Canh Pham (đã có)<br>Follow-up: `Cho tôi hỏi thêm về chỗ để xe.` | 1. **Tổng số conversation KHÔNG tăng** — không có thread mới<br>2. Tin follow-up xuất hiện trong thread cũ, cuối danh sách tin<br>3. Latest preview trong inbox cập nhật: "Cho tôi hỏi thêm về chỗ để xe."<br>4. Thread move lên đầu inbox | Critical |
| YR_MSG_REPLY_TC_005 | Guest Follow-up | Guest follow-up — host nhận indicator Unread | - Thread đang ở trạng thái Read (host đã đọc)<br>- Guest gửi follow-up message | 1. Mở thread "Canh Pham", đọc xong → trạng thái Read<br>2. Guest gửi follow-up: `Cho tôi hỏi thêm về chỗ để xe.`<br>3. Quan sát badge và list từ phía host | Follow-up: `Cho tôi hỏi thêm về chỗ để xe.` | 1. Thread chuyển từ Read → **Unread**<br>2. Badge đếm tin chưa đọc trong nav tăng lên<br>3. Thread move lên đầu danh sách<br>4. Timestamp cập nhật | High |
| YR_MSG_REPLY_TC_006 | Guest Follow-up | Nhiều lượt reply — thứ tự chronological đúng | - Thread "Canh Pham" có lịch sử tin | 1. Host gửi: `Xin chào! Check-in lúc 14:00.`<br>2. Guest gửi: `Cảm ơn bạn.`<br>3. Host gửi: `Rất vui được phục vụ.`<br>4. Mở thread và quan sát thứ tự tin nhắn | Tin 1 (host): `Xin chào! Check-in lúc 14:00.`<br>Tin 2 (guest): `Cảm ơn bạn.`<br>Tin 3 (host): `Rất vui được phục vụ.` | 1. Tin nhắn hiển thị đúng thứ tự từ trên xuống: Tin 1 → Tin 2 → Tin 3<br>2. Timestamp của từng tin nhắn tăng dần<br>3. Tin của host ở bên phải, tin của guest ở bên trái<br>4. Không có tin bị đảo thứ tự hoặc mất | Critical |
| YR_MSG_REPLY_TC_007 | Host Reply | Lịch sử tin nhắn đầy đủ khi mở conversation | - Thread có ít nhất 5 tin nhắn từ các lượt trao đổi trước | 1. Mở 1 thread có lịch sử dài (ví dụ: "Canh Pham")<br>2. Quan sát khu vực chat khi load | Thread: Canh Pham (nhiều lịch sử) | 1. Toàn bộ lịch sử tin nhắn được load<br>2. Thứ tự đúng chronological (cũ nhất ở trên)<br>3. `message-sender-name` hiển thị rõ cho mỗi tin<br>4. Không có tin bị thiếu so với thực tế | High |
