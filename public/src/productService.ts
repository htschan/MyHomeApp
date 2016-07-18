/// <reference path="_all.ts" />

module MyHomeApp {
    'use strict';

    export interface IProductService {
        loadAllProducts(): ng.IPromise<Product[]>;
        selectedProduct: Product;
    }

    export class ProductService implements IProductService {
        static $inject: Array<string> = ['$q'];

        constructor(private $q: ng.IQService) { }

        loadAllProducts(): ng.IPromise<Product[]> {
            return this.$q.when(this.products);
        }
        selectedProduct: Product = null;

        private products: Product[] = [
            {
                Name: 'Ruchbrot',
                Category: "Brot & Backwaren",
                Quantity: '500 g',
                Url: 'http://img.coopathome.ch/produkte/mittel/30/3041726mun.jpg',
                Price: 1.15
            },
            {
                Name: 'Bifidus Jogurt Nature',
                Category: 'Milchprodukte',
                Quantity: '4 * 125 g',
                Url: 'http://img.coopathome.ch/produkte/mittel/56/5678559mun.jpg',
                Price: 1.70
            }
        ];
    }
}