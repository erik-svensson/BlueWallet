#!/bin/bash

set -x -e

export APPIUM_APPFILE=$PWD/application.apk #dummy app, not the actual app
export APPFILE=REPLACE_WITH_APPFILE

echo "Before install $(date)"
APILEVEL=$(adb shell getprop ro.build.version.sdk)
APILEVEL="${APILEVEL//[$'\t\r\n']}"
export APILEVEL
echo "API level is: ${APILEVEL}"

# Run adb once so API level can be read without the "daemon not running"-message
adb devices
adb shell pm list packages -f | grep detox

UDID="$(adb devices | grep device | tr "\n" " " | awk '{print $5}')"
export UDID
echo "UDID: $UDID"
sed -i.bu "s/ADD_DEVICE_ID_HERE/$UDID/" .detoxrc.json

echo "Set environment"
set -o allexport
source .test.env
set +o allexport

echo "Yarn install"
yarn install

echo "Launching Detox server"
"${PWD}/node_modules/.bin/detox" run-server > detox-server.log 2>&1 &

# allow device to contact host by localhost
adb reverse tcp:8099 tcp:8099

echo "Running tests $(date)"
yarn test:detox --configuration android.bitbar.dev.debug -t @smoke --loglevel verbose --detectOpenHandles > detox.log 2>&1

ls -la detox.log

echo "detox-test-log"
cat detox.log

echo "detox-server-log"
cat detox-server.log
