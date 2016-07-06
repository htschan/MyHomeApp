/// <reference path="_all.ts" />
module MyHomeApp {
    @Component(angular.module("todomvc"), 'compHome', {
        controllerAs: 'ct',
        template: "<h1> I'm the home component</h1>",
        bindings: {
            currentAuth: '='
        }
    })
    class HomeComponent {

        currentAuth: AngularFireAuth;
        
        static $inject: Array<string> = [];

        /**
         *
         */
        constructor() {
            console.log("ctor HomeComponent." + this.currentAuth)
        }

    }
}
