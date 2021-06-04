import { NothingSelectedNotification } from "../notifications";
import { createDebug } from "../debug";

const debug = createDebug("base64-encode");

export function base64EncodeCommand(workspace: Workspace) {
  const { selectedText, selectedRange } = workspace.activeTextEditor;

  if (!selectedText) {
    nova.notifications.add(new NothingSelectedNotification());
    return;
  }

  const output = btoa(selectedText);
  debug(`input='${selectedText}' output=${output}`);

  workspace.activeTextEditor.edit((edit) => {
    edit.replace(selectedRange, output);
  });
}
