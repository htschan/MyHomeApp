/// <reference path="../_all.ts" />
module MyHomeApp {
    @Component(angular.module("todomvc"), 'compLogin', {
        controllerAs: 'ct',
        template: `
        <h1 ng-hide="ct.loggedIn">Please login</h1>
        <h1 ng-show="ct.loggedIn">You are already logged in</h1>

        <md-button ng-click="ct.anonLogin()" ng-hide="ct.loggedIn">Anonymous</md-button>
        <md-button ng-click="ct.fbLogin()" ng-hide="ct.loggedIn">Facebook</md-button>

        <br><br>
        <md-toolbar class='md-warn' ng-show="!!ct.errorMessage">
            <div>{{ct.errorMessage}}</div>
        </md-toolbar>
        `,
        bindings: {
            currentAuth: '='
        }
    })
    class LoginComponent {
        static $inject: Array<string> = ['$firebaseAuth', '$state', 'constService'];

        currentAuth: AngularFireAuth;
        auth: AngularFireAuth;
        loggedIn: boolean;
        errorMessage: string;

        constructor(private authService: AngularFireAuthService,
            private stateService: angular.ui.IStateService,
            private constService: IConstService) {
            this.loggedIn = !!this.currentAuth;
            this.auth = authService(constService.getRootRef());
        }

        anonLogin() {
            var self = this;
            this.auth.$authAnonymously().then(() => {
                self.stateService.go('home');
            }).catch(((err) => {
                self.errorMessage = err.code || err.message;
            }).bind(this))
        }

        fbLogin() {
            var self = this;
            this.auth.$authWithOAuthRedirect("facebook").then(() => {
                self.stateService.go('home');
            }).catch(((err) => {
                self.errorMessage = err.code || err.message;
            }).bind(this))
        }
    }
}
