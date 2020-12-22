export class Resume {
  controller: AbortController;

  constructor() {
    this.controller = new AbortController();
    this.stop = this.stop.bind(this);
    this.restart = this.restart.bind(this);
  }

  stop() {
    return new Promise((resolve) => {
      const stopper = setTimeout(resolve, Infinity);
      this.controller.signal.addEventListener("abort", () => {
        clearTimeout(stopper);
        resolve(undefined);
      });
    }) as Promise<void>;
  }

  restart() {
    this.controller.abort();
  }
}

export class Resumer<Keys extends string | undefined = undefined> {
  private resumeMap: Map<Keys, Resume>;

  constructor();
  constructor(resumeMap: Map<Keys, Resume>, newKeys: Keys[]);

  constructor(resumeMap?: Map<Keys, Resume>, newKeys?: Keys[]) {
    this.resumeMap = resumeMap || new Map();
    if (newKeys == null) return;
    newKeys.forEach((key) => this.resumeMap.set(key, new Resume()));
  }

  createStopPoint<NewKeys extends string>(...newKeys: NewKeys[]) {
    type NextKeys = Keys extends undefined ? NewKeys : Keys | NewKeys;
    return new Resumer(this.resumeMap as Map<NextKeys, Resume>, newKeys as any);
  }

  getPoint(key: Keys) {
    const value = this.resumeMap.get(key);
    if (value == null) throw new Error("Unknown Error");
    return value;
  }
}
