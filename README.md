# GoldWallet - A Bitcoin Vault mobile wallet

The first ever Bitcoin Vault wallet.

[![Playstore](https://bluewallet.io/img/play-store-badge.svg)](https://play.google.com/store/apps/details?id=io.goldwallet.wallet)

## BUILD & RUN IT

- In your console:

```
git clone https://github.com/bitcoinvault/GoldWallet.git
cd GoldWallet
yarn install
```

- Add files for firebase:

For iOS:
GoogleService-Info.plist into directory /ios/

For android:
google-services.json into directory /config/prod/

- Create .env file:

Create .env file in /config/prod/ directory. It will be copied to root directory while building. Check the .env.example file for a template

- Create env specific files in config direcotry

in config/prod/ directory add app.json and MainActivity.java - you will find them already in the project files.

- To run on Android:

```
yarn start android:prod
```

if you want to have beta version with different name and id - redo previous steps for config/beta

- To run on iOS:

```
cd ios
pod install
cd ..
yarn start ios
```

## TESTS

```bash
yarn run test
```

## LICENSE

MIT
