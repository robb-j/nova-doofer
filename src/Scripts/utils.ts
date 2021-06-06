/**
 * Ask the workspace user to choose an option
 * and return a Promise for their response.
 */
export function askChoice(workspace: Workspace, choices: string[]) {
  return new Promise<string | null>((resolve) => {
    workspace.showChoicePalette(choices, {}, (choice) => resolve(choice));
  });
}
