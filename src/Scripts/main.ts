import * as cmd from "./commands/all";

export function activate() {
  // ...
}

export function deactivate() {
  // ...
}

nova.commands.register("doofer.base64Decode", (editor: TextEditor) => {
  cmd.base64DecodeCommand(editor);
});

nova.commands.register("doofer.base64Encode", (editor: TextEditor) =>
  cmd.base64EncodeCommand(editor)
);

nova.commands.register("doofer.jwtDecode", (editor: TextEditor) =>
  cmd.jwtDecodeCommand(editor)
);

nova.commands.register("doofer.loremIpsum", (editor: TextEditor) =>
  cmd.loremIpsumCommand(editor, nova.workspace)
);

nova.commands.register("doofer.sortLines", (editor: TextEditor) =>
  cmd.sortLinesCommand(editor)
);

nova.commands.register("doofer.convertCase", (editor: TextEditor) =>
  cmd.convertCaseCommand(editor, nova.workspace)
);
