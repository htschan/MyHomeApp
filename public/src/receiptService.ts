/// <reference path="_all.ts" />

module MyHomeApp {
    'use strict';

    export interface IReceiptService {
        loadAllReceipts(): ng.IPromise<Receipt[]>;
        selectedReceipt: Receipt;
    }

    export class ReceiptService implements IReceiptService {
        static $inject: Array<string> = ['$q'];

        constructor(private $q: ng.IQService) { }

        loadAllReceipts(): ng.IPromise<Receipt[]> {
            return this.$q.when(this.receipts);
        }
        
        selectedReceipt: Receipt = null;
        
        private receipts: Receipt[] = [];
    }
}