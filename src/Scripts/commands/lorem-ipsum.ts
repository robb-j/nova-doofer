import { createDebug } from "../debug";

const debug = createDebug("lorem-ipsum");

const PARAGHRAPHS = nova.localize("Paragraphs");
const WORDS = nova.localize("Words");

const SENTENCE_MIN = 10;
const SENTENCE_MAX = 15;

const PARAGRAPH_MIN = 5;
const PARAGRAPH_MAX = 8;

const LOREM_WORDS: string[] = JSON.parse(
  '["a","ac","accumsan","adipiscing","aenean","aliqua","aliquam","aliquet","amet","ante","arcu","at","auctor","augue","bibendum","commodo","consectetur","convallis","curabitur","cursus","dapibus","diam","dictum","dictumst","dignissim","do","dolor","dolore","donec","dui","duis","egestas","eget","eiusmod","eleifend","elementum","elit","enim","erat","eros","est","et","etiam","eu","euismod","facilisi","facilisis","fames","faucibus","fermentum","feugiat","fringilla","fusce","gravida","habitasse","hac","hendrerit","iaculis","id","imperdiet","in","incididunt","integer","interdum","ipsum","justo","labore","lacinia","lacus","laoreet","lectus","leo","libero","ligula","lobortis","lorem","luctus","maecenas","magna","malesuada","massa","mattis","mauris","metus","mi","morbi","nam","nec","neque","nibh","nisl","non","nulla","nullam","nunc","odio","orci","ornare","pellentesque","pharetra","phasellus","placerat","platea","porta","porttitor","posuere","praesent","pretium","proin","pulvinar","purus","quam","quis","rhoncus","risus","sagittis","sapien","scelerisque","sed","sem","semper","sit","suspendisse","tellus","tempor","tempus","tincidunt","tortor","tristique","turpis","ullamcorper","ultrices","ultricies","urna","ut","varius","vehicula","vel","velit","vestibulum","vitae","viverra","volutpat","vulputate"]'
);

//
// Nova helpers
//

function pick(workspace: Workspace, choices: string[]) {
  return new Promise<string | null>((resolve) => {
    workspace.showChoicePalette(choices, {}, (choice) => resolve(choice));
  });
}

type LoremConfig = ReturnType<typeof getConfig>;

function getConfig(workspace: Workspace) {
  function getOr(key: string, fallback: number) {
    const found = workspace.config.get(key, "number");
    debug("getOr", key, found);
    return found || fallback;
  }
  return {
    // How many words to put into sentences
    sentence: {
      min: getOr("text-utils.sentence-min", SENTENCE_MIN),
      max: getOr("text-utils.sentence-max", SENTENCE_MAX),
    },

    // How many sentences to put into paragraphs
    paragraph: {
      min: getOr("text-utils.paragraph-min", PARAGRAPH_MIN),
      max: getOr("text-utils.paragraph-max", PARAGRAPH_MAX),
    },
  };
}

//
// Generators
//

function randomNumber(min: number, max: number) {
  return min + Math.round(Math.random() * (max - min));
}

function randomWord() {
  return LOREM_WORDS[randomNumber(0, LOREM_WORDS.length)];
}

function randomSentence(length: number) {
  const sentence = Array.from({ length }, () => randomWord()).join(" ");
  return sentence.charAt(0).toUpperCase() + sentence.slice(1);
}

function randomParagraph(numWords: number, config: LoremConfig) {
  const words = createArray(numWords, () => {
    const numWords = randomNumber(config.sentence.min, config.sentence.min);
    return randomSentence(numWords);
  });

  return words.join(". ") + ".";
}

function randomText(numParagraphs: number, config: LoremConfig) {
  const paragraphs = createArray(numParagraphs, () => {
    const numSentences = randomNumber(
      config.paragraph.min,
      config.paragraph.max
    );
    return randomParagraph(numSentences, config);
  });

  return paragraphs.join("\n\n");
}

//
// Misc
//

/** A wrapper for Array.from(a, b) to make code more readable */
function createArray<T = unknown>(length: number, fill: () => T): T[] {
  return Array.from({ length }, () => fill());
}

//
// The exported command
//

export async function loremIpsumCommand(workspace: Workspace) {
  const type = await pick(workspace, [PARAGHRAPHS, WORDS]);
  const amount = await pick(workspace, ["1", "2", "3", "4", "5"]);

  const config = getConfig(workspace);

  debug("config", config);

  if (!amount) return;
  const length = parseInt(amount, 10);
  let output: string;

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
}
