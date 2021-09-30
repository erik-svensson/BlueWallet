import { wait } from '../helpers/utils';
import { client, MockPreset } from '../mocks';
import app from '../pageObjects';

describe('Airdrop', () => {
  beforeAll(async () => {
    await client.setMock(MockPreset.airdrop_active);
  });

  afterAll(async () => {
    await client.clear();
  });

  it('should be active', async () => {
    await app.developerRoom.tapOnSkipOnboardingButton();
    await wait(30000);
  });
});
