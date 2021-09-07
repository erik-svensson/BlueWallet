#!/bin/bash

set -x -e

export APPIUM_APPFILE=$PWD/application.apk #dummy app, not the actual app
export APPFILE=REPLACE_WITH_APPFILE

APILEVEL=$(adb shell getprop ro.build.version.sdk)
APILEVEL="${APILEVEL//[$'\t\r\n']}"
export APILEVEL

UDID="$(adb devices | grep device | tr "\n" " " | awk '{print $5}')"
export UDID
sed -i.bu "s/ADD_DEVICE_ID_HERE/$UDID/" .detoxrc.json

set -o allexport
source .test.env
set +o allexport

yarn install

# "${PWD}/node_modules/.bin/detox" run-server > detox-server.log 2>&1 &

# allow device to contact host by localhost
adb reverse tcp:8099 tcp:8099

yarn test:detox --configuration android.bitbar.dev -t @smoke --loglevel verbose --detectOpenHandles