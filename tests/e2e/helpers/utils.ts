interface PollOptions {
  interval: number;
  retries: number;
}

/**
 * Checks if current configuration includes "beta" word.
 */
export const isBeta = (): boolean => {
  const argparse = require('detox/src/utils/argparse');

  return argparse.getArgValue('configuration').includes('beta');
};

/** Generates random string */
export const randomString = () =>
  Math.random()
    .toString(36)
    .substring(7);

/** Edits email address to include a wildcard. Output: email+{randomNumber}@domain.com */
export const randomizeEmailAddress = (email: string) => {
  const randomNumberString = Math.floor(Math.random() * 1000000000).toString();
  const atIndex = email.indexOf('@');

  return email.substr(0, atIndex) + `+${randomNumberString}` + email.substr(atIndex);
};

/** Waits x miliseconds */
export const wait = (miliseconds: number) =>
  new Promise(resolve => {
    setTimeout(resolve, miliseconds);
  });

/** Invokes a method by polling until it doesn't return an exception.  */
const poll = async <T>(fn: () => T | PromiseLike<T>, options?: Partial<PollOptions>): Promise<T> => {
  const { interval = 500, retries = 5 } = options || { interval: 500, retries: 5 };

  console.log(`Invoking ${fn.name}: ${JSON.stringify({ interval: 500, retries })}`);

  try {
    return await fn();
  } catch (error) {
    if (retries < 0) {
      throw new Error(`The polled function didn't return a result. Details: ${error.message}`);
    }

    await wait(interval);
    return await poll(fn, { interval, retries: retries - 1 });
  }
};

export default poll;
