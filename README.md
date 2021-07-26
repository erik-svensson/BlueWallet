# GoldWallet - A Bitcoin Vault mobile wallet

The first ever Bitcoin Vault wallet.

[![Playstore](/img/GooglePlay.png)](https://play.google.com/store/apps/details?id=io.goldwallet.wallet)
[![AppStore](/img/AppStore.svg)](https://apps.apple.com/pl/app/goldwallet-for-btcv/id1515116464)

## Prerequisites

* Node.js v.12.14.1 or greater is required
* For Android: 
    * version 8 of the Java SE Development Kit (JDK)
    * Android SDK
    * Android SDK Platform
    * Android Virtual Device
* For iOS: 
    * Xcode
    * [CocoaPods](https://cocoapods.org/)

**If you haven't launched any React Native projects before, you should check [Setting up the development environment · React Native](https://reactnative.dev/docs/environment-setup) to set up your local development environment correctly.**

## Installation

```sh
$ git clone https://github.com/bitcoinvault/GoldWallet.git
$ cd GoldWallet
$ yarn install
```

To run iOS app you also need to install Swift project's dependencies:

```sh
$ cd ios
$ pod install
```

To build a binary of any variant, you must have `sentry.properties` files created in root, `./ios`, and `./android`. You can create them by executing `create-sentry-properties.sh` script with the valid Sentry Auth token:

```sh
$ SENTRY_AUTH_TOKEN=${TOKEN} bash ./create-sentry-properties.sh  
```

But to run the app with Metro server, this step isn't required.

## Running the app

You can launch the Android app in two variants - `prod` and `beta`:

```sh
$ yarn run android:prod
$ yarn run android:beta
```

as well as iOS:

```sh
$ yarn run ios:prod
$ yarn run ios:beta
```

by default, the app runs in `Debug` type which means you must run React packager/server first

```sh
$ yarn start
```

## Testing

To run unit and integration tests:

```bash
$ yarn run test
```

To run [Detox](https://github.com/wix/Detox) (end-to-end) tests, please follow the [Install platform-specific dependencies, tools and dev-kits](https://github.com/wix/Detox/blob/master/docs/Introduction.GettingStarted.md#install-platform-specific-dependencies-tools-and-dev-kits) guideline to make sure you have everything configured correctly. Especially the part about [Android (AOSP) Emulators](https://github.com/wix/Detox/blob/master/docs/Introduction.AndroidDevEnv.md) is important.

Build the app for Detox:

```sh
$ yarn build:detox -- -c ${CONFIGURATION}
```

Start react-native packager:

```sh
$ yarn start:detox
```

And then run the tests:
```sh
$ yarn test:detox -- -c ${CONFIGRURATION} 
```

Check `.detoxrc.json` file to see all available configurations

To control what tests should be executed use the Jest's `-t` flag:

```sh
$ yarn test:detox -- -c ${CONFIGRURATION} -t ${REGEX}
```

## LICENSE

MIT
