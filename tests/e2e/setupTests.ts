/**
 * Global hooks. beforeEach, afterAll and other hooks defined here are applied to any
 * test suite in the project.
 */
import { device } from 'detox';

beforeEach(async () => {
  await device.launchApp({
    newInstance: true,
    delete: true,
    //Enable Notifications
    permissions: { notifications: 'YES' },
  });
});

afterAll(async () => {
  await device.terminateApp();
});
