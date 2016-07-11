/// <reference path="../_all.ts" />
@Component(angular.module("todomvc"), 'compHeader', {
    controllerAs: 'ct',
    template: `
    <md-toolbar>
        <div class="md-toolbar-tools">
            <md-button hide-gt-sm ng-click="ct.toggleSideNav()" class="md-icon-button">
                <md-icon md-svg-icon="menu"></md-icon>
            </md-button>
            <h1>My Home</h1>
        </div>
    </md-toolbar>
    `
})
class HeaderComponent {
    static $inject: Array<string> = ['$mdSidenav'];

    constructor(
        private $mdSidenav: angular.material.ISidenavService) {
    }

    toggleSideNav() {
        this.$mdSidenav('left').toggle();
        console.log("toggle SideNav")
    }
}
