import { NothingSelectedNotification } from "../notifications";
import { createDebug } from "../debug";

const debug = createDebug("base64-encode");

export function base64EncodeCommand(editor: TextEditor) {
  const { selectedText, selectedRange } = editor;

  if (!selectedText) {
    nova.notifications.add(new NothingSelectedNotification());
    return;
  }

  const output = btoa(selectedText);
  debug(`input='${selectedText}' output=${output}`);

  editor.edit((edit) => {
    edit.replace(selectedRange, output);
  });
}
