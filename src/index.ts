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

export const data: Data = require("../happy-load.json");

/**
 * Returns an array of all loading message objects. Provide a source to get messages for just that source.
 * @param source Optional source to scope messages.
 */
export function all(source?: string) {
  if (source != null) {
    const indexes = data.by_source[source];
    if (indexes == null) throw new Error("Missing source '" + source + "'");
    return indexes.map((i) => data.all[i]);
  } else {
    return data.all;
  }
}

/**
 * Get a specific loading message by id.
 * @param id The string id or index of the loading message.
 */
export function get(id: number | string) {
  if (typeof id === "number") return data.all[id];
  const index = data.by_id[id];
  if (index != null) return data.all[index];
}

/**
 * Get a random loading message, optionally scoped to a source.
 * @param source Optional source to scope messages.
 */
export function random(source?: string) {
  const messages = all(source);
  return messages[Math.floor(Math.random() * messages.length)];
}
