export class InvalidJwtNotification extends NotificationRequest {
  constructor() {
    super("jwt-invalid");
    this.title = nova.localize("Invalid JWT");
    this.body = nova.localize(
      "The text you have selected is not a valid JWT string"
    );
  }
}
