# SudokuFox

Complete sudoku game for sudoku lovers

^.^



# Supported platforms

 - Web
 - Linux desktop
 - Ubuntu Touch
 - Android



# Setup development enviroment

Follow this 3 steps

## 1. Clone the repository
```bash
git clone git@github.com:lluises/sudokufox.git
```

## 2. Setup the virtaulenv
```bash
python -m venv env
. env/bin/activate
pip install nodeenv
nodeenv --node=19.3.0 --python-virtualenv env
deactivate
. env/bin/activate
```

_NOTE: Other versions of Node might work, `19.3.0` is the one I tested_

## 3. Install dependencies

_Note: Make sure to have ran `. env/bin/activate` in your current shell session._

Install all nodejs thingies:

```bash
cd sudokufox
npm install -g yarn
yarn
```

## 🌈 Done ✨

You might run the development server if you want to edit the web source code:

```bash
yarn dev
```



# Building

You need the development enviroment: [Setup development enviroment](#setup-development-enviroment).


## Web

This one is quite easy, just do:

```bash
cd sudokufox
yarn build
```

The web files will be stored in `dist/`, copy them to your web page or wherever ;-)


## Linux desktop

Make sure to have [Apache Cordova](https://cordova.apache.org/) installed.

Run the automated script and hope for it to work

```bash
./packer/electron.sh
```

It will export an electron bundle to `platform/electron/com.lluise.sudokufox*.tar.gz`


## Ubuntu Touch

Make sure to have [Clickable](https://clickable-ut.dev/en/latest/) installed and set up.

Run the automated script and hope for it to work

```bash
./packer/ubuntu-touch.sh
```

It will export a Click package to `platform/ubuntu-touch/sudokufox*.click`


## Android

First and foremost, light a candle.

Then, make sure to have [Apache Cordova](https://cordova.apache.org/) installed.
You will also need to set up the [Android Platform for Apache Cordova](https://cordova.apache.org/docs/en/latest/guide/platforms/android/index.html).

If you made it this far, you can already feel pround of yourself. Lets start building the apk:

Run the automated script and hope for it to work

```bash
./packer/android.sh
```

It will export an Android APK to `platform/android/*.apk`
