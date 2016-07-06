/// <reference path="_all.ts" />
module MyHomeApp {
    @Component(angular.module("todomvc"), 'products', {
        controllerAs: 'ct',
        templateUrl: "/view/products.html",
        bindings: {
            products: "="
        }
    })
    class ProductComponent {

        static $inject: Array<string> = ['$firebaseObject', 'fbRef', '$location'];

        constructor(private $firebaseObjectService: AngularFireObjectService,
            private fbRef: any,
            private locationService: angular.ILocationService) {
            var self = this;
        }

        shoppingList: AngularFireArray;
        selected: Product = null;
        newProduct: Product = null;


        selectProduct(product: Product): void {
            this.selected = product;
        }

        addProduct(): void {
            // this.products.$add(this.newProduct);
        }
        addProductToShoppinglist(product: Product): void {
            this.shoppingList.$add(product).then(function (ref) {
                console.log("Added Key: " + ref.key());
            });
        }
    }
}
