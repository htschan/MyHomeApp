/// <reference path="../_all.ts" />
module MyHomeApp {
    @Component(angular.module("todomvc"), 'compUserProfile', {
        controllerAs: 'ct',
        template: `
    <div layout="column" class="md-inline-form">
      <h1>User Profile</h1>
      <md-content layout-padding>
          <form name="userPrefs" ng-submit="ct.save()">
            <div layout-gt-xs="row">
              <md-dialog-content>
                  <md-input-container class="md-block" flex-gt-sm>
                      <label for="inpname"></label>
                      <ng-md-icon icon="person" style="fill: green" size='28'></ng-md-icon>
                      <input type="text" ng-model="ct.user.name" placeholder="Name" name="inpname">
                  </md-input-container>
              </md-dialog-content>
            </div>
            <div layout-gt-xs="row">
              <md-dialog-content>
                  <md-input-container class="md-block" flex-gt-sm>
                      <label for="inpfirstname"></label>
                      <ng-md-icon icon="person" style="fill: green" size='28'></ng-md-icon>
                      <input type="text" ng-model="ct.user.firstName" placeholder="First Name" name="inpfirstname">
                  </md-input-container>
              </md-dialog-content>
            </div>
            <div layout-gt-xs="row">
              <md-dialog-content>
                  <md-input-container class="md-block" flex-gt-sm>
                      <label for="inpemail"></label>
                      <ng-md-icon icon="email" style="fill: green" size='28'></ng-md-icon>
                      <input type="email" ng-model="ct.user.email" placeholder="Email" name="inpemail">
                  </md-input-container>
              </md-dialog-content>
            </div>
              <md-dialog-actions layout="row">
                  <md-button ng-click="ct.cancel()">Cancel</md-button>
                  <md-button type="submit" class="md-primary md-raised">Save</md-button>
              </md-dialog-actions>
          </form>
      </md-content>

      <br><br>
      <md-toolbar class='md-warn' ng-show="!!ct.errorMessage">
         <div>{{ct.errorMessage}}</div>
      </md-toolbar>
    </div>
    `,
        bindings: {
            currentAuth: '='
        }
    })
    class CompUserProfile {
        static $inject: Array<string> = ['$state', 'userService'];

        user: User;
        errorMessage: string;

        constructor(
            private stateService: angular.ui.IStateService,
            private userService: IUserService) {
        }

        $onInit() {
            this.userService.getUser().then((user) => {
                this.user = user;
            }).catch((err) => {
                this.errorMessage = err;
            });
        }
        save(): void {
            this.userService.updateUser(this.user);
        }

        cancel(): void {
            this.stateService.go('home');
        }
    }
}
