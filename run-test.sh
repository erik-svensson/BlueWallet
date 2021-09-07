#!/bin/bash

##### Cloud testrun dependencies start
echo "[Testdroid-ssa-client] Extracting tests.zip..."
unzip bundle.zip

##### Cloud testrun dependencies end.

export APPIUM_APPFILE=$PWD/application.apk #dummy app, not the actual app

## Run the test:
echo "[Testdroid-ssa-client] Running test ${TEST}"

export APPFILE=REPLACE_WITH_APPFILE

# put local tools to path
export PATH=$PATH:$PWD

export SCREENSHOTSFOLDER=$PWD/screenshots

#################################

echo "using APPFILE: ${APPFILE}"

cd "$(dirname "$0")" || exit


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

rm -rf "$SCREENSHOTSFOLDER"
rm ./*.xml
mkdir -p "$SCREENSHOTSFOLDER"

echo $SCREENSHOTSFOLDER

node --version
npm -version
watchman --version

echo "Yarn install"
yarn install

#build project
#"${PWD}/node_modules/.bin/detox" build --configuration android.device.release

echo "Launching Detox server"
#"${PWD}/node_modules/.bin/detox" run-server &
"${PWD}/node_modules/.bin/detox" run-server > detox-server.log 2>&1 &

# allow device to contact host by localhost
adb reverse tcp:8099 tcp:8099

echo "Running tests $(date)"
sed -i.bu "s/ADD_DEVICE_ID_HERE/$UDID/" .detoxrc.json


set -o allexport
source .test.env
set +o allexport

yarn test:detox --configuration android.bitbar.dev.debug -t @smoke --loglevel verbose --detectOpenHandles > detox.log 2>&1
scriptExitStatus=$?

ls -la detox.log

echo "detox-test-log"
cat detox.log

echo "detox-server-log"
cat detox-server.log

echo "Test has been run $(date), exit status: '${scriptExitStatus}'"

mv ./*.xml TEST-all.xml

exit $scriptExitStatus

