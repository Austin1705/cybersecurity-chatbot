export declare class KnowledgeBase {
    private topics;
    constructor();
    private loadTopics;
    getTopicInfo(topic: string): string | null;
    searchTopics(query: string): Record<string, string>;
    updateKnowledgeBase(newTopics: Record<string, string>): void;
    getAllTopics(): Record<string, string>;
}
//# sourceMappingURL=knowledgeBase.d.ts.map