# waiter-available-webapp
### Contents
1. About App
1. Features and Benefits
1. Examples
1. Installations
1. Tests
1. Contributing
1. Issues


# About App
This app allows the waiters to select days which they prefer to work on and also allows the manager to view waiters working schedule, it makes it easy for manager to see which days needs more waiters and which days have enough waiters by highlighting them accordingly. Manager can reset days for new week schedule. This app stores all this data in mongo database.

# Features and Benefits
## For developers:
* You get to play with the app locally and you can also modify the app checkout the Examples and Installations sections for more details on how you can use the app locally and modify it to your preferences.

## For  users:
* You can visit [waiter-available-webapp](https://re-waiter.herokuapp.com/waiters) and follow instructions bellow:

##### All you need run  this app is to:
* Enter name you wish to greet in the text area
* Select language you want to use
* Click greet button then it will display greeting massage and the name greeted like **hello, Rendani**
##### If you click greet button without following above instructions it will:
* Display error massage.

##### By clicking checkout greeted people it will:
* Show the list of greeted people
* if the is no greeted people it will display error message
* There is a button to go back to greet more people

##### By clicking the greeted name:
* You will see how many times the name was greeted
* There is a button to go back to greeted list

# Examples
Image bellow show the looks of the actual app which is avialable [here](http://rendani-greetings.herokuapp.com).
![Landing_page](landingpage.jpg)

# Installations
* To run this app locally you need to clone the repo greetings-webapp [here](https://github.com/rendaniluk/greetings-webapp)
by running the following command on terminal:

```
$ git clone https://github.com/rendaniluk/greetings-webapp
$ cd greetings-webapp

```
* Check if NodeJS and NPM is installed by running command:

```
$ node -v
$ npm -v
```
* If it exist it will display **v4.2.6** and **3.5.2** which is the version of NodeJS and NPM respectively to the terminal, if not install by following instructions [here](https://za.godaddy.com/help/install-nodejs-ubuntu-17395) to install both NodeJS and NPM.

* You also need mongodb installed to check if installed run **mongo -version** in terminal it will display the version installed, if not install mongodb follow instructions [here](https://www.howtoforge.com/tutorial/install-mongodb-on-ubuntu-16.04/) to install.

* In the repository you clone there is a **package.json** file with all dependencies all you need to do is to run this command in the terminal

```
$ npm install

```
* It will install all required dependencies, when done you can run the following command to start a local server

```
$ nodemon
or
$ node index.js

```
* It will display the following
```
$ nodemon
[nodemon] 1.11.0
[nodemon] to restart at any time, enter `rs`
[nodemon] watching: *.*
[nodemon] starting `node index.js`
`open()` is deprecated in mongoose >= 4.11.0, use `openUri()` instead, or set the `useMongoClient` option if using `connect()` or `createConnection()`. See http://mongoosejs.com/docs/connections.html#use-mongo-client
Node app is running on port 5000

or

$ node index.js
`open()` is deprecated in mongoose >= 4.11.0, use `openUri()` instead, or set the `useMongoClient` option if using `connect()` or `createConnection()`. See http://mongoosejs.com/docs/connections.html#use-mongo-client
Node app is running on port 5000

```
* You can now open browser and type in **localhost:5000** in the url.


# Tests [![Build Status](https://api.travis-ci.org/rendaniluk/greetings-webapp.svg)](https://travis-ci.org/rendaniluk/greetings-webapp/builds/280324645)

* This app has test to test the database models, to check if test runs you have to run **npm test** in the terminal.
* For test to run on travis you need to have .travis.yml file with this contents.
```
language: node_js
node_js: "v4.2.6"
services: mongodb
```
# Contributing
* To contribute in this project you can fork the repository greetings-webapp by clicking button that looks like this ![fork](fork.png) above.
* After Fork you can clone it by typing :
```
$ git clone https://github.com/rendaniluk/greetings-webapp

```
in the terminal then you can work on it and push you updates to github.

# Issues
* There is no known Issues with the app, however feel free to let me know of any Issues you have found by sending me email to *rendani@projectcodex.co*.
