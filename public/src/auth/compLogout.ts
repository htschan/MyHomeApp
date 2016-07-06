/// <reference path="../_all.ts" />
module MyHomeApp {
    @Component(angular.module("todomvc"), 'compLogout', {
        controllerAs: 'ct',
    })
    class LogoutComponent {
        static $inject: Array<string> = ['$firebaseAuth', '$state', 'constService'];

        auth: AngularFireAuth;

        constructor(private authService: AngularFireAuthService,
            private stateService: angular.ui.IStateService,
            private constService: IConstService) {
            this.auth = authService(constService.getRootRef());
        }

        $onInit(){
            this.auth.$unauth();
            this.stateService.go('login');
        }
    }
}
