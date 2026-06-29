import { Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class MessagesPage extends BasePage {
  readonly conversationItem = this.page.getByTestId("conversation-item");
  readonly conversationGuestName = this.page.getByTestId("conversation-guest-name");
  readonly conversationLastMessage = this.page.getByTestId("conversation-last-message");
  readonly conversationStatus = this.page.getByTestId("conversation-status");
  readonly conversationLastActivityAt = this.page.getByTestId("conversation-last-activity-at");
  readonly messageSenderName = this.page.getByTestId("message-sender-name");
  readonly btnUnread = this.page.getByTestId("btn-unread");
  readonly btnFilters = this.page.getByTestId("btn-filters");
  readonly manageQuickRepliesButton = this.page.getByTestId("manage-quick-replies-button");
  readonly btnGenerateReply = this.page.getByTestId("btn-generate-reply");
  readonly btnQuickReplies = this.page.getByTestId("btn-quick-replies");
  readonly actionIconSend = this.page.getByTestId("action-icon-send");
  readonly guestsDetails = this.page.getByTestId("guests-details");
  readonly btnAccept = this.page.getByTestId("btn-accept");
  readonly btnDecline = this.page.getByTestId("btn-decline");
  readonly messagesMenu = this.page.getByTestId("messages-menu");
  readonly composeTextarea = this.page.getByPlaceholder("Type a message...");

  // Attachment — data-test-id verified from live DOM inspection
  readonly attachFileButton = this.page.getByTestId("attach-file");
  readonly attachFileInput = this.page.locator('input[type="file"]');
  // Preview locators below are TBD — update after first upload run
  readonly attachedFilePreview = this.page.getByTestId("attached-file-preview");
  readonly removeAttachmentButton = this.page.getByTestId("remove-attachment");

  constructor(page: Page) {
    super(page);
  }

  async gotoMessages() {
    await this.goto("conversations");
    await this.dismissOverlays();
  }

  async gotoUnreadMessages() {
    await this.page.goto("https://goto.your.rentals/conversations?statuses=unread");
    await this.dismissOverlays();
  }

  async dismissOverlays() {
    const allowAll = this.page.getByRole("button", { name: "Allow all" });
    if (await allowAll.isVisible({ timeout: 3000 })) {
      await allowAll.click();
    }
    const coachMark = this.page.getByTestId("coach-mark-close-button");
    if (await coachMark.isVisible({ timeout: 2000 })) {
      await coachMark.click();
    }
  }

  async clickGuestsNav() {
    await this.page.locator("#guest-menu-item").click();
  }

  async clickMessagesMenu() {
    await this.messagesMenu.click();
  }

  async clickUnreadFilter() {
    await this.btnUnread.click();
  }

  async clickFiltersButton() {
    await this.btnFilters.click();
  }

  async clickManageQuickReplies() {
    await this.manageQuickRepliesButton.click();
  }

  async clickFirstConversation() {
    await this.conversationItem.first().click();
  }

  async clickConversationWithStatus(status: string) {
    const item = this.conversationItem.filter({
      has: this.page.getByTestId("conversation-status").filter({ hasText: status }),
    });
    await item.first().click();
  }

  // Open a specific conversation by matching text in the list item (e.g. the
  // last-message preview). Use when .first() would land on the wrong thread.
  async openConversationByText(text: string) {
    const item = this.conversationItem.filter({ hasText: text }).first();
    await item.scrollIntoViewIfNeeded();
    await item.click();
  }

  async typeMessage(message: string) {
    await this.composeTextarea.fill(message);
  }

  async clearMessage() {
    await this.composeTextarea.clear();
  }

  async sendMessage(message: string) {
    await this.composeTextarea.fill(message);
    await this.actionIconSend.click();
  }

  async clickGenerateReply() {
    await this.btnGenerateReply.click();
  }

  async clickQuickReplies() {
    await this.btnQuickReplies.click();
  }

  async clickAcceptBooking() {
    await this.btnAccept.click();
  }

  async clickDeclineBooking() {
    await this.btnDecline.click();
  }

  async getFirstConversationPreview(): Promise<string> {
    return (await this.conversationLastMessage.first().textContent()) ?? "";
  }

  async getComposeValue(): Promise<string> {
    return await this.composeTextarea.inputValue();
  }

  async pressShiftEnterInCompose() {
    await this.composeTextarea.press("Shift+Enter");
  }

  async hasConversationWithStatus(status: string): Promise<boolean> {
    const count = await this.conversationItem
      .filter({ has: this.page.getByTestId("conversation-status").filter({ hasText: status }) })
      .count();
    return count > 0;
  }
  async uploadImage(imagePath: string): Promise<void> {
    await this.attachFileInput.setInputFiles(imagePath);
  }
}
