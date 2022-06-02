// @types/nova-editor-node doesn't seem to have a console global?
const console = (globalThis as any).console as Console;

/** Create a method to log namespaced messages for development */
export function createDebug(namespace: string) {
  return (message: unknown, ...args: unknown[]) => {
    if (nova.inDevMode() === false) return;
    const humanArgs = args.map((arg) =>
      typeof arg === "object" ? JSON.stringify(arg) : arg
    );
    console.log(`${namespace} ${message}`, ...humanArgs);
  };
}

/**
 * Ask the workspace user to choose an option
 * and return a Promise for their response.
 */
export function askChoice(workspace: Workspace, choices: string[]) {
  return new Promise<string | null>((resolve) => {
    workspace.showChoicePalette(choices, {}, (choice) => resolve(choice));
  });
}

/** Remove newlines for debug messages */
export function escapeMultiline(input: string) {
  return input.replace(/\n/g, "\\n");
}
