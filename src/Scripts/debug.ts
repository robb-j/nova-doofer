// @types/nova-editor-node doesn't seem to have a console global?
const console = (globalThis as any).console as Console;

export function createDebug(namespace: string) {
  return (message: unknown, ...args: unknown[]) => {
    if (nova.inDevMode() === false) return;
    const humanArgs = args.map((arg) =>
      typeof arg === "object" ? JSON.stringify(arg) : arg
    );
    console.log(`${namespace} ${message}`, ...humanArgs);
  };
}
