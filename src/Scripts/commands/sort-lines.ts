import { createDebug } from "../debug";
import { NothingSelectedNotification } from "../notifications";

const debug = createDebug("sort-lines");

export function sortLinesCommand(editor: TextEditor) {
  const { selectedText, selectedRange } = editor;

  if (!selectedText) {
    nova.notifications.add(new NothingSelectedNotification());
    return;
  }

  // Get the range for the entire lines that are selected
  const lineRange = editor.getLineRangeForRange(selectedRange);
  const lineText = editor.getTextInRange(lineRange);

  // Sort the lines that are selected, remove empty lines and join them together again
  // Add a newline for the end newline that gets stripped out
  const outputText =
    lineText
      .split(editor.document.eol)
      .filter((line) => line.trim().length > 0)
      .sort()
      .join(editor.document.eol) + editor.document.eol;

  debug(
    `input='${escapeMultiline(lineText)}' output=${escapeMultiline(outputText)}`
  );

  editor.edit((edit) => {
    edit.replace(lineRange, outputText);
  });
}

function escapeMultiline(input: string) {
  return input.replace(/\n/g, "\\n");
}
