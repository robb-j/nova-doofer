import { NothingSelectedNotification } from "../notifications";
import { createDebug } from "../utils";

const debug = createDebug("base64-encode");

export function base64EncodeCommand(editor: TextEditor) {
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
      const outputText = btoa(inputText);
      debug(`input='${inputText}' output=${outputText}`);
      edit.replace(range, outputText);
    }
  });
}
