/**
 * As the user in a workspace to choose an option
 * and wrap their response in a Promise
 */
export function askChoice(workspace: Workspace, choices: string[]) {
  return new Promise<string | null>((resolve) => {
    workspace.showChoicePalette(choices, {}, (choice) => resolve(choice));
  });
}
