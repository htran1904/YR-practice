import { Page, Locator } from '@playwright/test';
import { BasePage } from './basePage';

export class NotificationsPage extends BasePage {
  // ── Header notification icon (global navbar, visible on any authenticated page) ──
  // <div id="notification-icon" class="notification pull-right">
  //   <span class="dotted">9+</span>            ← numeric count badge (ng-if: count > 0)
  //   <a href="#"><span class="lnr lnr-alarm"></span></a>  ← bell icon
  // </div>
  readonly notificationIcon: Locator = this.page.locator('#notification-icon');

  // The numeric count badge ("9", "9+", ...). Only rendered when count > 0.
  readonly headerBadge: Locator = this.page.locator('#notification-icon span.dotted');

  // The bell icon — clicking it (or the badge) toggles the dropdown panel.
  readonly notificationBellLink: Locator = this.page.locator('#notification-icon .lnr-alarm');

  // ── Notification dropdown panel (appears after clicking the badge/bell) ──
  // <div id="notification-list" class="notifications" ng-show="vm.showNotificationList">
  readonly notificationPanel: Locator = this.page.locator('#notification-list');

  // Tabs (only present when the account switcher has organization notifications)
  readonly tabAccount: Locator = this.notificationPanel.getByText('Account', { exact: true });
  readonly tabOrganization: Locator = this.notificationPanel.getByText('Organization', { exact: true });

  // Each notification row is an <li ng-repeat="notification in vm.accountNotifications">
  readonly notificationItem: Locator = this.notificationPanel.locator('li[ng-repeat]');
  // Title link inside an item: <a class="title"><span title="...">New booking inquiry!</span></a>
  readonly notificationTitle: Locator = this.notificationItem.locator('a.title');
  // Date line: <p><span class="lnr-clock3"></span><span>03 Jun, 2026</span></p>
  readonly notificationTimestamp: Locator = this.notificationItem.locator('span.lnr-clock3 + span');
  // Unread indicator: <span class="unread"> (gains class "ng-hide" once seen)
  readonly notificationUnreadDot: Locator = this.notificationPanel.locator('span.unread:not(.ng-hide)');
  // Per-item dismiss button: <span class="lnr lnr-cross close-notification-button">
  readonly closeNotificationButton: Locator = this.notificationPanel.locator('.close-notification-button');
  // Footer button: <button class="btn btn-primary">Mark all as read</button>
  readonly btnMarkAllRead: Locator = this.notificationPanel.getByRole('button', { name: 'Mark all as read' });

  // ── Notification Preferences page (/notifications) ───────────────────────
  readonly sectionBookingNotifications: Locator = this.page
    .getByText('Booking notifications', { exact: true });
  readonly sectionPayoutNotifications: Locator = this.page
    .getByText('Payout notifications', { exact: true });
  readonly preferenceEmailColumn: Locator = this.page.getByText('Email', { exact: true }).first();
  readonly preferenceSMSColumn: Locator = this.page.getByText('SMS', { exact: true }).first();

  constructor(page: Page) {
    super(page);
  }

  // Navigate to the notification PREFERENCES page
  async gotoNotificationPreferences(): Promise<void> {
    await this.goto('notifications');
    await this.dismissOverlays();
  }

  // Navigate to dashboard — icon is visible on any authenticated page
  async gotoDashboard(): Promise<void> {
    await this.goto('dashboard');
    await this.dismissOverlays();
  }

  async dismissOverlays(): Promise<void> {
    const allowAll = this.page.getByRole('button', { name: 'Allow all' });
    if (await allowAll.isVisible({ timeout: 3000 }).catch(() => false)) {
      await allowAll.click();
    }
    const coachMark = this.page.getByTestId('coach-mark-close-button');
    if (await coachMark.isVisible({ timeout: 2000 }).catch(() => false)) {
      await coachMark.click();
    }
  }

  async getBadgeCount(): Promise<number> {
    const text = (await this.headerBadge.textContent().catch(() => '0')) ?? '0';
    return parseInt(text.replace('+', '').trim(), 10);
  }

  async hasBadge(): Promise<boolean> {
    return this.headerBadge.isVisible().catch(() => false);
  }

  // Open the dropdown panel by clicking the bell, then wait for it to render.
  async openPanel(): Promise<void> {
    await this.notificationBellLink.click();
    await this.notificationPanel.waitFor({ state: 'visible' });
  }

  async clickHeaderBadge(): Promise<void> {
    await this.headerBadge.click();
  }

  async clickNotificationBell(): Promise<void> {
    await this.notificationBellLink.click();
  }

  async clickFirstNotification(): Promise<void> {
    await this.notificationItem.first().locator('a.title').click();
  }

  async clickMarkAllRead(): Promise<void> {
    await this.btnMarkAllRead.click();
  }

  async getUnreadCount(): Promise<number> {
    return this.notificationUnreadDot.count();
  }

  async getItemCount(): Promise<number> {
    return this.notificationItem.count();
  }
}
