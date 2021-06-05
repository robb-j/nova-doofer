import { createDebug } from "../debug";
import { NothingSelectedNotification } from "../notifications";

const debug = createDebug("sort-lines");

export function sortLinesCommand(editor: TextEditor) {
  const { selectedText, selectedRange } = editor;

  if (!selectedText) {
    nova.notifications.add(new NothingSelectedNotification());
    return;
  }

  const output = selectedText.split("\n").sort().join("\n");

  debug(`input='${selectedText}' output=${output}`);

  editor.edit((edit) => {
    edit.replace(selectedRange, output);
  });
}
