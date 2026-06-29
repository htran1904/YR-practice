# Your.Rentals — Messages Feature Test Plan Summary

## 1. Purpose of the Messages Feature

The **Messages module** is a communication hub between property hosts and guests.
It allows hosts to manage conversations related to bookings in one unified inbox.

Typical use cases:

* Answer guest questions
* Send booking details
* Provide check-in instructions
* Share files or directions
* Manage booking-related conversations

---

# 2. Main Functions

## 2.1 Unified Inbox

All guest messages from different booking channels appear in **one single inbox**.

Capabilities:

* View conversations with guests
* Reply to messages
* Track unread messages
* Manage multiple guest conversations in one place

Example UI structure:

```
Messages
 ├── Conversation list
 │     ├── Guest A
 │     ├── Guest B
 │     └── Guest C
 │
 └── Chat window
       ├── Guest message
       ├── Host reply
       └── Attachments
```

---

## 2.2 Automatic Conversation Creation

A conversation is automatically created when:

* A Direct Booking offer is sent
* A booking is received
* A guest interacts with a listing

This ensures communication starts immediately after booking.

---

## 2.3 Send Messages to Guests

Hosts can:

* Write custom messages
* Send instructions before arrival
* Ask for booking details
* Confirm check-in

Typical workflow:

```
Host receives booking
      ↓
Conversation created
      ↓
Host sends welcome message
      ↓
Guest asks questions
      ↓
Host responds in chat
```

---

## 2.4 Message Templates

Hosts can create **message templates** for common responses.

Examples:

* Check-in instructions
* Wi-Fi information
* House rules
* Welcome messages

Benefits:

* Faster replies
* Consistent communication
* Less manual typing

---

## 2.5 File Attachments

Hosts can send files to guests such as:

* Maps
* Check-in guides
* Property instructions
* Documents

This improves guest experience before arrival.

---

## 2.6 Channel Messaging Limitations

Some booking channels do not support the messaging integration.

Examples:

* Agoda
* Trip.com
* Locasun
* Cozystay

For these channels, hosts may need to contact the guest via email.

---

# 3. Notifications

The system provides **real-time updates** when:

* New messages arrive
* Guests reply
* Booking inquiries occur

Notifications appear in:

* Dashboard
* Mobile app
* Messaging page

---

# 4. Typical User Flow

```
Login
  ↓
Go to Messages
  ↓
Open conversation
  ↓
Read guest message
  ↓
Reply to guest
  ↓
Attach file / send instructions
```

---

# 5. Related Modules

| Feature    | Relationship                    |
| ---------- | ------------------------------- |
| Bookings   | Conversations linked to booking |
| Calendar   | Messaging about stay dates      |
| Dashboard  | Shows unread messages           |
| Mobile App | Reply on phone                  |
