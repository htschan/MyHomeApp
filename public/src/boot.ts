/// <reference path="_all.ts" />
module MyHomeApp {
    angular.module('todomvc', ['ui.router', 'firebase', 'ngMaterial', 'ngMdIcons'])
        .service('ProductService', ProductService)
        .service('ShoppingListService', ShoppingListService)
        .service('ReceiptService', ReceiptService)
        .config(($mdIconProvider: angular.material.IIconProvider,
            $mdThemingProvider: angular.material.IThemingProvider) => {
            $mdIconProvider
                .icon('menu', 'img/icons/menu.svg', 24);

            $mdThemingProvider.theme('default')
                .primaryPalette('blue')
                .accentPalette('red');
        })
        .run(function ($rootScope, $state) {
            $rootScope.$on("$stateChangeError", function (e, toState, toParams, fromState, fromParams, err) {
                if (err === "AUTH_REQUIRED") {
                    $state.go("login");
                }
            })
        });
} 