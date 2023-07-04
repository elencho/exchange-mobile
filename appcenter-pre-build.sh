#!/usr/bin/env bash

# Example: Change bundle name of an iOS app for non-production

cd $APPCENTER_SOURCE_DIRECTORY && cd ios && rm -rf Pods && pod cache clean --all && pod update && cd ..
