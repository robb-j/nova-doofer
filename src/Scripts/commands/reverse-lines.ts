import { createDebug, escapeMultiline } from "../utils";
import { NothingSelectedNotification } from "../notifications";

const debug = createDebug("reverse-lines");

export function reverseLinesCommand(editor: TextEditor) {
  if (!editor.selectedText) {
    nova.notifications.add(new NothingSelectedNotification());
    return;
  }

  // Get the range for the entire lines that are selected
  const lineRange = editor.getLineRangeForRange(editor.selectedRange);
  const lineText = editor.getTextInRange(lineRange);

  // Reverse the lines that are selected, remove empty lines
  // Add a newline again for the one that got stripped out
  const outputText = editor
    .getTextInRange(lineRange)
    .split(editor.document.eol)
    .filter((l) => l.trim().length > 0)
    .reverse()
    .join(editor.document.eol);

  debug(
    `input='${escapeMultiline(lineText)}' output=${escapeMultiline(outputText)}`
  );

  editor.edit((edit) => {
    edit.replace(lineRange, outputText + editor.document.eol);
  });
}
