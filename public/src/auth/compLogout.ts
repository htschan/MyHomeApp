/// <reference path="../_all.ts" />
module MyHomeApp {
    @Component(angular.module("todomvc"), 'compLogout', {
        controllerAs: 'ct',
    })
    class LogoutComponent {
        static $inject: Array<string> = ['$firebaseAuth', '$state', 'refService'];

        auth: AngularFireAuth;

        constructor(private authService: AngularFireAuthService,
            private stateService: angular.ui.IStateService,
            private refService: IRefService) {
            this.auth = authService(refService.getRootRef());
        }

        $onInit(){
            this.auth.$unauth();
            this.stateService.go('login');
        }
    }
}
