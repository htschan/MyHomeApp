/// <reference path="../_all.ts" />
module MyHomeApp {
    export interface IConstService {
        getRootRef(): Firebase;
        getFirebaseUrl(): string;
    }

    export class ConstService implements IConstService {
        static $inject = ['Firebase'];

        constructor(private firebase: Firebase) {
        }

        getRootRef(): Firebase {
            return new Firebase(this.getFirebaseUrl());
        }

        getFirebaseUrl(): string {
            return 'https://shining-inferno-test1.firebaseio.com/MyHome';
        }

    }
    angular.module("todomvc").service("constService", ConstService);
}