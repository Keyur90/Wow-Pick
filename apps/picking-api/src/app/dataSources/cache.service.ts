import { CACHE_MANAGER, Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';
import _ from 'lodash';

@Injectable()
export class CacheService {
  private readonly logger = new Logger(CacheService.name);

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache, private readonly configService: ConfigService) {}

  async get<T>(key: string): Promise<T> {
    let cacheItem = await this.cacheManager.get(key);

    if (!cacheItem) {
      try {
        cacheItem = await import(`../fixtures/${key}.json`);
      } catch (error) {
        this.logger.log({ message: 'No cache data found', args: { key } });
        return null;
      }

      await this.cacheManager.set(key, cacheItem);
    }
    return _.cloneDeep(cacheItem);
  }

  async set<T>(key: string, value: T): Promise<T> {
    const cachedItem = await this.cacheManager.set(key, value);

    return _.cloneDeep(cachedItem);
  }

  async deleteItem(key: string): Promise<void> {
    return await this.cacheManager.del(key);
  }

  async resetAll(): Promise<void> {
    return await this.cacheManager.reset();
  }
}
