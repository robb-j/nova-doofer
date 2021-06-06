import * as cmd from "./commands/all";

export function activate() {
  // ...
}

export function deactivate() {
  // ...
}

nova.commands.register(
  "robb-j.text-utils.base64Decode",
  (editor: TextEditor) => {
    cmd.base64DecodeCommand(editor);
  }
);

nova.commands.register("robb-j.text-utils.base64Encode", (editor: TextEditor) =>
  cmd.base64EncodeCommand(editor)
);

nova.commands.register("robb-j.text-utils.jwtDecode", (editor: TextEditor) =>
  cmd.jwtDecodeCommand(editor)
);

nova.commands.register("robb-j.text-utils.loremIpsum", (editor: TextEditor) =>
  cmd.loremIpsumCommand(editor, nova.workspace)
);

nova.commands.register("robb-j.text-utils.sortLines", (editor: TextEditor) =>
  cmd.sortLinesCommand(editor)
);

nova.commands.register("robb-j.text-utils.convertCase", (editor: TextEditor) =>
  cmd.convertCaseCommand(editor, nova.workspace)
);
