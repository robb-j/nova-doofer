import casex from "casex";

import { NothingSelectedNotification } from "../notifications";
import { createDebug } from "../debug";
import { askChoice } from "../utils";

const debug = createDebug("convert-case");

// The cases available for converting
// https://github.com/pedsmoreira/casex
const cases = [
  { pattern: "ca_se", title: "snake_case" },
  { pattern: "ca-se", title: "kebab-case" },
  { pattern: "caSe", title: "camelCase" },
  { pattern: "Ca se", title: "Sentence case" },
  { pattern: "CaSe", title: "PascalCase" },
  { pattern: "Ca Se", title: "Title Case" },
];

export async function convertCaseCommand(
  editor: TextEditor,
  workspace: Workspace
) {
  const { selectedText, selectedRange } = editor;

  if (!selectedText) {
    nova.notifications.add(new NothingSelectedNotification());
    return;
  }

  const caseChoice = await askChoice(
    workspace,
    cases.map((c) => c.title)
  );
  const targetCase = cases.find((c) => c.title === caseChoice);

  if (!targetCase) return;
  const output = casex(selectedText, targetCase.pattern);

  debug(
    `input='${selectedText}' case='${targetCase?.pattern}' output='${output}'`
  );

  editor.edit((edit) => {
    edit.replace(selectedRange, output);
  });
}
