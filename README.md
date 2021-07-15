# Flipic
Flipic is a survey web application that takes a fun card-swiping approach to simplify decision-making using binary choices.

[![Flipic-pitch](http://img.youtube.com/vi/UbCWLUYKLtE/0.jpg)](http://www.youtube.com/watch?v=UbCWLUYKLtE "Video Title")

# Set up

### Install node, this is running on release v10.19.0

## Front End 
***
### Windows
From command line
```
cd flipic/front-end
npm install
npm run start
```
***
### Mac/Linux
From command line
```
cd flipic/front-end
```
In package.json change the line
```
"start": "Set PORT=4000 && react-scripts start",
```
to
```
"start": "PORT=4000 && react-scripts start",
```
Then
```
npm install
npm run start
```
***
## Back End

NodeJS + MongoDB API for quiz retrieval, creation and modification.

Run the API by specifying
```
cd flipic/back-end
npm install
npm start
```
Head to localhost:4000/doc/ to see the swagger API specification

The back and front end were set up according to the following documentation http://jasonwatmore.com/post/2018/06/14/nodejs-mongodb-simple-api-for-authentication-registration-and-user-management
