import * as YAML from "yaml";
import { InvalidYamlNotification } from "../notifications";

import { createDebug } from "../utils";

const debug = createDebug("decode-kube-secret");

function secretToEnv(input: string) {
  const { data } = YAML.parse(input);

  if (!data) throw new Error("no data");

  const env = new Map<string, string>();
  for (const [key, value] of Object.entries(data)) {
    env.set(key, atob(value as string));
  }

  return Array.from(env)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([key, value]) => `${key}=${value}`)
    .join("\n");
}

export function decodeKubeSecret(editor: TextEditor) {
  debug(editor.document.uri);

  editor.edit((edit) => {
    try {
      const range = new Range(0, editor.document.length);
      const input = editor.document.getTextInRange(range);
      edit.replace(range, secretToEnv(input));
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
      nova.notifications.add(new InvalidYamlNotification());
    }
  });
}
