import axios from 'axios';

import { MockPreset } from '../types';

const client = axios.create({
  baseURL: 'http://localhost:3001',
});

export default {
  async setMock(preset: MockPreset) {
    return await client.put('/mock', null, {
      params: {
        preset: preset.toString(),
      },
    });
  },

  async clear() {
    return client.delete('/mock');
  },
};
