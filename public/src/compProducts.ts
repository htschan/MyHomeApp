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
            <md-content>
                <!--<md-virtual-repeat-container md-top-index="ct.topIndex">-->
                <md-virtual-repeat-container md-auto-shrink="true">
                    <!--<p md-virtual-repeat="product in ct.products" md-on-demand="{{ct.onDemand}}">{{product}}</p>-->
                    <div md-virtual-repeat="product in ct.products">
                        <img ng-src="{{product.Url}}" />
                        <div class="md-list-item-text" layout="column">
                            <h3>{{ product.Name }}</h3>
                            <h4>{{ product.Quantity }}</h4>
                            <p>Fr. {{ product.Price }}</p>
                            <md-button ng-click='ct.addProductToShoppinglist(product)'>+</md-button>
                        </div>
                    </div>
                </md-virtual-repeat-container>
            </md-content>
            <!--
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
            -->
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
            let self = this;
            this.refService.getProductsRef().once("value", (snap: FirebaseDataSnapshot) => {
                this.products = [];
                snap.forEach((childSnap: FirebaseDataSnapshot) => {
                    self.products.push(childSnap.val());
                })
                console.log("written");
            });

            this.angularFireArrayService(this.refService.getShoppingListRef()).$loaded(x => {
                this.shoppingList = x;
            })

            this.items = [];
            for (let i = 1; i <= 1000000; i++) {
                this.items.push({
                    value: i
                });
            }
            this.dataset._refresh(this.items);
        }

        shoppingList: AngularFireArray;
        selected: Product = null;
        aProduct: Product = null;
        newProduct: Product = null;
        products: Product[];
        topIndex: number = 1000;

        items: any[];

        onDemand = true;
        dataset = {
            _items: [],
            _refresh: function (data) {
                this._items = data.filter(function (el) {
                    return !angular.isDefined(el._excluded) || el._excluded === false;
                })
            },
            getItemAtIndex: function (index) {
                return this._items[index];
            }, //getItemAtIndex
            getLength: function () {
                return this._items.length
            } //getLenth
        }; //dataset


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
