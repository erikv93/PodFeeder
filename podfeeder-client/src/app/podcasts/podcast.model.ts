export interface Podcast {
    id: string;
    name: string;
    description: string;
    feedurl: string;
    imageUrl: string | null;
    lastViewedTime: Date | null;
    lastUpdatedTime: Date | null;
}
