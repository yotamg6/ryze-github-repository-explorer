import { GITHUB_API_CONFIG } from '@/config/github';

let cache = new Map();

export const cacheData = (key, data) => {
  cache.set(key, {
    data,
    timestamp: Date.now()
  });
};

export const getCachedData = (key) => {
  const cached = cache.get(key);
  if (!cached) return null;
  
  const age = Date.now() - cached.timestamp;
  if (age > GITHUB_API_CONFIG.CACHE_DURATION) {
    cache.delete(key);
    return null;
  }
  
  return cached.data;
};