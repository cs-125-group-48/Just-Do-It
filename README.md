# Just Do It

## Motivation
While we all are stuck inside our houses due to stay at home orders, we thought it would be a good idea to implement a fitness app to help people do exercises at home to stay healthy. It is important to keep your body healthy to also improve your mental health. It is essential for students to maintain good health during our studies.

# Installation

## Install NodeJS
## Install the following:

    npm install -g @angular/cli  # to install angular
    npm install -g ionic # to install ionic
    npm install -g ionic-lab

### clone this repository

### Install dependecies
    
    cd Just-Do-It
    npm install

## Run app within Just-Do-It folder
    ionic lab

# To run on Andriod device

## Requirements: 
- Java JDK 8
- Andriod Studio 
    - note: remember to accept lisences to download Andriod SDK packages or app will not run.

    run command: 
    
        ionic cordova run android --device 

- Give your app access to Google Fitness API
    - (usually you need to get the OAuth 2.0 Client ID like [so](https://developers.google.com/fit/android/get-api-key) to enable Fitness API but, for some reason when authorizing applcation it would just hang so instead the other option listed below as a quick fix)

    - get SHA-1 and SHA256 fingerprint:
        - locate debug keystore file (default: C:\Users\your_user_name\.android\)
        - run command below to list fingerprints:

                keytool -list -v -keystore "%USERPROFILE%\.android\debug.keystore" -alias androiddebugkey -storepass android -keypass android
    - Create new project with firebase
    - Add an andriod app in firebase project settings
    - Add both SHA-1 and SHA-256 to SHA certificate fingerprints in project settings
    - Download google-services.json and add to platofmrs/andriod/app in your project folder
    - Make sure to have support email set

#

## To debug app

Go to ``` chrome://inspect ``` and inspect Ionic App

#

## Troubleshooting Andriod implementation

For build errors try removing and adding andriod platform
    
    cordova platform remove andriod
    cordova platform add andriod

to re-add plugins that may have gotten left behind

