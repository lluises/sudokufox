#!/bin/bash

set -e


# Common code
export PACKER_SCRIPT_PATH="$( cd -- "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"
cd "$PACKER_SCRIPT_PATH"
. common.sh
BASE_PATH="$PLATFORM_PATH/ubuntu-touch/sudokufox"
cd "$BASE_PATH"



### Constants ##################################################################

UT_PLATFORM="$PLATFORM_PATH/ubuntu-touch"
UT_ASSETS_PATH="assets"
UT_WEB_PATH="www"
[ "$UT_ARCH" = "" ] && UT_ARCH="arm64" # Default arquitecture if not in env


### Web module #################################################################

build-javascript --config vite.ubuntutouch.config.js

rm -r "$UT_WEB_PATH"
cp -r "$JAVASCRIPT_BUILD" "$UT_WEB_PATH"



### Logos and images ###########################################################

echo "Generating logo to $UT_ASSETS_PATH/logo.png"
generate-logo 256 "$UT_ASSETS_PATH/logo.png"

echo "Generating splash image to $UT_ASSETS_PATH/splash.png"
convert "${IMAGES_PATH}/splash.png[1024x]" -background white -flatten "$UT_ASSETS_PATH/splash.png"



### Build Ubuntu Touch package #################################################

# Generate www.qrc automaticly
"$BASE_PATH"/generate-www-qrc.py

# Build the package
clickable build --arch $UT_ARCH


### Extract click package ######################################################

echo "Extracting click pagage"

find "build/" -type f -iname 'sudokufox*.click' \
     -exec cp "{}" "$UT_PLATFORM/" \; \
     -exec echo cp "{}" "$UT_PLATFORM/" \;

echo "-----------------------"
echo "EXPORTED CLICK PACKAGES"
echo "-----------------------"
ls $UT_PLATFORM/*.click
