#!/usr/bin/env bash
# Creates "sentry.properties" file in the root, /ios/, and /android/.

content="defaults.url=https://sentry.io/
defaults.org=cloudbest
defaults.project=goldwallet
auth.token=$SENTRY_AUTH_TOKEN"

echo "$content" > sentry.properties
echo "$content" > ios/sentry.properties
echo "$content" > android/sentry.properties
