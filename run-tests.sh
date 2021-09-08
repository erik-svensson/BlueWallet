#!/bin/bash

set -x -e

unzip -n tests.zip

ls -al

export APPFILE=android/app/build/outputs/apk/dev/release/app-dev-release-bitrise-signed.apk
export APPIUM_APPFILE=$APPFILE

APILEVEL=$(adb shell getprop ro.build.version.sdk)
APILEVEL="${APILEVEL//[$'\t\r\n']}"
export APILEVEL

UDID="$(adb devices | grep device | tr "\n" " " | awk '{print $5}')"
export UDID
sed -i.bu "s/ADD_DEVICE_ID_HERE/$UDID/" .detoxrc.json

npm install -g yarn

yarn install

yarn detox run-server > detox-server.log 2>&1 &

# allow device to contact host by localhost
adb reverse tcp:8099 tcp:8099

yarn test:detox --configuration android.bitbar.dev -t @smoke --loglevel verbose --detectOpenHandles

adb uninstall io.goldwallet.wallet.dev
adb uninstall io.goldwallet.wallet.dev.test

export SCREENSHOTSFOLDER="$PWD/artifacts/screenshots"
mkdir -p $SCREENSHOTSFOLDER

move_video() {
  FILE="$1"
  TEMP=${FILE#*/*/}
  CASE_NAME=${TEMP%/*}
  mv -v "$FILE" "$SCREENSHOTSFOLDER/$CASE_NAME.mp4"
}

export -f move_video

if test -f "artifacts/testReport.xml"; then
  sed '/<testcase .* time="0">/,/<\/testcase>/d' artifacts/testReport.xml > artifacts/testReport-clean.xml
  mv artifacts/testReport-clean.xml TEST-ALL.xml
  find artifacts -type f -name "*.mp4" -exec bash -c 'move_video "$0"' {} \;
fi