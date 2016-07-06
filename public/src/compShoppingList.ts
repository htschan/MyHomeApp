/// <reference path="_all.ts" />
module MyHomeApp {
    @Component(angular.module("todomvc"), 'compShoppingList', {
        controllerAs: 'ct',
        template:
        `
<div class="md-inline-form">Produkte
   <md-content>
        <section layout="row" layout-sm="column" layout-wrap>
            <md-button ng-click='ct.clearShoppinglist()'>Liste löschen</md-button>
        </section>
    </md-content>    <md-list>
        <md-list-item ng-repeat="product in ct.products | orderBy: 'Name'">
            <img ng-src="{{product.Url}}" />
            <div class="md-list-item-text" layout="column">
                <h3>{{ product.Name }}</h3>
                <h4>{{ product.Quantity }}</h4>
                <p>Fr. {{ product.Price }}</p>
                <md-button ng-click='ct.removeFromShoppinglist(product)'>(-)</md-button>
            </div>
        </md-list-item>
    </md-list>
</div>
        `
    })
    class ShoppingListComponent {

        static $inject: Array<string> = ['$firebaseArray', '$firebaseObject','refService'];

        /**
         *
         */
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
            this.products.$remove(product);
        }

    }
}
