export class NothingSelectedNotification extends NotificationRequest {
  constructor() {
    super("base64-nothing-selected");
    this.title = nova.localize("Nothing selected");
    this.body = nova.localize(
      "This command works on the text you have selected"
    );
  }
}
