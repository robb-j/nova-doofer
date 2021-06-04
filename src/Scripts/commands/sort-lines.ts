import { createDebug } from "../debug";
import { NothingSelectedNotification } from "../notifications";

const debug = createDebug("sort-lines");

export function sortLinesCommand(workspace: Workspace) {
  const { selectedText, selectedRange } = workspace.activeTextEditor;

  if (!selectedText) {
    nova.notifications.add(new NothingSelectedNotification());
    return;
  }

  const output = selectedText.split("\n").sort().join("\n");

  debug(`input='${selectedText}' output=${output}`);

  workspace.activeTextEditor.edit((edit) => {
    edit.replace(selectedRange, output);
  });
}
