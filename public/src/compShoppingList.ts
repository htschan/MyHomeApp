/// <reference path="_all.ts" />
module MyHomeApp {
    @Component(angular.module("todomvc"), 'compShoppingList', {
        controllerAs: 'ct',
        template:
        `
<div class="md-inline-form">Produkte
   <md-content>
        <section layout="row" layout-sm="column" layout-wrap>
            <md-button class="md-icon-button md-warn" ng-click="ct.clearShoppinglist()" aria-label="Delete Shoppinglist">
                <ng-md-icon icon="delete" size="24"></ng-md-icon>
            </md-button>
            <md-button class="md-icon-button md-primary" aria-label="Undo Remove" ng-disabled="ct.deletedProducts.length < 1" ng-click="ct.undo()">
                <ng-md-icon icon="undo" size="32"></ng-md-icon>
            </md-button>
        </section>
    </md-content>    <md-list>
        <md-list-item ng-repeat="product in ct.products | orderBy: 'Name'">
            <img ng-src="{{product.Url}}" width="150px"/>
            <div class="md-list-item-text" layout="column">
                <h3>{{ product.Name }}</h3>
                <h4>{{ product.Quantity }}</h4>
                <p>Fr. {{ product.Price }}</p>
                <md-button class="md-icon-button md-warn" ng-click="ct.removeFromShoppinglist(product)" aria-label="Remove Product from Shoppinglist">
                    <ng-md-icon icon="remove_circle_outline" size="24"></ng-md-icon>
                </md-button>
            </div>
            <md-divider md-inset ng-if="!$last"></md-divider>
        </md-list-item>
    </md-list>
</div>
        `
    })
    class ShoppingListComponent {

        static $inject: Array<string> = ['$firebaseArray', '$firebaseObject','refService'];

        constructor(private angularFireArrayService: AngularFireArrayService,
            private foService: AngularFireObjectService,
            private refService: IRefService) {

            console.log("ctor ShoppingListComponent.")

            var ref = refService.getShoppingListRef();

            this.afo = foService(ref);

            angularFireArrayService(ref).$loaded(x => {
                this.products = x;
            })

            ref.on('child_added', snapshot => {
                console.log("child_added");
            });

        }
        products: AngularFireArray;
        deletedProducts: any[] = [];
        selected: ShoppingItem = null;
        shoppingItems: ShoppingItem[] = [];
        afo: AngularFireObject = null;

        selectShoppingItem(shoppingItem: ShoppingItem): void {
            this.selected = shoppingItem;
        }
        clearShoppinglist(): void {
            this.afo.$remove().then(function (ref) {
                console.log("shoppinglist cleared");
            })
        }
        removeFromShoppinglist(product: Product): void {
            this.products.$remove(product).then((val) => {
                this.deletedProducts.push(product);
            }).catch((err) => {
                console.log("delete error")
            });
        }
        undo(): void {
            this.products.$add(this.deletedProducts.shift()).then((val) => {
                console.log("undo success");
            }).catch((err) => {
                console.log("undo error")
            });
        }
    }
}
