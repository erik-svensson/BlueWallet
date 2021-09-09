/**
 * Global hooks. beforeEach, afterAll and other hooks defined here are applied to any
 * test suite in the project.
 */
import { element, by, device } from 'detox';
import dotenv from 'dotenv';

import { isEmulator } from './helpers/utils';

dotenv.config({ path: 'tests/e2e/.env.e2e' });

beforeEach(async () => {
  await device.launchApp({
    newInstance: true,
    delete: true,
    //Enable Notifications
    permissions: { notifications: 'YES' },
  });

  // if (device.getPlatform() === 'android' && !isEmulator()) {
  //   await element(by.text('OK')).tap();
  // }
});

afterAll(async () => {
  await device.terminateApp();
});
