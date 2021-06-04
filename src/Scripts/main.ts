import {
  base64DecodeCommand,
  base64EncodeCommand,
  jwtDecodeCommand,
  loremIpsumCommand,
  sortLinesCommand,
} from "./commands";

export function activate() {
  // ...
}

export function deactivate() {
  // ...
}

nova.commands.register("text-utils.base64Decode", (workspace: Workspace) => {
  base64DecodeCommand(workspace);
});

nova.commands.register("text-utils.base64Encode", (workspace: Workspace) =>
  base64EncodeCommand(workspace)
);

nova.commands.register("text-utils.jwtDecode", (workspace: Workspace) =>
  jwtDecodeCommand(workspace)
);

nova.commands.register("text-utils.loremIpsum", (workspace: Workspace) =>
  loremIpsumCommand(workspace)
);

nova.commands.register("text-utils.sortLines", (workspace: Workspace) =>
  sortLinesCommand(workspace)
);
