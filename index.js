/*
    NodeJS - Fireuser
    Author: Eyk Rehbein
    Github: https://github.com/eykjs/node-fireuser
    Twitter: https://twitter.com/eykjs
    Version: 0.0.1
    Licence: MIT 
    Dependecies:
       - Firebase Admin SDK

    Please read the README on github to use it correctly.
*/
const _app = null;
const _db = null;
const _ref = null;

exports.init = (App) => {
    if(typeof App !== 'undefined'){
        if(App != null){
            this._app = App;
            this._db = this._app.database();
            this._ref = this._db.ref("fireuser/");
            return true;
        }else{
            return false;
        }
    }else{
        return false;
    }
}
exports.database = {
    createUser: (authID, options) => {
        if(authID != null){
            this._db.ref("fireuser/"+authID).set(options);
        }
    },
    getUserById: (authID) => {
        return new Promise((resolve, reject) => {
            this._db.ref("fireuser/"+authID).once("value", data => {
                resolve(data.val());
            });
        });
    },
    getUsersById: (idList) => {
       // Not working yet. The problem is that the for loop has to be finished before the value returns.
        /* return new Promise((resolve, reject) => {
            returnlist = [];      
            for(i=0;i != idList.length; i++){
                returnlist.push(new Promise((r, rj) => {
                    this._db.ref("fireuser/"+idList[i]).once("value", data => {
                        return data.val();
                     });
                }));
            }
            resolve(returnlist);
        });
        */
    },
    changeUserData: (authID, options) => {
        this._db.ref("fireuser/"+authID).update(options);
    },
    watchUserChanges: (authID, throwbackFunction) => {
        this._db.ref("fireuser/"+authID).on('value', snap => {
            if(typeof throwbackFunction === "function"){
                throwbackFunction(snap.val());
            }else{
                console.error("Error: The second argument has to be a function.");
            }
        });
    },
    removeUser: (authID) => {
        this._db.ref("fireuser/"+authID).remove(e => {
            if(!e){
                return true;
            }else{
                return false;
            }
        });
    },
    getUserNumber: () => {
        return new Promise((resolve, reject) => {
            this._db.ref("fireuser/").once("value", snap => {
                resolve(snap.numChildren());
            });
         });
    }
}