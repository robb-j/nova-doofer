/**
 * Ask the workspace user to choose an option
 * and return a Promise for their response.
 */
export function askChoice(workspace: Workspace, choices: string[]) {
  return new Promise<string | null>((resolve) => {
    workspace.showChoicePalette(choices, {}, (choice) => resolve(choice));
  });
}

/**
 * Make multiple text edits and return the range of the new text.
 * This internally handles re-mapping the ranges as text changes.
 * Edits must be in the order they are in the file which editor.selectedRanges states.
 */
export function makeMultipleEdits(
  editor: TextEditor,
  pendingEdits: { range: Range; inputText: string; outputText: string }[]
): Range[] {
  const newRanges: Range[] = [];

  editor.edit((edit) => {
    // Keep track of how much text is added/removed since the start of editing
    let offset = 0;

    for (const toEdit of pendingEdits) {
      const range = new Range(
        toEdit.range.start + offset,
        toEdit.range.end + offset
      );

      edit.replace(range, toEdit.outputText);

      // Push a new range that is normalised to the new document
      newRanges.push(
        new Range(
          toEdit.range.start + offset,
          toEdit.range.start + toEdit.outputText.length + offset
        )
      );

      // Increment the offset for the next text edit
      offset += toEdit.outputText.length - toEdit.inputText.length;
    }
  });

  return newRanges;
}
