export declare class Resume {
    controller: AbortController;
    constructor();
    stop(): Promise<void>;
    restart(): void;
}
export declare class Resumer<Keys extends string | undefined = undefined> {
    private resumeMap;
    constructor();
    constructor(resumeMap: Map<Keys, Resume>, newKeys: Keys[]);
    createStopPoint<NewKeys extends string>(...newKeys: NewKeys[]): Resumer<Keys extends undefined ? NewKeys : Keys | NewKeys>;
    getPoint(key: Keys): Resume;
}
