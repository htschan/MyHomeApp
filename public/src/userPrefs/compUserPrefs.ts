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
                      <input type="text" ng-model="ct.userPreferences.name" name="inpname">
                  </md-input-container>
              </md-dialog-content>
              <md-input-container class="md-block" flex-gt-sm>
                  <label>Theme</label>
                  <md-select ng-model="ct.userPreferences.theme">
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
    </div>
    `,
    bindings: {
      currentAuth: '='
    }
  })
  class EditUserPrefs {
    static $inject: Array<string> = ['$firebaseObject', 'refService', '$state'];

    currentAuth: AngularFireAuth;
    themes: string[] = ["light", "dark"];

    constructor(private $firebaseObjectService: AngularFireObjectService,
      private refService: IRefService,
      private stateService: angular.ui.IStateService) {
    }

    save(): void {
      // this.userPreferences.$save();
      this.stateService.go('home');
    }

    cancel(): void {
      this.stateService.go('home');
    }
  }
}
