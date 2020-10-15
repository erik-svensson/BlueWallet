# GoldWallet - A Bitcoin Vault mobile wallet

The first ever Bitcoin Vault wallet.

[![Playstore](https://bluewallet.io/img/play-store-badge.svg)](https://play.google.com/store/apps/details?id=io.goldwallet.wallet)

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

There are a few more steps you need to follow, to learn more check [Setting up the development environment · React Native](https://reactnative.dev/docs/environment-setup)

## Installation

```sh
$ git clone https://github.com/bitcoinvault/GoldWallet.git
$ cd GoldWallet
$ npm ci
```

To run iOS app you also need to install Swift project's dependencies:

```sh
$ cd ios
$ pod install
```

Before running you must:

* Add firebase files: 
    * For Android: `google-services.json` into directory `./android/app/`
    * For iOS: `GoogleService-Info.plist` into directory `./ios/`
    
* Create .env file in root directory. Check the .env.example file for template.

## Running the app

You can launch the Android app in two variants - production (mainnet) and beta (testnet):

```sh
$ npm run android:prod
$ npm run android:beta
```

To run iOS app:

```sh
$ npm run ios
```

In general, the React packager/server should be started automatically after running the app. However, if it didn't happen for some reasons you must do it yourself:

```sh
$ npm start
```

## Testing

```sh
$ npm run test
```

## License

MIT
