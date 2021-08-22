<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

<p align="center">
  <img src="https://www.gstatic.com/devrel-devsite/prod/v0089c83aa8227c3439bf2708c0795dd13db533711d44eb626e640152d9fdf05e/firebase/images/touchicon-180.png" alt="Nest Logo" /> 
</p>

<p align="center">
  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvQhVvYXcxTK0UtM_Wmc2ZhZARqKEP0v4ucnNsl4jqvjEuHE-x_wjSFaBPPgvlrgTR_Kg&usqp=CAU" alt="Nest Logo" /> 
</p>

## Description

## Installation

```bash
$ yarn
```

## Running the app

```bash
# development
$ yarn start
#or
$ docker-compose up
# you need to run yarn start at least once before running docker-compose up so that the database is create on your mongodb server

# running the tests
$ yarn test

```

## the app is fully tested using jest

## the app has a full swagger documentation of the api at localhost:3000/api

## start the server and go to the documentation url

## please allow for about 4 minutes for the packages to install for the first time cause it's installing mongodb in memory server for faster testing and avoiding messing with your local environment


# notes

nestjs framework was chosen here to allow for easier documentation of the api using , swagger ui and nestjs/swagger i am able to document the whole api using decorators which is amazing , also all the tests are run in the memory and won't affect your local environment because of the mongodb in memory server , but when you first run the tests of the app allow for extra time for the in memory mongodb server to download , if you don't have a 64 bit machine pls change the arch property in the package.json to be 32 instead of 64 so the tests can run smoothly.
also rate limiter is used for limiting sending apis requests to sms or notification service
