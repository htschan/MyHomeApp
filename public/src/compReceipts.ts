/// <reference path="_all.ts" />
module MyHomeApp {
    @Component(angular.module("todomvc"), 'compReceipts', {
        controllerAs: 'ct',
        template:
        `
        <div>
            <md-lis>
                <md-list-item ng-repeat="receipt in ct.receipts | orderBy: 'name'">
                    <div class="md-list-item-text" layout="column">
                        <h3>{{ receipt.name }}</h3>
                    </div>
                </md-list-item>
            </md-lis>
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
           var ref = this.refService.getReceiptsRef();
            this.angularFireArrayService(ref).$loaded(x => {
                this.receipts = x;
            })
        }

        selected: Receipt = null;
        receipts: AngularFireArray;

        selectReceipt (receipt : Receipt) : void{
            this.selected = receipt;
        }
    }
}
