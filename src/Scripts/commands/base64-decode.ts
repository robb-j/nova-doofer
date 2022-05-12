import {
  InvalidBase64Notification,
  NothingSelectedNotification,
} from "../notifications";
import { createDebug } from "../debug";

const debug = createDebug("base64-decode");

export function base64DecodeCommand(editor: TextEditor) {
  try {
    debug(editor.selectedRanges);

    if (
      editor.selectedRanges.length === 0 ||
      editor.selectedRanges.some((r) => r.length === 0)
    ) {
      nova.notifications.add(new NothingSelectedNotification());
      return;
    }

    editor.edit((edit) => {
      for (const range of [...editor.selectedRanges].reverse()) {
        const inputText = editor.getTextInRange(range);
        const outputText = atob(inputText);
        debug(`input='${inputText}' output=${outputText}`);
        edit.replace(range, outputText);
      }
    });
  } catch (error) {
    nova.notifications.add(new InvalidBase64Notification());
  }
}
