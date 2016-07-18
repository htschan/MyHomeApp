/// <reference path="_all.ts" />
module MyHomeApp {
    @Component(angular.module("todomvc"), 'compFavorites', {
        controllerAs: 'ct',
        template: `
        <div class="md-inline-form">Favoriten
            <md-content>
                <md-button class="md-icon-button md-primary" aria-label="Add Product" ng-click='ct.addProduct()'>
                    <ng-md-icon icon="add_circle_outline" size="32"></ng-md-icon>
                </md-button>
                <md-button class="md-icon-button md-primary" aria-label="Undo Remove" ng-disabled="ct.deletedProducts.length < 1" ng-click='ct.undo()'>
                    <ng-md-icon icon="undo" size="32"></ng-md-icon>
                </md-button>
            </md-content>
            <md-list>
                <md-list-item ng-repeat="product in ct.products | orderBy: 'Name'">
                    <img ng-src="{{product.Url}}" width="150px" />
                    <div class="md-list-item-text" layout="column" style="padding-left: 50px">
                        <h3>{{ product.Name }}</h3>
                        <h4>{{ product.Quantity }}</h4>
                        <p>Fr. {{ product.Price }}</p>
                        <md-content>
                            <md-button class="md-icon-button md-primary" ng-click='ct.addProductToShoppinglist(product)' aria-label="Add Product to Shopping List">
                                <ng-md-icon icon="add_shopping_cart" size="24"></ng-md-icon>
                            </md-button>
                            <md-button class="md-icon-button md-primary" ng-click='ct.editProduct(product)' aria-label="Edit Product">
                                <ng-md-icon icon="mode_edit" size="24"></ng-md-icon>
                            </md-button>
                            <md-button class="md-icon-button md-warn" ng-click='ct.removeProduct(product)' aria-label="Remove Product from Favorites">
                                <ng-md-icon icon="remove_circle_outline" size="24"></ng-md-icon>
                            </md-button>
                        </md-content>
                    </div>
                    <md-divider md-inset ng-if="!$last"></md-divider>
                </md-list-item>
            </md-list>
        </div>
        `,
        bindings: {
            currentAuth: '='
        }
    })
    class FavoritesComponent {

        products: AngularFireArray;
        deletedProducts: any[] = [];
        shoppingList: AngularFireArray;
        selected: Product = null;
        newProduct: Product;
        currentAuth: AngularFireAuth;

        static $inject: Array<string> = ['$firebaseObject', 'refService', '$firebaseArray', '$mdDialog'];

        constructor(private $firebaseObjectService: AngularFireObjectService,
            private refService: IRefService,
            private angularFireArrayService: AngularFireArrayService,
            private dialogService: angular.material.IDialogService) {
        }

        $onInit() {
            var ref = this.refService.getFavoritesRef();
            var refS = this.refService.getShoppingListRef();

            this.angularFireArrayService(ref).$loaded(x => {
                this.products = x;
            })
            this.angularFireArrayService(refS).$loaded(x => {
                this.shoppingList = x;
            })

            // ref.on('child_added', snapshot => {
            //     console.log("child_added");
            // });
            //            self.firebase = angularFireArray.$ref();

        }

        selectProduct(product: Product): void {
            this.selected = product;
        }

        addProduct(): void {
            this.newProduct = <Product>{};
            this.dialogService.show(<angular.material.IDialogOptions>{
                templateUrl: 'view/addProduct.html',
                clickOutsideToClose: true,
                locals: {
                    product: this.newProduct
                },
                controller: ($scope, $mdDialog, product) => {
                    $scope.product = product;
                    $scope.save = () => {
                        $mdDialog.hide($scope.product);
                    },
                        $scope.cancel = () => {
                            $mdDialog.cancel();
                        }
                }
            }).then((data) => {
                this.products.$add(this.newProduct);
            }).catch(() => {
                console.log("add canceled");
            });
        }
        addProductToShoppinglist(product: Product): void {
            this.shoppingList.$add(product).then(function (ref) {
                console.log("Added Key: " + ref.key());
            });
        }
        editProduct(product: Product): void {
            this.newProduct = product;
            this.dialogService.show(<angular.material.IDialogOptions>{
                templateUrl: 'view/addProduct.html',
                clickOutsideToClose: true,
                locals: {
                    product: this.newProduct
                },
                controller: ($scope, $mdDialog, product) => {
                    $scope.product = product;
                    $scope.save = () => {
                        $mdDialog.hide($scope.product);
                    },
                        $scope.cancel = () => {
                            $mdDialog.cancel();
                        }
                }
            }).then((data) => {
                this.products.$add(this.newProduct);
            }).catch(() => {
                console.log("add canceled");
            });
        }
        removeProduct(product: Product): void {
            this.products.$remove(product).then((val) => {
                console.log("delete success");
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
