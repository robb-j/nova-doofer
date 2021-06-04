import {
  InvalidBase64Notification,
  NothingSelectedNotification,
} from "../notifications";
import { createDebug } from "../debug";

const debug = createDebug("base64-decode");

export function base64DecodeCommand(workspace: Workspace) {
  try {
    const { selectedText, selectedRange } = workspace.activeTextEditor;

    if (!selectedText) {
      nova.notifications.add(new NothingSelectedNotification());
      return;
    }

    const output = atob(selectedText);
    debug(`input='${selectedText}' output=${output}`);

    workspace.activeTextEditor.edit((edit) => {
      edit.replace(selectedRange, output);
    });
  } catch (error) {
    nova.notifications.add(new InvalidBase64Notification());
  }
}
