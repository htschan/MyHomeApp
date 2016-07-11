/// <reference path="../_all.ts" />
@Component(angular.module("todomvc"), 'compNav', {
    controllerAs: 'ct',
    template: `
    <md-sidenav class="md-sidenav-left md-whiteframe-z2" md-component-id="left" md-is-locked-open="$mdMedia('gt-sm')">
        <md-toolbar class="md-toolbar-tools">
            <md-button hide-gt-sm ng-click="ct.toggleSideNav()" class="md-icon-button">
                <md-icon md-svg-icon="menu"></md-icon>
            </md-button>
        </md-toolbar>
        <md-content layout="column">
            <md-button layout-align="left" ng-click="ct.go('home')" md-ink-ripple="#bbb">Home</md-button>
            <md-button layout-align="left" ng-click="ct.go('shoppinglist')"md-ink-ripple="#bbb">Einkaufsliste</md-button>
            <md-button layout-align="left" ng-click="ct.go('receipts')"md-ink-ripple="#bbb">Rezepte</md-button>
            <md-button layout-align="left" ng-click="ct.go('favorites')"md-ink-ripple="#bbb">Favoriten</md-button>
            <md-button layout-align="left" ng-click="ct.go('products')"md-ink-ripple="#bbb">Alle Produkte</md-button>
            <md-button layout-align="left" ng-click="ct.go('todos')"md-ink-ripple="#bbb">To Do's</md-button>
            <md-button layout-align="left" ng-click="ct.go('userprefs')">Preferences</md-button>
            <md-button layout-align="left" ng-click="ct.go('userprofile')">Profile</md-button>
            <md-button layout-align="left" ng-click="ct.go('logout')">Logout</md-button>
        </md-content>
    </md-sidenav>
    `
})
class NavComponent {
    static $inject: Array<string> = ['$mdSidenav', '$state'];

    constructor(
        private $mdSidenav: angular.material.ISidenavService,
        private stateService: angular.ui.IStateService) {
    }

    toggleSideNav() {
        this.$mdSidenav('left').toggle();
        console.log("toggle SideNav")
    }

    go(newLocation): void {
        this.stateService.go(newLocation);
    }
}
