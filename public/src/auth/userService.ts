/// <reference path="../_all.ts" />

module MyHomeApp {
    'use strict';

    export interface IUserService {
        registerEmailUser(email: string, password: string): ng.IPromise<any>;
        loginEmailUser(email: string, password: string): ng.IPromise<User>;
        loginFacebookUser(): ng.IPromise<User>;
        getUser(): ng.IPromise<User>;
        updateUser(user: User): ng.IPromise<User>;
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
            var self = this;
            let deferred = this.$q.defer();
            let auth = this.authService(this.refService.getRootRef());
            auth.$authWithPassword({ 'email': email, 'password': password }).then((auth: FirebaseAuthData) => {
                self.loginUser(auth, <User>{ 'id': auth.password.email, 'provider': auth.provider, 'email': auth.password.email, 'imageUrl': auth.password.profileImageURL }).then((user: User) => {
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
            var self = this;
            let deferred = this.$q.defer();
            let auth = this.authService(this.refService.getRootRef());
            auth.$authWithOAuthPopup("facebook").then((auth: FirebaseAuthData) => {
                self.loginUser(auth, <User>{ 'id': auth.facebook.id, 'provider': auth.provider, 'imageUrl': auth.facebook.profileImageURL }).then((user: User) => {
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
            let self = this;
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

        getFirebaseUser(): FirebaseAuthData {
            let deferred = this.$q.defer();
            let auth = this.authService(this.refService.getRootRef());
            let clientAuthData = auth.$getAuth();
            return clientAuthData;
        }

        loginUser(auth: FirebaseAuthData, user: User): ng.IPromise<User> {
            let self = this;
            let deferred = this.$q.defer();
            let ref = this.refService.getProfilesRef();
            ref.child(auth.uid).once("value", (snap: FirebaseDataSnapshot) => {
                if (snap.val() == null) {
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
                else {
                    // use existing user
                    user = snap.val();
                    return deferred.resolve(user);
                }
            })
            return deferred.promise;
        }

        updateUser(user: User): ng.IPromise<User> {
            let self = this;
            let deferred = this.$q.defer();
            let ref = this.refService.getProfilesRef();
            let clientAuthData = this.getFirebaseUser();
            ref.child(clientAuthData.uid).once("value", (dataSnapshot: FirebaseDataSnapshot) => {
                let val = dataSnapshot.val();
                if (val != null) {
                    var updates = {};
                    updates['name'] = user.name;
                    updates['firstName'] = user.firstName;
                    updates['email'] = user.email;
                    dataSnapshot.ref().update(updates, (error) => {
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

        getUserRef(id: string): ng.IPromise<User> {
            let deferred = this.$q.defer();
            let ref = this.refService.getProfilesRef();

            return deferred.promise;
        }
    }
    angular.module("todomvc").service("userService", UserService);
}