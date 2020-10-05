# GoldWallet - A Bitcoin Vault mobile wallet

The first ever Bitcoin Vault wallet.

[![Playstore](https://bluewallet.io/img/play-store-badge.svg)](https://play.google.com/store/apps/details?id=io.goldwallet.wallet)


## Prerequisites

* Latest stable version of Node.js
* For Android: 
    * version 8 of the Java SE Development Kit (JDK)
    * latest version of Android Studio
    * latest version of Android SDK
* For iOS: latest version of Xcode (macOS required)

In case of any problems, follow: 
- [Setting up the development environment · React Native](https://reactnative.dev/docs/environment-setup)
- [Why Android SDK Manager doesn't work with Java 11](https://pasdam.github.io/blog/android_sdk_java_11/)

## Installation

```sh
$ git clone https://github.com/bitcoinvault/GoldWallet.git
$ cd GoldWallet
$ npm ci
```

To run iOS app you also need to install Swift's project dependencies. You can use [CocoaPods](https://cocoapods.org/) to do that:

```sh
$ cd ios
$ pod install
```

## Running the app

Before running:

* Add firebase files: 
    * For Android: `google-services.json` into directory `./android/app/`
    * For iOS: `GoogleService-Info.plist` into directory `./ios/`
    
* Create .env file in root directory. Check the .env.example file for template.

Once it's done you must start React packager/server

```sh
$ npx react-native start
```

which is required step for both Android and iOS app.

### Android

Make sure emulator started. Here's a foolproof guide on how to start one via CLI: [Install and Create Emulators using AVDMANAGER and SDKMANAGER](https://gist.github.com/mrk-han/66ac1a724456cadf1c93f4218c6060ae)

To run Android app:

```sh
$ npm start android
```

### iOS

To run iOS app:

```sh
$ npm start ios
```

## Testing

```sh
$ npm run test
```

## Troubleshooting 

### I am having trouble running React Native (`react-native start`) on Linux: ENOSPC error

The error like below
```
  Loading dependency graph…internal/fs/watchers.js:173
  throw error;
  ^
  
  Error: ENOSPC: System limit for number of file watchers reached, watch
```

is a common issue and there are a lot of posts on how to fix it, like this [one](https://stackoverflow.com/questions/22475849/node-js-what-is-enospc-error-and-how-to-solve)

## License

MIT
