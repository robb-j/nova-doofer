import { createDebug } from "../debug";
import { NothingSelectedNotification } from "../notifications";

const debug = createDebug("sort-lines");

export function sortLinesCommand(editor: TextEditor) {
  const { selectedText, selectedRange } = editor;

  if (!selectedText) {
    nova.notifications.add(new NothingSelectedNotification());
    return;
  }

  debug(selectedRange.start);
  debug(selectedRange.end);

  const output = selectedText.split("\n").sort().join("\n");

  debug(`input='${selectedText}' output=${output}`);

  editor.edit((edit) => {
    edit.replace(selectedRange, output);
  });
}
