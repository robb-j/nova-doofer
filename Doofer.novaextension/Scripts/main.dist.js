var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __reExport = (target, module2, copyDefault, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default"))
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toESM = (module2, isNodeMode) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", !isNodeMode && module2 && module2.__esModule ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// node_modules/casex/build/casex.js
var require_casex = __commonJS({
  "node_modules/casex/build/casex.js"(exports, module2) {
    (function(global, factory) {
      typeof exports === "object" && typeof module2 !== "undefined" ? module2.exports = factory() : typeof define === "function" && define.amd ? define(factory) : global.casex = factory();
    })(exports, function() {
      "use strict";
      const DEFAULT_DELIMITERS = "A-Z\\s_-";
      function matches(str, delimiters) {
        const regex = new RegExp("([A-Z]?)([^" + (delimiters || DEFAULT_DELIMITERS) + "]*)", "g");
        const strMatches = str.match(regex) || [];
        return strMatches.filter(function(value) {
          return value;
        });
      }
      function toCase(letter, str) {
        if (letter === "-")
          return "";
        if (letter === "*")
          return str;
        const isUpperCase = letter === letter.toUpperCase();
        return isUpperCase ? str.toUpperCase() : str.toLowerCase();
      }
      function applyPattern(str, pattern) {
        return toCase(pattern[0], str[0]) + toCase(pattern[1], str.substring(1));
      }
      function casex2(str, pattern, delimiters) {
        const glue = pattern.substring(2, pattern.length - 2);
        const firstPattern = pattern.substring(0, 2);
        const secondPattern = pattern.substring(pattern.length - 2);
        return matches(str, delimiters).map(function(match, index) {
          return applyPattern(match, index === 0 ? firstPattern : secondPattern);
        }).join(glue);
      }
      return casex2;
    });
  }
});

// src/Scripts/notifications/invalid-base64.ts
var InvalidBase64Notification = class extends NotificationRequest {
  constructor() {
    super("base64-invalid-decode");
    this.title = nova.localize("Invalid base64 string");
    this.body = nova.localize("The selected string(s) is not base64 encoded");
  }
};

// src/Scripts/notifications/invalid-jwt.ts
var InvalidJwtNotification = class extends NotificationRequest {
  constructor() {
    super("jwt-invalid");
    this.title = nova.localize("Invalid JWT");
    this.body = nova.localize("The text you have selected is not a valid JWT string");
  }
};

// src/Scripts/notifications/nothing-selected.ts
var NothingSelectedNotification = class extends NotificationRequest {
  constructor() {
    super("base64-nothing-selected");
    this.title = nova.localize("Nothing selected");
    this.body = nova.localize("This command works on the text you have selected");
  }
};

// src/Scripts/utils.ts
var console = globalThis.console;
function createDebug(namespace) {
  return (message, ...args) => {
    if (nova.inDevMode() === false)
      return;
    const humanArgs = args.map((arg) => typeof arg === "object" ? JSON.stringify(arg) : arg);
    console.log(`${namespace} ${message}`, ...humanArgs);
  };
}
function askChoice(workspace, choices) {
  return new Promise((resolve) => {
    workspace.showChoicePalette(choices, {}, (choice) => resolve(choice));
  });
}
function escapeMultiline(input) {
  return input.replace(/\n/g, "\\n");
}

// src/Scripts/commands/base64-decode.ts
var debug = createDebug("base64-decode");
function base64DecodeCommand(editor) {
  try {
    debug(editor.selectedRanges);
    if (editor.selectedRanges.length === 0 || editor.selectedRanges.some((r) => r.length === 0)) {
      nova.notifications.add(new NothingSelectedNotification());
      return;
    }
    editor.edit((edit) => {
      for (const range of [...editor.selectedRanges].reverse()) {
        const inputText = editor.getTextInRange(range);
        const outputText = atob(inputText);
        debug(`input='${inputText}' output=${outputText}`);
        edit.replace(range, outputText);
      }
    });
  } catch (error) {
    nova.notifications.add(new InvalidBase64Notification());
  }
}

// src/Scripts/commands/base64-encode.ts
var debug2 = createDebug("base64-encode");
function base64EncodeCommand(editor) {
  debug2(editor.selectedRanges);
  if (editor.selectedRanges.length === 0 || editor.selectedRanges.some((r) => r.length === 0)) {
    nova.notifications.add(new NothingSelectedNotification());
    return;
  }
  editor.edit((edit) => {
    for (const range of [...editor.selectedRanges].reverse()) {
      const inputText = editor.getTextInRange(range);
      const outputText = btoa(inputText);
      debug2(`input='${inputText}' output=${outputText}`);
      edit.replace(range, outputText);
    }
  });
}

// src/Scripts/commands/convert-case.ts
var import_casex = __toESM(require_casex());
var debug3 = createDebug("convert-case");
var cases = [
  { pattern: "ca_se", title: "snake_case" },
  { pattern: "ca-se", title: "kebab-case" },
  { pattern: "caSe", title: "camelCase" },
  { pattern: "Ca se", title: "Sentence case" },
  { pattern: "CaSe", title: "PascalCase" },
  { pattern: "Ca Se", title: "Title Case" }
];
function convertCaseCommand(editor, workspace) {
  return __async(this, null, function* () {
    if (editor.selectedRanges.length === 0 || editor.selectedRanges.some((r) => r.length === 0)) {
      nova.notifications.add(new NothingSelectedNotification());
      return;
    }
    const caseChoice = yield askChoice(workspace, cases.map((c) => c.title));
    const targetCase = cases.find((c) => c.title === caseChoice);
    if (!targetCase)
      return;
    debug3(targetCase.title);
    editor.edit((edit) => {
      for (const range of [...editor.selectedRanges].reverse()) {
        const inputText = editor.getTextInRange(range);
        const outputText = (0, import_casex.default)(inputText, targetCase.pattern);
        debug3(`input='${inputText}' case='${targetCase.pattern}' output='${outputText}'`);
        edit.replace(range, outputText);
      }
    });
  });
}

// src/Scripts/commands/jwt-decode.ts
var debug4 = createDebug("jwt-decode");
function repadBase64String(input) {
  return input.padEnd(input.length + input.length % 4, "=");
}
function decodeJwt(input) {
  const chunks = input.split(".");
  if (chunks.length !== 3) {
    throw new Error("Bad JWT");
  }
  const header = JSON.parse(atob(repadBase64String(chunks[0])));
  const payload = JSON.parse(atob(repadBase64String(chunks[1])));
  const signature = chunks[2];
  return { header, payload, signature };
}
function jwtDecodeCommand(editor) {
  const { selectedText, selectedRange } = editor;
  if (!selectedText) {
    nova.notifications.add(new NothingSelectedNotification());
    return;
  }
  try {
    debug4(`input='${selectedText}`);
    const jwt = decodeJwt(selectedText);
    debug4("output", jwt);
    const output = JSON.stringify(jwt, null, 2);
    editor.edit((edit) => {
      edit.replace(selectedRange, output);
    });
  } catch (error) {
    debug4(error);
    nova.notifications.add(new InvalidJwtNotification());
  }
}

// src/Scripts/commands/lorem-ipsum.ts
var debug5 = createDebug("lorem-ipsum");
var PARAGHRAPHS = nova.localize("Paragraphs");
var WORDS = nova.localize("Words");
var SENTENCE_MIN = 10;
var SENTENCE_MAX = 15;
var PARAGRAPH_MIN = 5;
var PARAGRAPH_MAX = 8;
var LOREM_WORDS = JSON.parse('["a","ac","accumsan","adipiscing","aenean","aliqua","aliquam","aliquet","amet","ante","arcu","at","auctor","augue","bibendum","commodo","consectetur","convallis","curabitur","cursus","dapibus","diam","dictum","dictumst","dignissim","do","dolor","dolore","donec","dui","duis","egestas","eget","eiusmod","eleifend","elementum","elit","enim","erat","eros","est","et","etiam","eu","euismod","facilisi","facilisis","fames","faucibus","fermentum","feugiat","fringilla","fusce","gravida","habitasse","hac","hendrerit","iaculis","id","imperdiet","in","incididunt","integer","interdum","ipsum","justo","labore","lacinia","lacus","laoreet","lectus","leo","libero","ligula","lobortis","lorem","luctus","maecenas","magna","malesuada","massa","mattis","mauris","metus","mi","morbi","nam","nec","neque","nibh","nisl","non","nulla","nullam","nunc","odio","orci","ornare","pellentesque","pharetra","phasellus","placerat","platea","porta","porttitor","posuere","praesent","pretium","proin","pulvinar","purus","quam","quis","rhoncus","risus","sagittis","sapien","scelerisque","sed","sem","semper","sit","suspendisse","tellus","tempor","tempus","tincidunt","tortor","tristique","turpis","ullamcorper","ultrices","ultricies","urna","ut","varius","vehicula","vel","velit","vestibulum","vitae","viverra","volutpat","vulputate"]');
function getConfig(workspace) {
  function getOr(key, fallback) {
    const found = workspace.config.get(key, "number");
    debug5("getOr", key, found);
    return found || fallback;
  }
  return {
    sentence: {
      min: getOr("doofer.sentence-min", SENTENCE_MIN),
      max: getOr("doofer.sentence-max", SENTENCE_MAX)
    },
    paragraph: {
      min: getOr("doofer.paragraph-min", PARAGRAPH_MIN),
      max: getOr("doofer.paragraph-max", PARAGRAPH_MAX)
    }
  };
}
function randomNumber(min, max) {
  return min + Math.round(Math.random() * (max - min));
}
function randomWord() {
  return LOREM_WORDS[randomNumber(0, LOREM_WORDS.length)];
}
function randomSentence(length) {
  const sentence = Array.from({ length }, () => randomWord()).join(" ");
  return sentence.charAt(0).toUpperCase() + sentence.slice(1);
}
function randomParagraph(numWords, config) {
  const words = createArray(numWords, () => {
    const numWords2 = randomNumber(config.sentence.min, config.sentence.max);
    return randomSentence(numWords2);
  });
  return words.join(". ") + ".";
}
function randomText(numParagraphs, config) {
  const paragraphs = createArray(numParagraphs, () => {
    const numSentences = randomNumber(config.paragraph.min, config.paragraph.max);
    return randomParagraph(numSentences, config);
  });
  return paragraphs.join("\n\n");
}
function createArray(length, fill) {
  return Array.from({ length }, () => fill());
}
function loremIpsumCommand(editor, workspace) {
  return __async(this, null, function* () {
    const type = yield askChoice(workspace, [PARAGHRAPHS, WORDS]);
    const amount = yield askChoice(workspace, ["1", "2", "3", "4", "5"]);
    const config = getConfig(workspace);
    debug5("config", config);
    if (!amount)
      return;
    const length = parseInt(amount, 10);
    let output;
    if (type === PARAGHRAPHS) {
      output = randomText(length, config);
    }
    if (type === WORDS) {
      output = randomSentence(length);
    }
    const { selectedRange } = workspace.activeTextEditor;
    workspace.activeTextEditor.edit((edit) => {
      edit.replace(selectedRange, output);
    });
  });
}

// src/Scripts/commands/reverse-lines.ts
var debug6 = createDebug("reverse-lines");
function reverseLinesCommand(editor) {
  if (!editor.selectedText) {
    nova.notifications.add(new NothingSelectedNotification());
    return;
  }
  const lineRange = editor.getLineRangeForRange(editor.selectedRange);
  const lineText = editor.getTextInRange(lineRange);
  const outputText = editor.getTextInRange(lineRange).split(editor.document.eol).filter((l) => l.trim().length > 0).reverse().join(editor.document.eol);
  debug6(`input='${escapeMultiline(lineText)}' output=${escapeMultiline(outputText)}`);
  editor.edit((edit) => {
    edit.replace(lineRange, outputText + editor.document.eol);
  });
}

// src/Scripts/commands/sort-lines.ts
var debug7 = createDebug("sort-lines");
function sortLinesCommand(editor) {
  if (!editor.selectedText) {
    nova.notifications.add(new NothingSelectedNotification());
    return;
  }
  const lineRange = editor.getLineRangeForRange(editor.selectedRange);
  const lineText = editor.getTextInRange(lineRange);
  const outputText = lineText.split(editor.document.eol).filter((line) => line.trim().length > 0).sort().join(editor.document.eol);
  debug7(`input='${escapeMultiline(lineText)}' output=${escapeMultiline(outputText)}`);
  editor.edit((edit) => {
    edit.replace(lineRange, outputText + editor.document.eol);
  });
}

// src/Scripts/main.ts
nova.commands.register("doofer.base64Decode", (editor) => {
  base64DecodeCommand(editor);
});
nova.commands.register("doofer.base64Encode", (editor) => base64EncodeCommand(editor));
nova.commands.register("doofer.jwtDecode", (editor) => jwtDecodeCommand(editor));
nova.commands.register("doofer.loremIpsum", (editor) => loremIpsumCommand(editor, nova.workspace));
nova.commands.register("doofer.sortLines", (editor) => sortLinesCommand(editor));
nova.commands.register("doofer.reverseLines", (editor) => reverseLinesCommand(editor));
nova.commands.register("doofer.convertCase", (editor) => convertCaseCommand(editor, nova.workspace));
