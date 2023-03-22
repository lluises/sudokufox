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

ELECTRON_PLATFORM="$PLATFORM_PATH/electron"


### Build electron package #####################################################

build-javascript-for-cordova

cordova build electron



### Extract electron package ###################################################

echo "Extracting electron pagage"

cp "$BASE_PATH"/platforms/electron/build/com.lluise.sudokufox*.tar.gz "$ELECTRON_PLATFORM/"

echo "--------------------------"
echo "EXPORTED ELECTRON PACKAGES"
echo "--------------------------"
ls $ELECTRON_PLATFORM/*.tar.gz
