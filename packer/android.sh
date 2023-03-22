#!/bin/bash

set -e


# Common code
export PACKER_SCRIPT_PATH="$( cd -- "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"
cd "$PACKER_SCRIPT_PATH"
. common.sh

# Import cordova common code
. cordova.sh

BASE_PATH="$PLATFORM_PATH/cordova/sudokufox"
cd "$BASE_PATH"


### Constants ##################################################################

ANDROID_PLATFORM="$PLATFORM_PATH/android"
ANDROID_APKS="$BASE_PATH/platforms/android/app/build/outputs/apk"



### Web module #################################################################

build-javascript-for-cordova



### Logos and images ###########################################################

echo "Generating Android logos"
generate-logo 36 "$CORDOVA_ASSETS/ldpi.png"
generate-logo 48 "$CORDOVA_ASSETS/mdpi.png"
generate-logo 72 "$CORDOVA_ASSETS/hdpi.png"
generate-logo 96 "$CORDOVA_ASSETS/xhdpi.png"
generate-logo 144 "$CORDOVA_ASSETS/xxhdpi.png"
generate-logo 192 "$CORDOVA_ASSETS/xxxhdpi.png"



### Build Android APK ##########################################################

cordova build android



### Extract Android APKs #######################################################

echo "Extracting APKs"

find "$ANDROID_APKS" -type f -iname '*.apk' \
     -exec cp "{}" "$ANDROID_PLATFORM/" \; \
     -exec echo cp "{}" "$ANDROID_PLATFORM/" \;

echo "---------------------"
echo "EXPORTED ANDROID APKs"
echo "---------------------"
ls $ANDROID_PLATFORM/*.apk
