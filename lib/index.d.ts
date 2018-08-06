export interface LoadMessage {
    text?: string;
    subtext?: string;
    id: string;
    source: string;
}
export interface Data {
    all: LoadMessage[];
    by_source: {
        [source: string]: number[];
    };
    by_id: {
        [id: string]: number;
    };
}
export declare const data: Data;
/**
 * Returns an array of all loading message objects. Provide a source to get messages for just that source.
 * @param source Optional source to scope messages.
 */
export declare function all(source?: string): LoadMessage[];
/**
 * Get a specific loading message by id.
 * @param id The string id or index of the loading message.
 */
export declare function get(id: number | string): LoadMessage | undefined;
/**
 * Get a random loading message, optionally scoped to a source.
 * @param source Optional source to scope messages.
 */
export declare function random(source?: string): LoadMessage;
