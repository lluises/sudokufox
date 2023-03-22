#!/bin/bash

# DO NOT DIRECTLY RUN THIS SCRIPT!!!
# It must be sourced from either electron.sh or android.sh

# Check if we have been properly executed:
[ "$PLATFORM_PATH" = "" ] && exit 2



### Constants ##################################################################

CORDOVA_PLATFORM="$PLATFORM_PATH/cordova"
CORDOVA_WEB_PATH="$CORDOVA_PLATFORM/sudokufox/www"
CORDOVA_ASSETS="$CORDOVA_PLATFORM/sudokufox/assets"



### Web module #################################################################

build-javascript-for-cordova() {
    build-javascript --config vite.cordova.config.js

    rm -r "$CORDOVA_WEB_PATH"
    cp -r "$JAVASCRIPT_BUILD" "$CORDOVA_WEB_PATH"
}
