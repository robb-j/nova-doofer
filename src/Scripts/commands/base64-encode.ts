import { NothingSelectedNotification } from "../notifications";
import { createDebug } from "../debug";
import { makeMultipleEdits } from "../utils";

const debug = createDebug("base64-encode");

export function base64EncodeCommand(editor: TextEditor) {
  const { selectedRanges } = editor;

  if (
    selectedRanges.length === 0 ||
    selectedRanges.some((r) => r.length === 0)
  ) {
    nova.notifications.add(new NothingSelectedNotification());
    return;
  }

  editor.selectedRanges = makeMultipleEdits(
    editor,
    selectedRanges.map((range) => {
      const inputText = editor.getTextInRange(range);
      const outputText = btoa(inputText);
      debug(`input='${inputText}' output=${outputText}`);
      return { range, inputText, outputText };
    })
  );
}
