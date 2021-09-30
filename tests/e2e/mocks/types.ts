export interface MockResponse {
  body: any;
  status: number;
}

export interface StoreData {
  get?: Record<string, MockResponse>;
  post?: Record<string, MockResponse>;
  put?: Record<string, MockResponse>;
  delete?: Record<string, MockResponse>;
}

export enum MockPreset {
  airdrop_active = 'airdrop_active',
}
