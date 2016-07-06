/// <reference path="_all.ts" />
module MyHomeApp {
    @Component(angular.module("todomvc"), 'compProducts', {
        controllerAs: 'ct',
        template:
        `
        <div class="md-inline-form">
            <md-content>
                <section layout="row" layout-sm="column" layout-wrap>
                    <md-button ng-click='ct.searchProduct()'>Search Product</md-button>
                </section>
            </md-content>
            <md-content md-theme="docs-dark" layout-gt-sm="row" layout-padding>
                <div>
                    <md-input-container>
                        <label>Name</label>
                        <input ng-model="ct.aProduct.Name">
                    </md-input-container>
                </div>
            </md-content>
            <md-list>
                <md-list-item ng-repeat="product in ct.products | orderBy: 'Name'">
                    <img ng-src="{{product.Url}}" />
                    <div class="md-list-item-text" layout="column">
                        <h3>{{ product.Name }}</h3>
                        <h4>{{ product.Quantity }}</h4>
                        <p>Fr. {{ product.Price }}</p>
                        <md-button ng-click='ct.addProductToShoppinglist(product)'>+</md-button>
                    </div>
                </md-list-item>
            </md-list>
        </div>
        `,
        bindings: {
            auth: "="
        }
    })
    class ProductsComponent {

        static $inject: Array<string> = ['$firebaseObject', 'refService', '$firebaseArray'];


        constructor(private $firebaseObjectService: AngularFireObjectService,
            private refService: IRefService,
            private angularFireArrayService: AngularFireArrayService) {
        }

        $onInit() {
            this.angularFireArrayService(this.refService.getProductsRef()).$loaded(x => {
                this.products = x;
            })
            this.angularFireArrayService(this.refService.getShoppingListRef()).$loaded(x => {
                this.shoppingList = x;
            })

        }

        shoppingList: AngularFireArray;
        selected: Product = null;
        aProduct: Product = null;
        newProduct: Product = null;
        products: AngularFireArray;

        searchProduct(): void {

        }

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
