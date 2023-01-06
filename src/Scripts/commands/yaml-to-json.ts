import * as YAML from "yaml";

import {
  InvalidJsonNotification,
  NothingSelectedNotification,
} from "../notifications";
import { createDebug } from "../utils";

const debug = createDebug("json-to-yaml");

export function yamlToJsonCommand(editor: TextEditor) {
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
      try {
        const inputText = editor.getTextInRange(range);
        const data = YAML.parse(inputText);
        const outputText = JSON.stringify(data, null, editor.tabLength);
        debug(`input='${inputText}' output=${outputText}`);
        edit.replace(range, outputText);
      } catch (error) {
        nova.notifications.add(new InvalidJsonNotification());
        return;
      }
    }
  });
}
