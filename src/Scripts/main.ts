import { base64DecodeCommand } from "./commands/base64-decode";
import { base64EncodeCommand } from "./commands/base64-encode";
import { convertCaseCommand } from "./commands/convert-case";
import { decodeKubeSecret } from "./commands/decode-kube-secret";
import { jsonToYamlCommand } from "./commands/json-to-yaml";
import { jwtDecodeCommand } from "./commands/jwt-decode";
import { loremIpsumCommand } from "./commands/lorem-ipsum";
import { reverseLinesCommand } from "./commands/reverse-lines";
import { sortLinesCommand } from "./commands/sort-lines";
import { yamlToJsonCommand } from "./commands/yaml-to-json";

// export function activate() {}
// export function deactivate() {}

nova.commands.register("doofer.base64Decode", (editor: TextEditor) => {
  base64DecodeCommand(editor);
});

nova.commands.register("doofer.base64Encode", (editor: TextEditor) =>
  base64EncodeCommand(editor)
);

nova.commands.register("doofer.jwtDecode", (editor: TextEditor) =>
  jwtDecodeCommand(editor)
);

nova.commands.register("doofer.loremIpsum", (editor: TextEditor) =>
  loremIpsumCommand(editor, nova.workspace)
);

nova.commands.register("doofer.sortLines", (editor: TextEditor) =>
  sortLinesCommand(editor)
);

nova.commands.register("doofer.reverseLines", (editor: TextEditor) =>
  reverseLinesCommand(editor)
);

nova.commands.register("doofer.convertCase", (editor: TextEditor) =>
  convertCaseCommand(editor, nova.workspace)
);

nova.commands.register("doofer.jsonToYaml", (editor: TextEditor) =>
  jsonToYamlCommand(editor)
);

nova.commands.register("doofer.yamlToJson", (editor: TextEditor) =>
  yamlToJsonCommand(editor)
);

nova.commands.register("doofer.decodeKubeSecret", (editor: TextEditor) =>
  decodeKubeSecret(editor)
);
