/// <reference path="_all.ts" />
module MyHomeApp {
    @Component(angular.module("todomvc"), 'compProductCategories', {
        controllerAs: 'ct',
        template: `
        <div class="md-inline-form">Produktkategorien
            <md-content>
                <md-button class="md-icon-button md-primary" aria-label="Add Product" ng-click='ct.addProductCategory()'>
                    <ng-md-icon icon="add_circle_outline" size="32"></ng-md-icon>
                </md-button>
                <md-button class="md-icon-button md-primary" aria-label="Undo Remove" ng-disabled="ct.deletedCategories.length < 1" ng-click='ct.undo()'>
                    <ng-md-icon icon="undo" size="32"></ng-md-icon>
                </md-button>
            </md-content>

            <form ng-show="ct.editMode">
                <div class="md-dialog-content">
                    <md-dialog-actions layout="row">
                        <md-input-container>
                            <label>Name</label>
                            <input ng-model="ct.newProductCategory.Name">
                        </md-input-container>
                        <md-button class="md-icon-button md-primary" ng-click='ct.save()' aria-label="Save Productcategory">
                            <ng-md-icon icon="save" size="24"></ng-md-icon>
                        </md-button>
                        <md-button class="md-icon-button md-primary" ng-click='ct.cancel()' aria-label="Cancel Productcategory">
                            <ng-md-icon icon="cancel" size="24"></ng-md-icon>
                        </md-button>
                    </md-dialog-actions>
                </div>
            </form>


            <md-list>
                <md-list-item ng-repeat="category in ct.categories | orderBy: 'Name'">
                    <div class="md-list-item-text" layout="column">
                        <md-content>
                            <md-button class="md-icon-button md-primary" ng-click='ct.editProductCategory(category)' aria-label="Edit Productcategory">
                                <ng-md-icon icon="mode_edit" size="24"></ng-md-icon>
                            </md-button>
                            <md-button class="md-icon-button md-warn" ng-click='ct.removeProductCategory(category)' aria-label="Remove Productcategory from Favorites">
                                <ng-md-icon icon="remove_circle_outline" size="24"></ng-md-icon>
                            </md-button>
                            <h3 style="display: inline">{{ category.Name }}</h3>
                        </md-content>
                    </div>
                </md-list-item>
            </md-list>
        </div>
        `,
        bindings: {
            currentAuth: '='
        }
    })
    class ProductCategoriesComponent {

        categories: AngularFireArray;
        deletedCategories: any[] = [];
        newProductCategory: ProductCategory;
        currentAuth: AngularFireAuth;
        editMode: boolean;
        editItem: boolean;

        static $inject: Array<string> = ['$firebaseObject', 'refService', '$firebaseArray', '$mdDialog'];

        constructor(private $firebaseObjectService: AngularFireObjectService,
            private refService: IRefService,
            private angularFireArrayService: AngularFireArrayService,
            private dialogService: angular.material.IDialogService) {
        }

        $onInit() {
            var ref = this.refService.getProductCategoriesRef();
            this.angularFireArrayService(ref).$loaded(x => {
                this.categories = x;
            })
        }

        addProductCategory(): void {
            this.newProductCategory = <ProductCategory>{};
            this.editMode = true;
            this.editItem = false;
        }
        save(): void {
            if (this.editItem) {
                this.editMode = false;
                this.categories.$save(this.newProductCategory).then((data) => {
                    console.log("updated category");
                }).catch((error) => {
                    console.log("updated category failed");
                });
            } else {
                this.categories.$add(this.newProductCategory).then((data) => {
                    this.editMode = false;
                }).catch((error) => {
                    console.log("failed to add category");
                });
            }
        }
        cancel(): void {
            this.editMode = false;
        }
        editProductCategory(productCategory: ProductCategory): void {
            this.newProductCategory = productCategory;
            this.editMode = true;
            this.editItem = true;
        }
        removeProductCategory(product: Product): void {
            this.categories.$remove(product).then((val) => {
                console.log("delete success");
                this.deletedCategories.push(product);
            }).catch((err) => {
                console.log("delete error")
            });
        }
        undo(): void {
            this.categories.$add(this.deletedCategories.shift()).then((val) => {
                console.log("undo success");
            }).catch((err) => {
                console.log("undo error")
            });
        }
    }
}
