/*
    NodeJS - Fireuser
    Author: Eyk Rehbein
    Github: https://github.com/eykjs/node-fireuser
    Twitter: https://twitter.com/eykjs
    Version: 1.0.0
    Licence: MIT 
    Dependecies:
       - Firebase Admin SDK

    Please read the README on Github to use it correctly.
*/
const _app = null;
const _db = null;
const _collection = null;
const _store = null;
exports.init = (App) => {
    if(typeof App !== 'undefined'){
        if(App != null){
            this._app = App;
            // rt - database
            this._db = this._app.database();
            // firestore
            this._store = this._app.firestore();
            this._collection = this._store.collection("fireuser");
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
        return new Promise((resolve, reject) => {
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
        
    },
    changeUserData: (authID, options) => {
        this._db.ref("fireuser/"+authID).update(options);
    },
    watchUserChanges: (authID, callbackFunction) => {
        this._db.ref("fireuser/"+authID).on('value', snap => {
            if(typeof callbackFunction === "function"){
                callbackFunction(snap.val());
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
    countUsers: () => {
        return new Promise((resolve, reject) => {
            this._db.ref("fireuser/").once("value", snap => {
                resolve(snap.numChildren());
            });
         });
    }
}
exports.store = {
    createUser: (authID, options) => {
        if(authID != null){
            let docRef = this._collection.doc(authID);
            docRef.set(options);
        }
    },
    getUserById: (authID) => {
        let docRef = this._collection.doc(authID);
        return new Promise((resolve, reject) => {
            docRef.get()
            .then(doc => {
                if(!doc.exists){
                    return null;
                }else{
                    resolve(doc.data());
                }
            });
        });
    },
    changeUserData: (authID, options) => {
        let docRef = this._collection.doc(authID);
        docRef.update(options);
    },
    watchUserChanges: (authID, callbackFunction) => {
        let docRef = this._collection.doc(authID);
        docRef.onSnapshot(res => callbackFunction(res.data()));
    },
    removeUser: (authID) => {
        let docRef = this._collection.doc(authID);
        docRef.delete();
    },
    countUsers: () => {
        let docRef = this._collection;
        return new Promise( (resolve, reject) => {
            docRef.get()
                .then(doc => {
                    resolve(doc.size);
                });
        })
    },
    searchUser: (entry, attribute, value) => {
        let docRef = this._collection;
        return new Promise( (resolve , reject) => {
            docRef.where(entry, attribute, value).get()
            .then(res => {
                let list = [];
                res.forEach(doc => {
                    list.push(doc.data());
                });
                resolve(list);
            });
        });
            

    }
}