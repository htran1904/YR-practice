# TC_10 — Message Content & Reliability

**Module:** Message Content Support & Reliability  
**Spec ref:** `mess_flow.md` Section 10 (Content Support), Section 11 (Reliability), Section 12 (AC)  
**Scope:** Kiểm tra các loại nội dung tin nhắn và tính đáng tin cậy của hệ thống

---

## Kỹ thuật áp dụng
- **EP:** Plain text / Multiline / Emoji / Unicode / Long text
- **BVA:** Nội dung tại giới hạn ký tự
- **Negative Path:** Double-click send (duplicate message), nội dung thay đổi sau sync
- **Reliability:** Persist sau refresh, không mất tin, không duplicate

---

| TC ID | Module | Test Scenario | Pre-Condition | Test Steps | Test Data | Expected Result | Priority |
|-------|--------|---------------|---------------|------------|-----------|-----------------|----------|
| YR_MSG_RELY_TC_001 | Message Content | Gửi tin nhắn multiline (Shift+Enter) | - Đang xem 1 hội thoại | 1. Mở 1 conversation bất kỳ<br>2. Nhập dòng 1: `Xin chào!`<br>3. Nhấn **Shift+Enter** để xuống dòng<br>4. Nhập dòng 2: `Check-in lúc 14:00 nhé.`<br>5. Click **Send** | Dòng 1: `Xin chào!`<br>Dòng 2: `Check-in lúc 14:00 nhé.`<br>Định dạng: 2 dòng | 1. Tin nhắn gửi thành công với 2 dòng<br>2. Trong chat: nội dung giữ đúng định dạng 2 dòng (line break được bảo toàn)<br>3. Không bị gộp thành 1 dòng | High |
| YR_MSG_RELY_TC_002 | Message Content | Gửi tin nhắn chứa emoji | - Đang xem 1 hội thoại | 1. Mở 1 conversation bất kỳ<br>2. Nhập nội dung: `Chào mừng đến với căn hộ của chúng tôi! 🏠😊✨`<br>3. Click **Send** | Message: `Chào mừng đến với căn hộ của chúng tôi! 🏠😊✨` | 1. Tin nhắn gửi thành công<br>2. Emoji hiển thị đúng trong chat (không bị mã hóa thành ký tự lạ)<br>3. Nội dung emoji khớp với những gì đã gõ | High |
| YR_MSG_RELY_TC_003 | Message Content | Gửi tin nhắn chứa ký tự Unicode (tiếng Việt, tiếng Nhật) | - Đang xem 1 hội thoại | 1. Mở 1 conversation bất kỳ<br>2. Nhập nội dung tiếng Việt: `Kính gửi quý khách, thông tin nhận phòng chi tiết như sau:`<br>3. Click **Send**<br>4. Gửi thêm tin tiếng Nhật (nếu cần test): `ようこそ！チェックインは14時です。` | Tin 1: `Kính gửi quý khách, thông tin nhận phòng chi tiết như sau:`<br>Tin 2 (optional): `ようこそ！チェックインは14時です。` | 1. Tin nhắn gửi thành công<br>2. Ký tự Unicode hiển thị đúng, không bị lỗi font<br>3. Không bị encode sai (không thấy ký tự `?` hay ký tự thay thế) | High |
| YR_MSG_RELY_TC_004 | Message Content | Nội dung tin nhắn không thay đổi sau khi sync | - Đã gửi 1 tin nhắn thành công | 1. Gửi tin nhắn: `Thông tin wifi: Network: YourRentals_5G, Password: Yr@2026!`<br>2. Quan sát tin trong chat ngay sau khi gửi<br>3. Reload trang (`F5`)<br>4. Quan sát lại nội dung tin nhắn | Message: `Thông tin wifi: Network: YourRentals_5G, Password: Yr@2026!` | 1. Nội dung tin nhắn **giữ nguyên** sau reload<br>2. Không bị thay đổi ký tự, cắt bớt hay encode sai<br>3. Thứ tự tin nhắn không thay đổi | High |
| YR_MSG_RELY_TC_005 | Reliability | Không tạo tin nhắn trùng khi double-click Send | - Đang xem 1 hội thoại | 1. Nhập nội dung: `Tin nhắn test double-click`<br>2. **Double-click** nhanh vào nút Send (`data-test-id="action-icon-send"`) | Message: `Tin nhắn test double-click` | 1. Chỉ **1 tin nhắn** xuất hiện trong chat (không có duplicate)<br>2. Hệ thống debounce hoặc disable nút sau click đầu tiên<br>3. Không có error hoặc duplicate message | Critical |
| YR_MSG_RELY_TC_006 | Reliability | Tin nhắn không bị mất sau khi reload trang | - Đã gửi ít nhất 3 tin nhắn trong 1 thread | 1. Gửi 3 tin nhắn liên tiếp trong thread "Canh Pham":<br>   - Tin A: `Kiểm tra tính bền vững — Tin 1`<br>   - Tin B: `Kiểm tra tính bền vững — Tin 2`<br>   - Tin C: `Kiểm tra tính bền vững — Tin 3`<br>2. Nhấn F5 reload<br>3. Mở lại thread, đếm số tin | Tin A: `Kiểm tra tính bền vững — Tin 1`<br>Tin B: `Kiểm tra tính bền vững — Tin 2`<br>Tin C: `Kiểm tra tính bền vững — Tin 3` | 1. Cả 3 tin nhắn vẫn hiển thị đủ sau reload<br>2. Thứ tự: Tin A → Tin B → Tin C (chronological)<br>3. Không có tin bị mất<br>4. Nội dung mỗi tin khớp chính xác với những gì đã gửi | Critical |
| YR_MSG_RELY_TC_007 | Reliability | Sync nhất quán giữa host inbox và guest side | - Thread có cả tin từ host và guest | 1. Host gửi tin: `Phòng sạch và đầy đủ tiện nghi.`<br>2. Quan sát trên giao diện host (chat window)<br>3. Guest mở conversation từ phía guest<br>4. So sánh nội dung hiển thị 2 bên | Host message: `Phòng sạch và đầy đủ tiện nghi.` | 1. Tin nhắn xuất hiện đúng trên **cả 2 phía**: host và guest<br>2. Nội dung, timestamp, thứ tự tin **khớp nhau** giữa 2 view<br>3. Không có độ trễ lớn (> 5 giây) giữa khi gửi và khi guest thấy | High |
| YR_MSG_RELY_TC_008 | Reliability | Inbox sắp xếp đúng — thread mới nhất luôn ở trên đầu | - Inbox có nhiều thread với các timestamp khác nhau | 1. Ghi nhớ timestamp của 3 thread đầu tiên trong list<br>2. Gửi reply vào thread ở vị trí thứ 3<br>3. Quan sát lại thứ tự | Thread vị trí 3: gửi reply mới | 1. Thread vừa reply **move lên vị trí #1** trong danh sách<br>2. Thread cũ (#1 và #2 ban đầu) tụt xuống dưới<br>3. Timestamp hiển thị "Just now" cho thread vừa active | High |
