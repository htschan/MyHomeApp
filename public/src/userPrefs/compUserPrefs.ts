/// <reference path="../_all.ts" />
module MyHomeApp {
  @Component(angular.module("todomvc"), 'editUserPrefs', {
    controllerAs: 'ct',
    template: `
    <div layout="column" class="md-inline-form">
      <h1>User Preferences</h1>
      <md-content layout-padding>
          <form name="userPrefs" ng-submit="ct.save()">
              <md-dialog-content>
                  <md-input-container class="md-block" flex-gt-sm>
                      <label for="inpname">Name</label>
                      <input type="text" ng-model="ct.preference.name" name="inpname">
                  </md-input-container>
              </md-dialog-content>
              <md-input-container class="md-block" flex-gt-sm>
                  <label>Theme</label>
                  <md-select ng-model="ct.preference.theme">
                      <md-option ng-repeat="th in ct.themes" value="{{th}}">
                          {{th}}
                      </md-option>
                  </md-select>
              </md-input-container>
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
  class EditUserPrefs {
    static $inject: Array<string> = ['userService', '$state'];

    currentAuth: AngularFireAuth;
    themes: string[] = ["light", "dark"];
    preference: Preference;
    errorMessage: string;

    constructor(
      private userService: IUserService,
      private stateService: angular.ui.IStateService) {
    }

    $onInit() {
      this.userService.getPrefs().then((prefs) => {
        this.preference = prefs;
      }).catch((err) => {
        this.errorMessage = err;
      });
    }

    save(): void {
      this.userService.updatePrefs(this.preference);
      this.stateService.go('home');
    }

    cancel(): void {
      this.stateService.go('home');
    }
  }
}
