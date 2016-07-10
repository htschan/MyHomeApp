/// <reference path="../_all.ts" />
module MyHomeApp {
    @Component(angular.module("todomvc"), 'compRegister', {
        controllerAs: 'ct',
        template: `
        <md-content layout-padding ng-hide="ct.loggedIn">
          <form name="email" ng-submit="ct.register()">
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
              <md-input-container class="md-block" flex-gt-sm>
                  <label for="verifypassword">Verify Password</label>
                  <input type="password" ng-model="ct.password" name="verifypassword">
              </md-input-container>
              <md-dialog-actions layout="row">
                  <md-button type="submit" class="md-primary md-raised">Register</md-button>
              </md-dialog-actions>
          </form>
        </md-content>

        <br><br>
        <md-toolbar class='md-warn' ng-show="!!ct.errorMessage">
            <div>{{ct.errorMessage}}</div>
        </md-toolbar>
        `
    })
    class LoginRegister {
        static $inject: Array<string> = ['$state', 'userService'];

        loggedIn: boolean;
        errorMessage: string;
        email: string;
        password: string;

        constructor(
            private stateService: angular.ui.IStateService,
            private userService: IUserService) {
        }

        register() {
            let self = this;
            this.userService.registerEmailUser(this.email, this.password).then((result) => {
                self.stateService.go('home');
            }).catch(function (err) {
                self.errorMessage = err.code || err.message;
            });
        }
    }
}
