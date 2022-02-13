/// <reference lib="es2017" />

import {
  InvalidJwtNotification,
  NothingSelectedNotification,
} from "../notifications";
import { createDebug } from "../debug";

const debug = createDebug("jwt-decode");

// JWT removes '=' padding, so re-add them
// (so the string length is a multiple of 4)
//
// String#padEnd isn't currently in @types/nova-editor-node (es6)
function repadBase64String(input: string) {
  return input.padEnd(input.length + (input.length % 4), "=");
}

function decodeJwt(input: string) {
  const chunks = input.split(".");
  if (chunks.length !== 3) {
    throw new Error("Bad JWT");
  }

  const header = JSON.parse(atob(repadBase64String(chunks[0])));
  const payload = JSON.parse(atob(repadBase64String(chunks[1])));
  const signature = chunks[2];

  return { header, payload, signature };
}

export function jwtDecodeCommand(editor: TextEditor) {
  const { selectedText, selectedRange } = editor;
  if (!selectedText) {
    nova.notifications.add(new NothingSelectedNotification());
    return;
  }

  try {
    debug(`input='${selectedText}`);
    const jwt = decodeJwt(selectedText);

    debug("output", jwt);

    const output = JSON.stringify(jwt, null, 2);

    editor.edit((edit) => {
      edit.replace(selectedRange, output);
    });
  } catch (error) {
    debug(error);
    nova.notifications.add(new InvalidJwtNotification());
  }
}
