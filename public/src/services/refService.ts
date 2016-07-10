/// <reference path="../_all.ts" />

module MyHomeApp {
    export interface IRefService {
        getRootRef(): Firebase;
        getFirebaseUrl(): string;
        getPreferenceRef(): Firebase;
        getShoppingListRef(): Firebase;
        getReceiptsRef(): Firebase;
        getFavoritesRef(): Firebase;
        getProductsRef(): Firebase;
        getTodosRef(): Firebase;
        getProfilesRef(): Firebase;
        getAuth(): AngularFireAuth;
    }

    export class RefService implements IRefService {
        static $inject = ['$firebaseAuth'];

        rootRef: Firebase;

        constructor(private authService: AngularFireAuthService) {
            this.rootRef = this.getRootRef();
        }

        getRootRef(): Firebase {
            return new Firebase(this.getFirebaseUrl());
        }

        getFirebaseUrl(): string {
            return 'https://shining-inferno-test1.firebaseio.com/MyHome';
        }

        getPreferenceRef(): Firebase {
            return this.rootRef.child('Preferences').child(this.getAuth().$getAuth().uid);
        }
        getShoppingListRef(): Firebase {
            return this.rootRef.child('Shoppinglist');
        }
        getReceiptsRef(): Firebase {
            return this.rootRef.child('Receipts');
        }
        getFavoritesRef(): Firebase {
            return this.rootRef.child('Favorites');
        }
        getProductsRef(): Firebase {
            return this.rootRef.child('Products/Coop');
        }
        getTodosRef(): Firebase {
            return this.rootRef.child('Todos');
        }
        getProfilesRef(): Firebase {
            return this.rootRef.child('Profiles');
        }
        getAuth(): AngularFireAuth {
            return this.authService(this.rootRef);
        }
    }
    angular.module("todomvc").service("refService", RefService);
}