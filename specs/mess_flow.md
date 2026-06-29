# File: `messages-feature-requirement.md`

# Your.Rentals — Messages Feature Requirement

## 1. Objective

The **Messages feature** enables guests and hosts to communicate through a centralized conversation thread in the Conversations inbox.

This document focuses ONLY on:

* Conversation creation
* Synchronization to Conversations inbox
* Message delivery and reply flow
* Conversation state management

### Out of Scope

* Booking validation (dates, payment, guest count, payment status, etc.)
* Contact form field-level validation (except successful message submission)
* Authentication / account creation logic
* Reservation business rules unrelated to messaging

---

## 2. Conversation Entry Points

A conversation thread can be created from:

1. **Contact With Host (Inquiry)**
2. **Booking Request (with message)**

All created conversations must appear in:

```text
/conversations
```

---

## 3. Flow A — Contact With Host

### Trigger

Guest navigates to:

```text
https://goto.your.rentals/p/{propertyId}
```

Then:

```text
Click "Contact with host"
→ Fill contact form
→ Enter message
→ Submit
```

---

### Expected Behavior

System must:

1. Create a new conversation thread
2. Generate unique `threadId`
3. Create initial guest message
4. Associate thread with `propertyId`
5. Assign host as recipient
6. Sync thread into Conversations inbox
7. Mark thread as **Unread**
8. Show latest message preview
9. Sort thread to top (latest first)

---

### Metadata

```text
source = inquiry
threadType = guest_to_host
propertyId = xxx
bookingId = null
sender = guest
recipient = host
status = unread
```

---

## 4. Flow B — Booking Request

### Trigger

Guest completes booking flow and includes:

```text
message to host
```

Then submits booking request.

---

### Expected Behavior

System must:

1. Create booking-linked conversation thread
2. Generate unique `threadId`
3. Create initial guest message
4. Link thread with `bookingId`
5. Associate thread with `propertyId`
6. Assign host as recipient
7. Sync thread into Conversations inbox
8. Mark thread as **Unread**
9. Show latest message preview
10. Sort newest first

---

### Metadata

```text
source = booking_request
threadType = booking_related
propertyId = xxx
bookingId = xxx
sender = guest
recipient = host
status = unread
```

---

## 5. Conversations Inbox Behavior

Each conversation must display:

* Guest name
* Property reference
* Latest message preview
* Timestamp
* Unread indicator
* Source type (Inquiry / Booking)

### Rules

* Newest conversation appears on top
* No duplicate thread created for same action
* Data persists after refresh / re-login

---

## 6. Open Conversation

When host opens a conversation:

System must:

* Load full message history
* Display sender identity
* Display messages in chronological order
* Preserve message formatting
* Mark thread as **Read**

---

## 7. Host Reply

When host replies:

System must:

1. Append reply to existing thread
2. Persist message
3. Update latest message preview
4. Move thread to top
5. Mark guest-side unread (if supported)
6. Trigger notification (if supported)

---

## 8. Guest Follow-up

When guest sends another message:

System must:

* Append to existing thread
* NOT create new thread
* Update latest preview
* Update timestamp
* Reorder inbox
* Increment unread count for host

---

## 9. Thread States

Supported states:

```text
Unread
Read
Archived
Closed (optional)
Deleted (optional)
```

### Rules

* State persists after reload
* State transitions remain consistent

---

## 10. Message Content Support

System must support:

* Plain text
* Multiline text
* Emoji / Unicode
* Long text (within supported limit)

### Rules

* Content must remain unchanged after sync
* Content must persist correctly after refresh

---

## 11. Reliability

System must ensure:

* No message loss
* No duplicate message
* Correct chronological ordering
* Correct thread linkage
* Data persistence after refresh
* Sync consistency between guest-side and host-side inbox

---

## 12. Acceptance Criteria

The feature is considered correct when:

✅ Contact With Host creates conversation thread
✅ Booking Request creates conversation thread
✅ Conversation appears in `/conversations`
✅ Metadata is correct
✅ Host reply appends correctly
✅ Guest follow-up appends correctly
✅ Read / Unread state updates correctly
✅ Conversation ordering is correct
✅ No duplicate threads
✅ No message loss

---

## 13. Generate Test Cases Prompt (for AI)

Use this requirement to generate:

* Functional Test Cases
* Negative Test Cases
* Edge Cases
* API Test Cases
* UI Test Cases
* Playwright Automation Scenarios

Prompt:

```text
Generate complete test cases for Messages feature based on messages-feature-requirement.md.
Cover:
- Inquiry flow
- Booking request flow
- Sync to /conversations
- Open conversation
- Host reply
- Guest follow-up
- State changes
- Reliability
```
