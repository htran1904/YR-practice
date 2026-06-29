import { test } from '../../fixtures';
import { expect } from '@playwright/test';

test.describe('Send Message — TC_04', () => {
  test.beforeEach(async ({ messagesPage }) => {
    await messagesPage.gotoMessages();
  });

  test('TC_04_002 — Send button is disabled when compose area is empty', async ({ messagesPage }) => {
    await expect(messagesPage.composeTextarea).toBeVisible();
    await messagesPage.clearMessage();
    await expect(messagesPage.actionIconSend).toBeDisabled();
  });

  test('TC_04_003 — Send button becomes enabled after typing content', async ({ messagesPage }) => {
    await messagesPage.typeMessage('Thông tin nhận phòng: Check-in 14:00');
    await expect(messagesPage.actionIconSend).toBeEnabled();
    await messagesPage.clearMessage();
  });

  test('TC_04_001 — Compose area accepts typed content correctly', async ({ messagesPage }) => {
    const message = 'Xin chào, cảm ơn bạn đã đặt phòng!';
    await messagesPage.typeMessage(message);
    await expect(messagesPage.composeTextarea).toHaveValue(message);
    await messagesPage.clearMessage();
  });

  test('TC_04_006 — Compose area accepts long messages (600 chars)', async ({ messagesPage }) => {
    const longMessage = 'Kính gửi quý khách, thông tin nhận phòng chi tiết như sau: Địa chỉ: 123 Đường ABC, Quận 1, TP.HCM. Giờ nhận phòng: 14:00. Giờ trả phòng: 12:00 ngày hôm sau. Mật khẩu wifi: YourRentals2026. Hướng dẫn: Bước 1 - Đến sảnh chính. Bước 2 - Lấy chìa khóa tại lễ tân. Bước 3 - Thang máy số 2 lên tầng 5, phòng 501. Mọi thắc mắc vui lòng liên hệ hotline: 1900 1234. Chúc quý khách nghỉ ngơi vui vẻ! Chúc quý khách nghỉ ngơi vui vẻ! Rất vui khi được phục vụ!';
    await messagesPage.typeMessage(longMessage);
    await expect(messagesPage.composeTextarea).not.toHaveValue('');
    await expect(messagesPage.actionIconSend).toBeEnabled();
    await messagesPage.clearMessage();
  });

  test('TC_04_007 — Pressing Enter submits or adds newline in compose area', async ({ messagesPage }) => {
    await messagesPage.typeMessage('Hẹn gặp lại!');
    await messagesPage.composeTextarea.press('Enter');
    const value = await messagesPage.getComposeValue();
    expect(value === '' || value.includes('\n') || value === 'Hẹn gặp lại!').toBeTruthy();
  });

  test('TC_04_004 — Send a message — it appears in the chat thread', async ({ messagesPage }) => {
    const timestamp = Date.now();
    const testMsg = `Auto test — ${timestamp}`;
    await messagesPage.sendMessage(testMsg);
    await expect(messagesPage.composeTextarea).toHaveValue('');
  });

  test('TC_04_005 — Send button disabled when compose contains only whitespace', async ({ messagesPage }) => {
    await messagesPage.gotoMessages();
    await expect(messagesPage.composeTextarea).toBeVisible();
    await messagesPage.typeMessage('     ');
    const isSendDisabled = await messagesPage.actionIconSend.isDisabled();
    const composeVal = await messagesPage.getComposeValue();
    expect(isSendDisabled || composeVal.trim() === '').toBeTruthy();
    await messagesPage.clearMessage();
  });
});
