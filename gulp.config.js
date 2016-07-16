module.exports = function () {
    var buildBase = './'; // Destination Folder
    var bowerBase = buildBase + 'bower_components/';
    var scriptsDestDir = 'public/script/';
    var cssDestDir = 'public/css/';
    var fontDestDir = 'public/fonts/';

    var config = {
        baseDir: buildBase,
        scriptsDest: buildBase + scriptsDestDir,
        cssDest: buildBase + cssDestDir,
        fontsDest: buildBase + fontDestDir,
        bowerBase:  bowerBase,
        bowerFiles: [
            bowerBase + 'angular/angular.js',
            bowerBase + 'angular-animate/angular-animate.js',
            bowerBase + 'angular-aria/angular-aria.js',
            bowerBase + 'angular-material/angular-material.js',
            bowerBase + 'angular-material-icons/angular-material-icons.js',
            bowerBase + 'angular-route/angular-route.js',
            bowerBase + 'angular-ui-router/angular-ui-router.js',
            bowerBase + 'es6-promise/es6-promise.js',
            bowerBase + 'angular/angular.js',
        ],
        bowerCssFiles: [
            bowerBase + 'angular-material/angular-material.css',
            bowerBase + 'angular-material-icons/angular-material-icons.css',
            bowerBase + 'mdi/css/materialdesignicons.css',
            bowerBase + 'mdi/css/materialdesignicons.css.map',
        ],
        bowerFontFiles: [
            bowerBase + 'mdi/fonts/materialdesignicons-webfont.eot',
            bowerBase + 'mdi/fonts/materialdesignicons-webfont.svg',
            bowerBase + 'mdi/fonts/materialdesignicons-webfont.ttf',
            bowerBase + 'mdi/fonts/materialdesignicons-webfont.woff',
            bowerBase + 'mdi/fonts/materialdesignicons-webfont.woff2',
        ],

    };

    return config;
};