/// <reference path="_all.ts" />

module MyHomeApp {
    'use strict';

    export interface IShoppingListService {
        loadAllShoppingItems(): ng.IPromise<ShoppingItem[]>;
        selectedShoppingItem: ShoppingItem;
    }

    export class ShoppingListService implements IShoppingListService {
        static $inject: Array<string> = ['$q'];

        constructor(private $q: ng.IQService) { }

        loadAllShoppingItems(): ng.IPromise<ShoppingItem[]> {
            return this.$q.when(this.shoppingItems);
        }
        
        selectedShoppingItem: ShoppingItem = null;
        
        private shoppingItems: ShoppingItem[] = [];
    }
}