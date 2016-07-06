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
                name: 'Ruchbrot',
                quantity: '500 g',
                imageUrl: 'http://img.coopathome.ch/produkte/mittel/30/3041726mun.jpg',
                price: 1.15
            },
            {
                name: 'Bifidus Jogurt Nature',
                quantity: '4 * 125 g',
                imageUrl: 'http://img.coopathome.ch/produkte/mittel/56/5678559mun.jpg',
                price: 1.70
            }
        ];
    }
}