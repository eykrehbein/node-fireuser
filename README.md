# node-fireuser
This is a library for easy user management with Firebase Realtime Database and Firestore. The library creates a tree in your Database in which the user information gets saved and edited. The tree is build on a very simple way so even if you wouldn't use the library to access the data, you would understand it. ( But you will never need to because the library has everything included to create, edit , view and delete users )
## Installation and Initialization

Install the library easily with npm. 
```
npm install node-fireuser 
```
You'll also need the Firebase-admin SDK for this library. Just install it aswell with npm.
```
npm install firebase-admin
```



After you installed both, you have to include them and do the first commands. If you don't know how to initialize the Firebase Admin SDK look [here](https://firebase.google.com/docs/admin/setup)

**With Webpack**
```javascript
import * as fireuser from ('node-fireuser')
import * as admin from ('firebase-admin')
import * as serviceWorker from ('path/to/your/json/file');

/* Initialize Firebase Admin
   It's necassary to do this BEFORE you init the Fireuser library
*/
admin.initializeApp({
    credential: admin.credential.cert(serviceWorker),
    databaseURL: "https://[YOUR PROJECT].firebaseio.com/"
});

/* Init Fireuser
   Use the firebase-admin variable as argument! In this case it's admin
*/
if(fireuser.init(admin)){
    console.log("Everything fine");
    ...
}else{
    console.log("An error appeared");
}
```
**Without Webpack**
```javascript
const fireuser = require('node-fireuser')
const admin = require('firebase-admin')
const serviceWorker = require('path/to/your/json/file');
...
```

## Realtime Database Commands
### createUser(authID, options)
You'll need this command every time, you want to create a new user in the database. It uses the parameter *authID* and *options* . For *authID* you should use the Firebase Authentication ID of the user. *options* is an object where you can enter every data the user should have in the database.
```javascript
// Basic syntax
fireuser.database.createUser(authID, options)

// Example
const authID = req.body.authID;
const rqUsername = req.body.username;
const rqEmail = req.body.email;
const rqFullname = req.body.fullname;

fireuser.database.createUser(authID, {
    username: rqUsername,
    email: rqEmail,
    fullname: rqFullname
});
```
### getUserById(authID)
If you want to retrieve the data of a special user, you can use this function. As parameter, it takes the authID of the user. The function is a promise which returns an object.
```javascript
fireuser.database.getUserById(authID).then(res => {
    let username = res.username;
    let email = res.email;
    console.log("The username is: " + username);
    console.log("The email address is: " + email);
});
```
Returns *null* when no user was found.
### getUsersById([authID1, authID2])
coming soon...
### changeUserData(authID,options)
Use this command to change data of an existing user. Parameters are the Firebase AuthID and the options object.
```javascript
fireuser.database.changeUserData(authID, {
    username: newUsername,
    email: newEmail,
    newElement: newElement
});
```
Creates a new user when no user was found.
### watchUserChanges(authID,throwbackFunction)
If you want to watch changes of the user data live and interact with it, use this function. You need the Firebase AuthID and a throwback function.
```javascript
fireuser.database.watchUserChanges(authID, newData => f(newData));

// gets fired every time the user data changes
function tb(newData){
    console.log(newData.username);
}
```
### removeUser(authID)
Removes a user from the database
```javascript
if(fireuser.database.removeUser(authID)){
    // user removed
}
```
### getUserNumber()
Returns (a promise of) the total amount of users in the databse
```javascript
fireuser.database.getUserNumber().then(number => console.log(number.toString()));
```

## Firestore Commands
... under construction
