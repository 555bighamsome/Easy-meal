/**
 * 缓存服务
 * 可以使用Redis或内存缓存
 */

// 简单的内存缓存实现
const memoryCache = new Map<string, { data: any; expireAt: number }>();

export async function getCachedData(key: string): Promise<any | null> {
  const cached = memoryCache.get(key);

  if (!cached) {
    return null;
  }

  if (Date.now() > cached.expireAt) {
    memoryCache.delete(key);
    return null;
  }

  return cached.data;
}

export async function setCachedData(key: string, data: any, ttl: number = 3600): Promise<void> {
  memoryCache.set(key, {
    data,
    expireAt: Date.now() + ttl * 1000
  });
}

export async function deleteCachedData(key: string): Promise<void> {
  memoryCache.delete(key);
}

// 定期清理过期缓存
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of memoryCache.entries()) {
    if (now > value.expireAt) {
      memoryCache.delete(key);
    }
  }
}, 60000); // 每分钟清理一次
