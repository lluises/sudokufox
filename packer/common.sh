#!/bin/bash

# Requires env PACKER_SCRIPT_PATH

MAIN_BUILD_PATH="$(realpath "$PACKER_SCRIPT_PATH/..")"
JAVASCRIPT_BUILD="$MAIN_BUILD_PATH/sudokufox/dist"
PLATFORM_PATH="$MAIN_BUILD_PATH/platform"

IMAGES_PATH="$MAIN_BUILD_PATH/images"
IMAGES_LOGO="$IMAGES_PATH/logo.png"
LOGO_FORMAT="png"

build-javascript() {
    # Build javascript code into sudokufox/dist
    callback="$(pwd)"

    cd "$MAIN_BUILD_PATH/sudokufox"

    yarn build "$@"

    cd "$callback"
}

generate-logo() {
    # $1 → Size in pixels (like 256 or 512)
    # $2 → Target file path
    size="$1"
    target="$2"
    echo "Generating logo ${size}x${size}"
    convert "${IMAGES_LOGO}[${size}x${size}]" -background white -flatten "$target"
}
