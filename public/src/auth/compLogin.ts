/// <reference path="../_all.ts" />
module MyHomeApp {
    @Component(angular.module("todomvc"), 'compLogin', {
        controllerAs: 'ct',
        template: `
        <h1 ng-hide="ct.loggedIn">Please login or <md-button class="md-warn md-raised" ng-click="ct.register()">register</md-button></h1>
        <h1 ng-show="ct.loggedIn">You are already logged in</h1>

        <!--<md-button ng-click="ct.anonLogin()" ng-hide="ct.loggedIn">Anonymous</md-button>-->
        <md-button ng-click="ct.emailLogin()" ng-hide="ct.loggedIn">E-Mail/Password Login</md-button>
        <md-button ng-click="ct.fbLogin()" ng-hide="ct.loggedIn">Facebook</md-button>

        <br><br>
        <md-content layout-padding ng-hide="ct.loggedIn">
          <form name="email" ng-submit="ct.emailLogin()">
              <md-dialog-content>
                  <md-input-container class="md-block" flex-gt-sm>
                      <label for="email">E-Mail</label>
                      <input type="text" ng-model="ct.email" name="email">
                  </md-input-container>
              </md-dialog-content>
              <md-input-container class="md-block" flex-gt-sm>
                  <label for="password">Password</label>
                  <input type="password" ng-model="ct.password" name="password">
              </md-input-container>
              <md-dialog-actions layout="row">
                  <md-button type="submit" class="md-primary md-raised">Login</md-button>
              </md-dialog-actions>
          </form>
        </md-content>

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
        static $inject: Array<string> = ['$firebaseAuth', '$state', 'userService'];

        currentAuth: AngularFireAuth;
        loggedIn: boolean;
        errorMessage: string;
        email: string;
        password: string;

        constructor(private authService: AngularFireAuthService,
            private stateService: angular.ui.IStateService,
            private userService: IUserService) {
            this.loggedIn = !!this.currentAuth;
        }

        emailLogin() {
            var self = this;
            this.userService.loginEmailUser(this.email, this.password).then((user: User) => {
                self.stateService.go('home');
            }).catch((err) => {
                self.errorMessage = err;
            });
        }

        fbLogin() {
            var self = this;
            this.userService.loginFacebookUser().then((user: User)=>{
                self.stateService.go('home');
            }).catch((err)=>{
                self.errorMessage = err;
            })
        }

        register() {
            this.stateService.go('register');
        }
    }
}
