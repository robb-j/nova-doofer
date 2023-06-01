export class InvalidKubeSecretNotification extends NotificationRequest {
  constructor() {
    super("invalid-kube-secret");
    this.title = nova.localize("Invalid Kubernetes Secret");
    this.body = nova.localize(
      "The selected string is not a well-formed kubernetes secret output"
    );
  }
}
