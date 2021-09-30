import { Method } from 'axios';
import http from 'http';

import mocks from '../data';
import { MockPreset, MockResponse } from '../types';
import server from './server';
import Store from './store';

const store = new Store();

let serverInstace: http.Server;

export default {
  async startAPI() {
    return new Promise((resolve, reject) => {
      try {
        serverInstace = server(store, () => resolve(console.log('MockAPI running')));
      } catch (e) {
        reject(e);
      }
    });
  },

  async stopAPI() {
    return new Promise((resolve, reject) => {
      try {
        serverInstace.close(() => resolve(console.log('API stopped')));
      } catch (e) {
        reject(e);
      }
    });
  },

  setMockPreset(mock: MockPreset) {
    const preset = mocks[mock];

    store.usePreset(preset);
  },

  mockEndpoint(method: Method, path: string, response: MockResponse) {
    store.set(method, path, response);
  },
};
