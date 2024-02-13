#!/usr/bin/env bash

cd $APPCENTER_SOURCE_DIRECTORY && cd ios && rm -rf Pods && pod cache clean --all && pod update && cd ..

