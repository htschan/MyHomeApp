/// <reference path="../_all.ts" />

module MyHomeApp {
    'use strict';

    export interface IUserService {
        loginUser(user: User);
    }

    export class UserService implements IUserService {
        // static $inject: Array<string> = ['q', '$firebaseObject', 'refService', '$firebaseArray'];
        static $inject: Array<string> = ['$firebaseObject', 'refService', '$firebaseArray'];
        users: AngularFireArray;

        constructor(
            // private $q: ng.IQService,
            private firebaseObjectService: AngularFireObjectService,
            private refService: IRefService,
            private angularFireArrayService: AngularFireArrayService) {
            this.angularFireArrayService(this.refService.getProfilesRef()).$loaded(x => {
                this.users = x;
            })
        }

        loginUser(user: User) {
            let self = this;
            let ref = this.refService.getProfilesRef();
            ref.orderByChild('id').equalTo(user.id).limitToFirst(1).once("value", (dataSnapshot: FirebaseDataSnapshot) => {
                console.log(dataSnapshot);
                let val = dataSnapshot.val();
                if (val != null) {
                    console.log(val);
                } else {
                    self.users.$add(user).then(function (x) {
                        console.log("$add user done " + x);
                    }).catch(function (error) {
                        console.log("$add failed " + error);
                    })


                }
            });
        }
    }
    angular.module("todomvc").service("userService", UserService);
}