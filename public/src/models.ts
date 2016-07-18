/// <reference path="_all.ts" />

module MyHomeApp {
    export class Product {
        constructor(
            public Name: string,
            public Category: string,
            public Quantity: string,
            public Url: string,
            public Price: number) {
        }
    }

    export class ProductCategory {
        constructor(
            public Name: string) {
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

    export class User {
        constructor(public id: string,
            public provider: string,
            public email?: string,
            public name?: string,
            public firstName?: string,
            public imageUrl?: string
        ) { }
    }

    export class Preference {
        constructor(public name: string,
            public theme: string) {
        }
    }
}