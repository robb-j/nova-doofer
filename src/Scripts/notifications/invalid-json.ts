export class InvalidJsonNotification extends NotificationRequest {
  constructor() {
    super("invalid-json");
    this.title = nova.localize("Invalid JSON string");
    this.body = nova.localize("The selected string is not valid JSON");
  }
}
