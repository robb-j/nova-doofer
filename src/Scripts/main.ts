import {
  base64DecodeCommand,
  base64EncodeCommand,
  jwtDecodeCommand,
  loremIpsumCommand,
  sortLinesCommand,
} from "./commands/all";

export function activate() {
  // ...
}

export function deactivate() {
  // ...
}

nova.commands.register(
  "robb-j.text-utils.base64Decode",
  (editor: TextEditor) => {
    base64DecodeCommand(editor);
  }
);

nova.commands.register("robb-j.text-utils.base64Encode", (editor: TextEditor) =>
  base64EncodeCommand(editor)
);

nova.commands.register("robb-j.text-utils.jwtDecode", (editor: TextEditor) =>
  jwtDecodeCommand(editor)
);

nova.commands.register("robb-j.text-utils.loremIpsum", (editor: TextEditor) =>
  loremIpsumCommand(editor, nova.workspace)
);

nova.commands.register("robb-j.text-utils.sortLines", (editor: TextEditor) =>
  sortLinesCommand(editor)
);
