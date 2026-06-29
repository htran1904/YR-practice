# Test Cases — Messages Feature (Your.Rentals)

**Nguồn:** `specs/messages-feature-summary.md`  
**URL:** `https://goto.your.rentals/conversations`  
**Mode:** QUICK (RBT Manual Testing)  
**Ngày sinh:** 2026-04-24  

---

## Phân rã Module

### Batch 1 — từ `messages-feature-summary.md`

| File | Module | Số TC |
|------|--------|-------|
| [TC_01_navigation_inbox.md](TC_01_navigation_inbox.md) | Navigation & Unified Inbox | 6 |
| [TC_02_filters.md](TC_02_filters.md) | Bộ lọc & Tìm kiếm | 7 |
| [TC_03_conversation_view.md](TC_03_conversation_view.md) | Xem hội thoại & Booking Actions | 7 |
| [TC_04_send_message.md](TC_04_send_message.md) | Soạn & Gửi tin nhắn | 7 |
| [TC_05_templates_generate_reply.md](TC_05_templates_generate_reply.md) | Quick Replies, Generate Reply & Đính kèm | 6 |

### Batch 2 — từ `mess_flow.md`

| File | Module | Số TC |
|------|--------|-------|
| [TC_06_flow_a_inquiry.md](TC_06_flow_a_inquiry.md) | Flow A: Contact With Host (Inquiry) | 6 |
| [TC_07_flow_b_booking_request.md](TC_07_flow_b_booking_request.md) | Flow B: Booking Request with message | 6 |
| [TC_08_thread_states.md](TC_08_thread_states.md) | Thread States (Unread / Read / Persist) | 6 |
| [TC_09_reply_followup.md](TC_09_reply_followup.md) | Host Reply & Guest Follow-up | 7 |
| [TC_10_message_content_reliability.md](TC_10_message_content_reliability.md) | Message Content & Reliability | 8 |

**Tổng:** 66 test cases

---

## TC ID Format

```
YR_MSG_[MODULE]_TC_[SỐ]

YR   = Your.Rentals
MSG  = Messages
NAV  = Navigation & Inbox
FLT  = Filters
CONV = Conversation View
SEND = Send Message
TMPL = Templates & Generate Reply
```

## Pre-condition chung

- Môi trường: `https://goto.your.rentals`
- Tài khoản: `canh.pham01@your.rentals` / `Canh1997`
- Đã chọn account: **Canh Company**
- Session đã được xác thực (storageState loaded)
