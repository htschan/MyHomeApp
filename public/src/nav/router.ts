/// <reference path="../_all.ts" />
module MyHomeApp {

      angular.module('todomvc').config(($stateProvider, $urlRouterProvider) => {

            $urlRouterProvider.otherwise("/home");

            $stateProvider
                  .state('home', {
                        url: "/home", template: "<comp-home current-auth='$resolve.currentAuth'></comp-home>", resolve: {
                              currentAuth: function (refService: IRefService) {
                                    return refService.getAuth().$requireAuth();
                              }
                        }
                  })
                  .state('login', { url: "/login", template: "<comp-login current-auth='$resolve.currentAuth'></comp-login>" })
                  .state('logout', { url: "/logout", template: "<comp-logout></comp-logout>" })
                  .state('shoppinglist', {
                        url: "/shoppinglist", template: "<comp-shopping-list></comp-shopping-list>", resolve: {
                              auth: function (refService: IRefService) {
                                    return refService.getAuth().$requireAuth();
                              }
                        }
                  })
                  .state('products', {
                        url: "/products", template: "<comp-products auth='$resolve.auth'></comp-products>", resolve: {
                              auth: function (refService: IRefService) {
                                    return refService.getAuth().$requireAuth();
                              }
                        }
                  })
                  .state('favorites', {
                        url: "/favorites", template: "<comp-favorites auth='$resolve.auth'></comp-favorites>", resolve: {
                              auth: function (refService: IRefService) {
                                    return refService.getAuth().$requireAuth();
                              }
                        }
                  })
                  .state('todos', {
                        url: "/todos", template: "<comp-todo auth='$resolve.auth'></comp-todo>", resolve: {
                              auth: function (refService: IRefService) {
                                    return refService.getAuth().$requireAuth();
                              }
                        }
                  })
                 .state('userprefs', {
                        url: "/userprefs", template: "<edit-user-prefs auth='$resolve.auth'></edit-user-prefs>", resolve: {
                              auth: function (refService: IRefService) {
                                    return refService.getAuth().$requireAuth();
                              }
                        }
                  })                  // .state('products', {
                  //       url: "/products", template: "<comp-products products='$resolve.products'></comp-products>", resolve: {
                  //             products: function (fbRef, $firebaseArray, auth) {
                  //                   return auth.$requireAuth().then(function () {
                  //                         return $firebaseArray(fbRef.getProductsRef()).$loaded();
                  //                   })
                  //             }
                  //       }
                  // })
                  .state('receipts', {
                        url: "/receipts", template: "<comp-receipts auth='$resolve.receipts'></comp-receipts>", resolve: {
                              auth: function (refService: IRefService) {
                                    return refService.getAuth().$requireAuth();
                              }
                        }
                  });
      });
}