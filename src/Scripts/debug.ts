export function createDebug(namespace: string) {
  return (...args: any[]) => {
    if (nova.inDevMode() === false) return;
    const humanArgs = args.map((arg) =>
      typeof arg === "object" ? JSON.stringify(arg) : arg
    );
    console.log(`[${namespace}]`, ...humanArgs);
  };
}
