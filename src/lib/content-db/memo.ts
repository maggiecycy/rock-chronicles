/**
 * Process-lifetime memo for content-db reads.
 * During `next build` SSG, many pages re-fetch the same lists; without memo
 * Prisma's small connection pool (often connection_limit=3 on 2-core builders)
 * times out with P2024.
 *
 * Safe for this app: content is immutable per deploy; each serverless cold start
 * gets a fresh cache.
 */
export function memoAsync<T>(load: () => Promise<T>): () => Promise<T> {
  let pending: Promise<T> | null = null;
  return () => {
    if (!pending) pending = load();
    return pending;
  };
}

export function memoByKeyAsync<T>(
  load: (key: string) => Promise<T>,
): (key: string) => Promise<T> {
  const cache = new Map<string, Promise<T>>();
  return (key: string) => {
    let pending = cache.get(key);
    if (!pending) {
      pending = load(key);
      cache.set(key, pending);
    }
    return pending;
  };
}
