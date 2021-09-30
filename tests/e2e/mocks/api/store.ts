import { Method } from 'axios';

import { MockResponse, StoreData } from '../types';

class Store {
  private store: StoreData;

  constructor() {
    this.store = this.initStore();
  }

  private initStore(): StoreData {
    return {
      get: {},
      post: {},
      put: {},
      delete: {},
    };
  }

  set(method: Method, path: string, response: MockResponse): void {
    this.store[method.toLowerCase()][path] = response;
  }

  usePreset(preset: StoreData): void {
    Object.entries(preset).forEach(([method, endpoints]) => {
      Object.entries(endpoints).forEach(([path, response]) => {
        this.set(method as Method, path, response as MockResponse);
      });
    });
  }

  get(method: Method, path: string): MockResponse {
    return this.store[method.toLowerCase()][path];
  }

  unset(method: Method, path: string): void {
    delete this.store[method.toLowerCase()][path];
  }

  clear(): void {
    this.store = this.initStore();
  }

  hasMock(method: Method, path: string): boolean {
    return this.store[method.toLowerCase()]?.[path];
  }
}

export default Store;
