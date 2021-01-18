import { device } from 'detox';

beforeEach(async () => {
  await device.launchApp({
    newInstance: true,
    delete: true,
  });
});

afterAll(async () => {
  await device.terminateApp();
});
