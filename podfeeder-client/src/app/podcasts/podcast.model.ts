export interface Podcast {
    id: string;
    name: string;
    description: string;
    feedurl: string;
    lastViewedTime: Date | null;
    lastUpdatedTime: Date | null;
}
