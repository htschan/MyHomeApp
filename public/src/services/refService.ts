/// <reference path="../_all.ts" />

module MyHomeApp {
    export interface IRefService {
        getPreferenceRef(): Firebase;
        getShoppingListRef(): Firebase;
        getReceiptsRef(): Firebase;
        getFavoritesRef(): Firebase;
        getProductsRef(): Firebase;
        getTodosRef(): Firebase;
        getAuth(): AngularFireAuth;
    }

    export class RefService implements IRefService {
        static $inject = ['constService', '$firebaseAuth'];

        rootRef: Firebase;

        constructor(private constService: IConstService,
            private authService: AngularFireAuthService) {
            this.rootRef = constService.getRootRef();
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
        getAuth(): AngularFireAuth {
            return this.authService(this.rootRef);
        }
    }
    angular.module("todomvc").service("refService", RefService);
}