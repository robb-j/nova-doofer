import jwtDecode from "jwt-decode";
import {
  InvalidJwtNotification,
  NothingSelectedNotification,
} from "../notifications";
import { createDebug } from "../debug";

const debug = createDebug("jwt-decode");

export function jwtDecodeCommand(workspace: Workspace) {
  const { selectedText, selectedRange } = workspace.activeTextEditor;
  if (!selectedText) {
    nova.notifications.add(new NothingSelectedNotification());
    return;
  }

  try {
    const header = jwtDecode<any>(selectedText, { header: true });
    const payload = jwtDecode<any>(selectedText);
    const signature = selectedText.split(".")[2];

    debug(`input='${selectedText}`);
    debug("output", { header, payload, signature });

    const output = JSON.stringify({ header, payload, signature }, null, 2);

    workspace.activeTextEditor.edit((edit) => {
      edit.replace(selectedRange, output);
    });
  } catch (error) {
    nova.notifications.add(new InvalidJwtNotification());
  }
}
