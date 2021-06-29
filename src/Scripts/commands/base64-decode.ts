import {
  InvalidBase64Notification,
  NothingSelectedNotification,
} from "../notifications";
import { createDebug } from "../debug";
import { makeMultipleEdits } from "../utils";

const debug = createDebug("base64-decode");

export function base64DecodeCommand(editor: TextEditor) {
  try {
    const { selectedRanges } = editor;

    debug(selectedRanges);

    if (
      selectedRanges.length === 0 ||
      selectedRanges.some((r) => r.length === 0)
    ) {
      nova.notifications.add(new NothingSelectedNotification());
      return;
    }

    editor.selectedRanges = makeMultipleEdits(
      editor,
      selectedRanges.map((range) => {
        const inputText = editor.getTextInRange(range);
        const outputText = atob(inputText);
        debug(`input='${inputText}' output=${outputText}`);
        return { range, inputText, outputText };
      })
    );
  } catch (error) {
    nova.notifications.add(new InvalidBase64Notification());
  }
}
