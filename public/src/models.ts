/// <reference path="_all.ts" />

module MyHomeApp {
    export class Product {

        constructor(
            public name: string,
            public quantity: string,
            public imageUrl: string,
            public price: number) {
        }
    }

    export class Receipt {
        constructor(public name: string) { }
    }

    export class ShoppingItem {
        constructor(public name: string) { }
    }

    export class TodoItem {
        constructor(public title: string, public completed: boolean) {
        }
    }
}