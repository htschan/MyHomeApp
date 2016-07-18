/// <reference path="../_all.ts" />

module MyHomeApp {
    'use strict';

    export interface IUserService {
        registerEmailUser(email: string, password: string): ng.IPromise<any>;
        loginEmailUser(email: string, password: string): ng.IPromise<User>;
        loginFacebookUser(): ng.IPromise<User>;
        getUser(): ng.IPromise<User>;
        getPrefs(): ng.IPromise<Preference>;
        updateUser(user: User): ng.IPromise<User>;
        updatePrefs(pref: Preference): ng.IPromise<string>;
    }

    export class UserService implements IUserService {
        // static $inject: Array<string> = ['q', '$firebaseObject', 'refService', '$firebaseArray'];
        static $inject: Array<string> = ['$q', '$firebaseAuth', '$firebaseObject', 'refService', '$firebaseArray'];
        users: AngularFireArray;
        user: User;

        constructor(
            private $q: ng.IQService,
            private authService: AngularFireAuthService,
            private firebaseObjectService: AngularFireObjectService,
            private refService: IRefService,
            private angularFireArrayService: AngularFireArrayService) {
            this.angularFireArrayService(this.refService.getProfilesRef()).$loaded(x => {
                this.users = x;
            })
        }

        registerEmailUser(email: string, password: string): ng.IPromise<any> {
            let auth = this.authService(this.refService.getRootRef());
            return auth.$createUser({ 'email': email, 'password': password });
        }

        loginEmailUser(email: string, password: string): ng.IPromise<User> {
            let deferred = this.$q.defer();
            let auth = this.authService(this.refService.getRootRef());
            auth.$authWithPassword({ 'email': email, 'password': password }).then((auth: FirebaseAuthData) => {
                this.loginUser(auth, <User>{ 'id': auth.password.email, 'provider': auth.provider, 'email': auth.password.email, 'imageUrl': auth.password.profileImageURL }).then((user: User) => {
                    this.user = user;
                    return deferred.resolve(user);
                }).catch((err) => {
                    return deferred.reject("login failed");
                });
            }).catch((err) => {
                return deferred.reject(err.code || err.message);
            });
            return deferred.promise;
        }

        loginFacebookUser(): ng.IPromise<User> {
            let deferred = this.$q.defer();
            let auth = this.authService(this.refService.getRootRef());
            auth.$authWithOAuthPopup("facebook").then((auth: FirebaseAuthData) => {
                this.loginUser(auth, <User>{ 'id': auth.facebook.id, 'provider': auth.provider, 'imageUrl': auth.facebook.profileImageURL }).then((user: User) => {
                    this.user = user;
                    return deferred.resolve(user);
                }).catch((err) => {
                    return deferred.reject(err.code || err.message);
                });
            }).catch(((err) => {
                return deferred.reject(err.code || err.message);
            }));
            return deferred.promise;
        }

        getUser(): ng.IPromise<User> {
            this.user = <User>{};
            let deferred = this.$q.defer();
            let ref = this.refService.getProfilesRef();
            let clientAuthData = this.getFirebaseUser();
            this.user.provider = clientAuthData.provider;
            if (angular.isDefined(clientAuthData.password)) {
                let password: FirebaseAuthDataPassword = clientAuthData.password;
                this.user.id = password.email;
                this.user.imageUrl = password.profileImageURL;
            }
            if (angular.isDefined(clientAuthData.facebook)) {
                let facebook: FirebaseAuthDataFacebook = clientAuthData.facebook;
                this.user.id = facebook.id;
                this.user.name = facebook.displayName;
                this.user.imageUrl = facebook.profileImageURL;
            }
            ref.child(clientAuthData.uid).once("value", (dataSnapshot: FirebaseDataSnapshot) => {
                let val: User = dataSnapshot.val();
                if (val != null) {
                    this.user.name = val.name;
                    this.user.firstName = val.firstName;
                    this.user.email = val.email;
                    return deferred.resolve(this.user);
                }
                return deferred.reject("user not found");

            });
            return deferred.promise;
        }

        getPrefs(): ng.IPromise<Preference> {
            let pref = <Preference>{};
            let deferred = this.$q.defer();
            let ref = this.refService.getPreferenceRef();
            let clientAuthData = this.getFirebaseUser();
            ref.child(clientAuthData.uid).once("value", (dataSnapshot: FirebaseDataSnapshot) => {
                let val: Preference = dataSnapshot.val();
                if (val != null) {
                    pref.name = val.name;
                    pref.theme = val.theme;
                    return deferred.resolve(val);
                }
                return deferred.reject("preference not found");
            });
            return deferred.promise;
        }

        getFirebaseUser(): FirebaseAuthData {
            let deferred = this.$q.defer();
            let auth = this.authService(this.refService.getRootRef());
            let clientAuthData = auth.$getAuth();
            return clientAuthData;
        }

        loginUser(auth: FirebaseAuthData, user: User): ng.IPromise<User> {
            let deferred = this.$q.defer();
            let ref = this.refService.getProfilesRef();
            ref.child(auth.uid).once("value", (snap: FirebaseDataSnapshot) => {
                if (snap.exists()) {
                    // use existing user
                    user = snap.val();
                    return deferred.resolve(user);
                }
                else {
                    // add user profile
                    let newKey = ref.push().key;
                    ref.child(auth.uid).set(user, (error: any) => {
                        console.log("add profile" + error);
                        if (error == null)
                            return deferred.resolve(user);
                        else
                            return deferred.reject(error);
                    })
                }
            })
            return deferred.promise;
        }

        updateUser(user: User): ng.IPromise<User> {
            let deferred = this.$q.defer();
            let ref = this.refService.getProfilesRef();
            let clientAuthData = this.getFirebaseUser();
            ref.child(clientAuthData.uid).once("value", (snap: FirebaseDataSnapshot) => {
                if (snap.exists()) {
                    var updates = {};
                    updates['name'] = user.name;
                    updates['firstName'] = user.firstName;
                    updates['email'] = user.email;
                    snap.ref().update(updates, (error) => {
                        if (error != null) {
                            return deferred.reject(error || error.message);
                        } else {
                            return deferred.resolve(user);
                        }
                    })
                }
            });
            return deferred.promise;
        }

        updatePrefs(pref: Preference): ng.IPromise<string> {
            let deferred = this.$q.defer();
            let ref = this.refService.getPreferenceRef();
            let clientAuthData = this.getFirebaseUser();
            this.getPref(pref).then((prefNew: Preference) => {
                ref.child(clientAuthData.uid).once("value", (snap: FirebaseDataSnapshot) => {
                    if (snap.exists()) {
                        var updates = {};
                        updates['name'] = pref.name;
                        updates['theme'] = pref.theme;
                        snap.ref().update(updates, (error) => {
                            if (error != null) {
                                return deferred.reject(error || error.message);
                            } else {
                                return deferred.resolve(name);
                            }
                        })
                    }
                });
            });
            return deferred.promise;
        }

        getPref(pref: Preference): ng.IPromise<Preference> {
            let deferred = this.$q.defer();
            let ref = this.refService.getPreferenceRef();
            let clientAuthData = this.getFirebaseUser();
            ref.child(clientAuthData.uid).once("value", (snap: FirebaseDataSnapshot) => {
                if (snap.exists()) {
                    deferred.resolve(snap.val());
                }
                else {
                    // add user prefs
                    ref.child(clientAuthData.uid).set(name, (error: any) => {
                        if (error == null)
                            return deferred.resolve(snap.val());
                        else
                            return deferred.reject(error);
                    })
                }
            });
            return deferred.promise;
        }

        getUserRef(id: string): ng.IPromise<User> {
            let deferred = this.$q.defer();
            let ref = this.refService.getProfilesRef();

            return deferred.promise;
        }
    }
    angular.module("todomvc").service("userService", UserService);
}