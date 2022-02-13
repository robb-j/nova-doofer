# Doofer

Extra text utilities for [Nova](https://nova.app). This is not currently a published Nova Extension.

> A Doofer can be anything. When you can't think of the name of an object or item just replace the unknown name with doofer and hey presto.
>
> – _Mc Numpty March 20, 2004_ [[link](https://www.urbandictionary.com/define.php?term=Doofer)]

You may want:

- [Extension README.md](/Doofer.novaextension/README.md)
- [Examples](/examples)

## Development

This is a Nova extension written in [TypeScript](https://www.typescriptlang.org)
which is bundled with [esbuild](https://esbuild.github.io)
and formatted with [Prettier](https://prettier.io).

These are the production dependencies:

- [casex](https://github.com/pedsmoreira/casex) for converting text between cases

The extension is made up of several "editor" commands which work with
the text you have selected in a Nova text editor.
The commands are found in the [src/Scripts/commands](/src/Scripts/commands) folder
and the entrypoint for the extension is [src/Scripts/main.ts](/src/Scripts/main.ts)

### Setup

To work on the extension, you will need to have [Node.js](https://nodejs.org/en/) (version 16+)
and [Nova](https://nova.app) installed on your development machine. Then run:

```sh
# cd to/this/folder

# Install NPM dependencies
npm install
```

Next, open this repository (the folder with `Doofer.novaextension` in it) in Nova
and make sure Nova is in development mode,
**Nova** → **Preferences** and check **Extension Development**.

### Regular use

For development, use the `Development` task to build and run the extension locally.
**Build** will compile the TypeScript into JavaScript into the extension folder.
**Run** will do the build and activate the extension in Nova.
Nova will run the extension locally and restart when and file inside the `.novaextension` changes,
e.g. by re-running the **Build** task.

> Make sure to disable the extension if a published version is already installed.

When in development mode, the extension outputs extra information to the Debug Pane,
which can be shown with **View** → **Show Debug Pane**.

Use the text in the [examples](/examples) markdown files to test different commands.

### Code formatting

This repository uses [Prettier](https://prettier.io/),
[yorkie](https://www.npmjs.com/package/yorkie)
and [lint-staged](https://www.npmjs.com/package/lint-staged) to
automatically format code when staging code for a git commit.
So code that is pushed to the repository is always consistently formatted.

You can manually run the formatter with `npm run format` if you want.

Prettier ignores files using [.prettierignore](/.prettierignore)
or adding `// prettier-ignore` before a line.

## Future work / Ideas

Please see [GitHub issues](https://github.com/robb-j/nova-doofer/issues)
