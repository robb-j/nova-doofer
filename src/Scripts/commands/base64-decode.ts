import {
  InvalidBase64Notification,
  NothingSelectedNotification,
} from "../notifications";
import { createDebug } from "../debug";

const debug = createDebug("base64-decode");

export function base64DecodeCommand(editor: TextEditor) {
  try {
    const { selectedText, selectedRange } = editor;

    if (!selectedText) {
      nova.notifications.add(new NothingSelectedNotification());
      return;
    }

    const output = atob(selectedText);
    debug(`input='${selectedText}' output=${output}`);

    editor.edit((edit) => {
      edit.replace(selectedRange, output);
    });
  } catch (error) {
    nova.notifications.add(new InvalidBase64Notification());
  }
}
