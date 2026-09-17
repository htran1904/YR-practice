# Message Filter — Test Design & Test-Case Estimation

> Feature: bộ lọc hội thoại trong **Messages** (`/conversations`) trên https://goto.your.rentals/
> Mục tiêu tài liệu: thiết kế **test data đầu vào** + **ước lượng số lượng TC** (chưa automation).
> Trạng thái: draft để review. Chưa viết code.

---

## 1. Bối cảnh & ràng buộc

- Account test (`Canh Company`) đã có sẵn **~100–1000 conversation** → dùng làm **background noise** (bối cảnh thật), **không** dùng để assert.
- **Không có delete API** cho booking/conversation → **không thể cleanup sau mỗi TC**.
- Filter là chức năng **read-only** → không cần cleanup nếu tổ chức data đúng cách.
- Backend là môi trường **dev** (`property-manager-gateway-dev.your.rentals`, `api-internal-dev.your.rentals`) → được phép seed data.

### Hệ quả thiết kế
1. **Không assert count tuyệt đối** trên toàn inbox (data cũ + data trôi theo ngày làm sai).
2. Seed một **golden dataset nhỏ, có token cố định** (`ZZQA…`), assert kiểu **membership (in/out)** chỉ trên các "cây kim" này.
3. Seeder **idempotent**: search theo token trước khi tạo → có rồi thì tái dùng, thiếu thì tạo → golden set tạo *một lần*, không phình vì không xoá được.

---

## 2. Các chiều filter (khảo sát từ live DOM)

Panel mở bằng nút **Filters** (`btn-filters`).

| # | Chiều filter | Kiểu điều khiển | Giá trị | `data-test-id` |
|---|---|---|---|---|
| P1 | **Search booking details** | text input | booking reference **hoặc** guest name | `input-search-booking-details` (placeholder `e.g. 2SGRIY or John Doe`) |
| P2 | **Channels** | dropdown | All / Booking.com / Airbnb / Direct (Your.Rentals) | `input-search-Channels` |
| P3 | **Listings** | dropdown | All / listing cụ thể | `input-search-Listings` |
| P4 | **Booking stage** | 3 checkbox (multi-select, OR trong nhóm) | Requests, inquiries & offers / Currently staying / Upcoming check-ins | `checkbox-request-inquiries-and-offers`, `checkbox-currently-staying`, `checkbox-upcoming-check-ins` |
| P5 | **Unread** | toggle button (ngoài panel) | on / off | `btn-unread` (URL `?statuses=unread`) |

**Ngữ nghĩa:** các chiều kết hợp theo **AND** (giao tập). Trong P4, nhiều checkbox = **OR**. Các stage phụ thuộc **ngày so với hôm nay**:
- *Currently staying*: `checkIn ≤ hôm nay ≤ checkOut`
- *Upcoming check-ins*: `checkIn > hôm nay`
- *Requests, inquiries & offers*: hội thoại tiền-booking (inquiry / request / offer)

**Data hiển thị trên list item** (dùng để assert): `conversation-guest-name`, `conversation-status`, `conversation-ref`, `conversation-last-message`, `conversation-last-activity-at`, `unread-indicator`.

---

## 3. Chiến lược test data: "kim trong đống rơm"

- **Đống rơm** = data có sẵn (giữ nguyên, làm nền realistic).
- **Kim** = golden dataset seed có token `ZZQA`.
- Assert **chỉ trên kim**: filter khớp → kim **hiện**; filter loại → kim **biến mất**. Miễn nhiễm với data nền + chạy song song an toàn nhờ token.
- Ô search theo token là cách **né phân trang** (`_limit=100`): lọc còn đúng vài kim nên không lo kim nằm ở trang sau.

---

## 4. Golden dataset (10 needle — token `ZZQA`)

Listing tham chiếu: **L1 = 381351** (Hà Nội), **L2 = 413502** (Huế).
Ngày ghi tương đối so với **hôm nay (T)**.

| ID | Guest name | Booking ref | Channel | Listing | Stage (ngày) | Unread |
|----|-----------|-------------|---------|---------|--------------|:------:|
| N01 | `ZZQA Alice Nguyen` | `ZZQAA1` | Direct (YR) | L1 | Upcoming (T+10 → T+11) | ✅ |
| N02 | `ZZQA Alice Tran`   | `ZZQAA2` | Booking.com | L1 | Currently staying (T−1 → T+2) | — |
| N03 | `ZZQA Bob Le`       | `ZZQAB1` | Airbnb      | L2 | Upcoming (T+15 → T+16) | ✅ |
| N04 | `ZZQA Charlie Vo`   | `ZZQAC1` | Direct (YR) | L2 | Past (T−10 → T−8) *(không khớp stage nào)* | — |
| N05 | `ZZQA Dan Pham`     | `ZZQAD1` | Booking.com | L1 | Requests/inquiries & offers | ✅ |
| N06 | `ZZQA Emma Do`      | `ZZQAE1` | Airbnb      | L2 | Currently staying (T → T+3) | ✅ |
| N07 | `ZZQA Frank O'Neil` | `ZZQAF1` | Direct (YR) | L1 | Upcoming (T+5 → T+6) | — |
| N08 | `ZZQA alice bounce` | `ZZQAA3` | Booking.com | L2 | Upcoming (T+7 → T+8) | — |
| N09 | `ZZQA Grace Kim`    | `ZZQAG1` | Airbnb      | L1 | Requests/inquiries & offers | ✅ |
| N10 | `ZZQA Henry Ho`     | `ZZQAH1` | Direct (YR) | L2 | Currently staying (T−2 → T+1) | — |

### Các "trục" mà bộ này phủ (mỗi trục đều có mẫu khớp & không khớp)
- **Search theo name (substring):** `Alice` → {N01, N02, N08}; các needle khác ở ngoài.
- **Case-insensitive:** `alice` phải khớp cả `N08 (alice bounce)`.
- **Search theo ref:** `ZZQAA1` → chỉ {N01}; partial `ZZQAA` → {N01, N02, N08}.
- **Special char:** `O'Neil` (N07).
- **Channel:** Direct {N01,N04,N07,N10} · Booking.com {N02,N05,N08} · Airbnb {N03,N06,N09}.
- **Listing:** L1 {N01,N02,N05,N07,N09} · L2 {N03,N04,N06,N08,N10}.
- **Stage:** Upcoming {N01,N03,N07,N08} · Currently staying {N02,N06,N10} · Requests/inquiries&offers {N05,N09} · không-khớp {N04}.
- **Unread:** {N01,N03,N05,N06,N09}.

### Vài giao (dùng cho combination/pairwise)
- Channel=Booking.com **∧** Listing=L1 → {N02, N05}
- Search `Alice` **∧** Listing=L2 → {N08}
- Stage=Currently staying **∧** Unread=on → {N06}
- Channel=Airbnb **∧** Stage=Requests/inquiries&offers → {N09}

> ⚠️ **Giả định seeding** (cần xác nhận với API — xem §7): set được `guestName`, `bookingRef`/token, `checkIn/checkOut`, `channel`, và tạo được trạng thái *inquiry/offer* + *unread*. Nếu API **không set được channel** (thường channel đến từ sync), thì N02/N03/N05/N06/N08/N09 phải lấy từ data nền → nhóm **Channel filter** chuyển sang assert mềm hơn hoặc bị giới hạn.

---

## 5. Ước lượng Test Cases

Ký hiệu ưu tiên: **P1** = core/bắt buộc · **P2** = nên có · **P3** = mở rộng/optional.

### L0 — Panel & entry (4 TC)
| TC | Mô tả | Ưu tiên |
|----|-------|:------:|
| F-PNL-01 | Nút **Filters** hiển thị & mở panel | P1 |
| F-PNL-02 | Panel hiển thị đủ control (3 checkbox, Listings, Channels, Search) | P1 |
| F-PNL-03 | Đóng/toggle panel | P2 |
| F-PNL-04 | Nút **Unread** hiển thị & bật/tắt được | P1 |

### L1 — Search booking details (12 TC — equivalence classes)
| TC | Lớp tương đương | Input | Kỳ vọng | Ưu tiên |
|----|-----------------|-------|---------|:------:|
| F-SCH-01 | Ref đầy đủ | `ZZQAA1` | chỉ N01 | P1 |
| F-SCH-02 | Ref một phần | `ZZQAA` | N01,N02,N08 | P1 |
| F-SCH-03 | Ref sai hoa/thường | `zzqaa1` | N01 (case-insensitive) | P2 |
| F-SCH-04 | Guest name đầy đủ | `ZZQA Bob Le` | N03 | P1 |
| F-SCH-05 | First/substring name | `Alice` | N01,N02,N08 | P1 |
| F-SCH-06 | Last name | `Pham` | N05 | P2 |
| F-SCH-07 | Name sai hoa/thường | `alice` | N01,N02,N08 | P2 |
| F-SCH-08 | Trim khoảng trắng | `  Alice  ` | N01,N02,N08 | P2 |
| F-SCH-09 | No-match | `ZZQA_NOPE_xyz` | empty state | P1 |
| F-SCH-10 | Ký tự đặc biệt | `O'Neil` | N07, không crash | P2 |
| F-SCH-11 | Min chars / debounce | `Z` (1 ký tự) | hành vi xác định (không lọc / hoặc lọc sau debounce) | P3 |
| F-SCH-12 | Clear search khôi phục list | xoá text | list quay lại như trước lọc | P1 |

### L2 — Channel (4 TC)
| TC | Mô tả | Kỳ vọng | Ưu tiên |
|----|-------|---------|:------:|
| F-CHN-01 | Channel = Booking.com | N02,N05,N08 hiện; N01/N03/… ẩn | P1 |
| F-CHN-02 | Channel = Airbnb | N03,N06,N09 | P1 |
| F-CHN-03 | Channel = Direct (Your.Rentals) | N01,N04,N07,N10 | P1 |
| F-CHN-04 | All channels (default) | không giới hạn theo channel | P2 |

### L3 — Listing (4 TC)
| TC | Mô tả | Kỳ vọng | Ưu tiên |
|----|-------|---------|:------:|
| F-LST-01 | Listing = L1 (381351) | N01,N02,N05,N07,N09 | P1 |
| F-LST-02 | Listing = L2 (413502) | N03,N04,N06,N08,N10 | P1 |
| F-LST-03 | All listings (default) | không giới hạn theo listing | P2 |
| F-LST-04 | Search listing trong dropdown | gõ tên → lọc danh sách listing | P3 |

### L4 — Booking stage (6 TC)
| TC | Mô tả | Kỳ vọng | Ưu tiên |
|----|-------|---------|:------:|
| F-STG-01 | Requests, inquiries & offers | N05,N09 | P1 |
| F-STG-02 | Currently staying | N02,N06,N10 | P1 |
| F-STG-03 | Upcoming check-ins | N01,N03,N07,N08 | P1 |
| F-STG-04 | Multi-select 2 stage (OR) | ví dụ Currently + Upcoming → hợp 2 tập | P1 |
| F-STG-05 | Chọn cả 3 stage | hợp 3 tập; N04 (past) vẫn ẩn | P2 |
| F-STG-06 | Không chọn stage (default) | không giới hạn theo stage | P2 |

### L5 — Unread (3 TC)
| TC | Mô tả | Kỳ vọng | Ưu tiên |
|----|-------|---------|:------:|
| F-UNR-01 | Bật Unread | chỉ {N01,N03,N05,N06,N09}; URL `?statuses=unread` | P1 |
| F-UNR-02 | Tắt Unread | trở lại toàn bộ | P2 |
| F-UNR-03 | Vào thẳng URL `?statuses=unread` | filter áp dụng từ URL | P2 |

### L6 — Combination / AND-composition (pairwise) (6 TC)
| TC | Tổ hợp | Kỳ vọng | Ưu tiên |
|----|--------|---------|:------:|
| F-CMB-01 | Channel ∧ Listing | Booking.com + L1 → {N02,N05} | P1 |
| F-CMB-02 | Search(name) ∧ Listing | `Alice` + L2 → {N08} | P1 |
| F-CMB-03 | Stage ∧ Unread | Currently staying + Unread → {N06} | P1 |
| F-CMB-04 | Channel ∧ Stage | Airbnb + Requests/inquiries&offers → {N09} | P2 |
| F-CMB-05 | Search ∧ Stage | `Alice` + Upcoming → {N01,N08} | P2 |
| F-CMB-06 | 3 chiều (Channel ∧ Listing ∧ Search) | spot-check giao 3 tập | P3 |

### L7 — State / UX (5 TC)
| TC | Mô tả | Ưu tiên |
|----|-------|:------:|
| F-UX-01 | **Clear/Reset all** → khôi phục list đầy đủ | P1 |
| F-UX-02 | Badge/indicator số filter đang active | P3 |
| F-UX-03 | Filter **persist qua reload** (URL params) | P2 |
| F-UX-04 | Nội dung **empty state** khi không có kết quả | P2 |
| F-UX-05 | Filter còn giữ khi mở 1 conversation rồi quay lại | P3 |

### L8 — Non-functional (3 TC — optional)
| TC | Mô tả | Ưu tiên |
|----|-------|:------:|
| F-NF-01 | Filter còn responsive ở quy mô ~1000 conversation | P3 |
| F-NF-02 | Filter + phân trang (`_limit=100`) hoạt động đúng | P3 |
| F-NF-03 | Debounce/không gọi API dư khi gõ nhanh | P3 |

---

## 6. Tổng hợp số lượng TC

| Nhóm | Tổng | P1 (core) | P2 | P3 |
|------|:----:|:---------:|:--:|:--:|
| L0 Panel & entry | 4 | 3 | 1 | 0 |
| L1 Search | 12 | 5 | 5 | 2 |
| L2 Channel | 4 | 3 | 1 | 0 |
| L3 Listing | 4 | 2 | 1 | 1 |
| L4 Stage | 6 | 4 | 2 | 0 |
| L5 Unread | 3 | 1 | 2 | 0 |
| L6 Combination | 6 | 3 | 2 | 1 |
| L7 State/UX | 5 | 1 | 2 | 2 |
| L8 Non-functional | 3 | 0 | 0 | 3 |
| **Tổng** | **47** | **22** | **16** | **9** |

**Khuyến nghị chọn scope:**
- **Smoke / core (P1): ~22 TC** — đủ chứng minh mỗi filter đơn chạy đúng + composition + search cơ bản + reset.
- **Regression (P1+P2): ~38 TC** — mức khuyến nghị chạy định kỳ.
- **Đầy đủ (P1+P2+P3): 47 TC** — gồm cả edge case & non-functional.

> Nhờ **membership assertion + AND-composition chứng minh một lần**, chỉ cần **~10 needle** để phủ tới **47 TC** mà không nổ tổ hợp (full cartesian của 5 chiều sẽ là hàng trăm case).

---

## 7. Câu hỏi/giả định cần chốt trước khi automation

1. **API tạo booking set được field nào?** Đặc biệt: `channel` (Booking.com/Airbnb/direct), `guestName`, `bookingRef`/token, `checkIn`/`checkOut`.
2. Tạo được trạng thái **inquiry/offer** (cho stage *Requests, inquiries & offers*) và **unread** không?
3. Booking → conversation sinh ra **ngay hay async** (cần poll)? Response có trả `bookingRef`/`conversationId` để tra token không?
4. Có API **update** (đổi ngày) không — để giữ needle *currently staying*/*upcoming* luôn đúng bucket theo hôm nay (vì không xoá được)?
5. Có nút **Clear/Reset all** trong panel không (cần cho F-UX-01) — hay phải bỏ chọn từng cái?

---

## 8. Ghi chú triển khai (khi sang automation)
- Sửa `MessagesPage.dismissOverlays()` cho robust (coach-marks nhiều lớp + ẩn HubSpot iframe + promo "Not now") — đây là nguyên nhân fail của suite hiện tại.
- Thêm locator filter vào `pages/messagesPage.ts`: `input-search-booking-details`, `input-search-Channels`, `input-search-Listings`, 3 checkbox stage, `btn-unread`.
- Seeder idempotent theo token `ZZQA` (chạy 1 lần, tái dùng).
- Assert theo **membership** trên needle, tránh count tuyệt đối.
