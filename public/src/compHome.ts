/// <reference path="_all.ts" />
module MyHomeApp {
    @Component(angular.module("todomvc"), 'compHome', {
        controllerAs: 'ct',
        template: `
        <h1> Hello  {{ct.loginName}}</h1>        
        <div><img ng-src="{{ct.avatarUrl}}" alt="Profile Image" /></div>
        `,
        bindings: {
            currentAuth: '='
        }
    })
    class HomeComponent {
        static $inject: Array<string> = [];

        currentAuth: AngularFireAuth;
        loginName: string;
        avatarUrl: string;

        constructor() {
        }

        $onInit() {
            let auth: FirebaseAuthData = this.currentAuth.$getAuth();
            this.loginName = auth.provider;
            if (angular.isDefined(auth.password)) {
                let password: FirebaseAuthDataPassword = auth.password;
                this.loginName +=  ': ' + password.email;
                this.avatarUrl = password.profileImageURL;
            }
            if (angular.isDefined(auth.facebook)) {
                let facebook: FirebaseAuthDataFacebook = auth.facebook;
                this.loginName += ': ' + facebook.displayName;
                this.avatarUrl = facebook.profileImageURL;
            }
        }
    }
}
