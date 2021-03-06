import { NothingSelectedNotification } from "../notifications";
import { createDebug, escapeMultiline } from "../utils";

const debug = createDebug("sort-lines");

export function sortLinesCommand(editor: TextEditor) {
  if (!editor.selectedText) {
    nova.notifications.add(new NothingSelectedNotification());
    return;
  }

  // Get the range for the entire lines that are selected
  const lineRange = editor.getLineRangeForRange(editor.selectedRange);
  const lineText = editor.getTextInRange(lineRange);

  // Sort the lines that are selected, remove empty lines and join them together again
  // Add a newline for the end newline that gets stripped out
  const outputText = lineText
    .split(editor.document.eol)
    .filter((line) => line.trim().length > 0)
    .sort()
    .join(editor.document.eol);

  debug(
    `input='${escapeMultiline(lineText)}' output=${escapeMultiline(outputText)}`
  );

  editor.edit((edit) => {
    edit.replace(lineRange, outputText + editor.document.eol);
  });
}
