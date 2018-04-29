const fs = require('fs'),
    gulp  = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    gulpRemoveHtml = require('gulp-remove-html'),
    rename = require("gulp-rename"),
    inject = require('gulp-inject-string'),
    javascriptObfuscator = require('gulp-javascript-obfuscator'),
    templateCache = require('gulp-angular-templatecache'),
    colors = require('colors');

//Now requiring custom modules
const dataProcessor = require('./tools/node-tools/data-processor/process');

function sep () {
    console.log("\n*********************************************\n".blue);
}
/*
* Encrypt all data files from devData and put them in data folder
*/
gulp.task('devDataToDataProcess', function () {
    dataProcessor.start();
});

gulp.task('checkPropertiesFiles', function() {
    
    var data = fs.readFileSync('www/scripts/properties.js', "utf8");

    var startIdentifier = "/*STARTPOINT*/";
    var startIndex = data.indexOf(startIdentifier) + startIdentifier.length;

    var endIdentifier = "/*ENDPOINT*/";
    var endIndex = data.indexOf(endIdentifier);
    var size = endIndex - startIndex;

    var propString = data.substr(startIndex, size).trim();

    //console.log(propString);
    var propJSON = JSON.parse(propString);

    //Throw Exceptions if Check result is not Satisfactory
    if(propJSON.dataRoot === "devData") {
        sep();
        throw " Properties file dataRoot should be 'data'. NOT 'devData'\n\n".red;

    }

    //propJSON.dataRoot = "data";

    //propString = data.substr(0, startIndex) + JSON.stringify(propJSON) + data.substr(endIndex);

    //fs.writeFileSync('www/scripts/properties.js', propString, "utf8");
});

//Process script files
gulp.task('concatScripts', function() {
  return gulp.src([
        'www/scripts/app.js',
        'www/modules/common/*Service.js',
        'www/modules/common/*Controller.js',
        'www/modules/**/*Service.js',
        'www/modules/**/*Controller.js',
        'www/scripts/router.js'
    ])
    .pipe(concat('knexaa.js'))
    .pipe(uglify())
    .pipe(javascriptObfuscator())
    .pipe(gulp.dest('www/dist/js/'));
});


//Create template.js
gulp.task('createTemplateCache', function () {
  return gulp.src(['www/**/*.html'])
    .pipe(templateCache({
        "module": "skillseval"
    }))
    .pipe(gulp.dest('www/dist/js/'));
});


//Delete development scripts from index.html
gulp.task('removeDevScripts', function () {
    var minJS = `
        <script type="text/javascript" src="dist/js/knexaa.js"></script>
        <script type="text/javascript" src="dist/js/templates.js"></script>

        <script type="text/javascript" src="js/knexaa.js"></script>
        <script type="text/javascript" src="js/templates.js"></script>
    `;

    return gulp.src('www/index.html')
    .pipe(gulpRemoveHtml())
    .pipe(inject.after('<!--MinJSGulp-->', minJS))
    //.pipe(rename('index.html'))
    .pipe(gulp.dest('www/dist/'));

});


// Copy all static assets
gulp.task('copyAssets', function() {
    gulp.src('www/configs/**')
    .pipe(gulp.dest('www/dist/configs'));

    gulp.src('www/css/**')
    .pipe(gulp.dest('www/dist/css'));

    gulp.src('www/favicon/**')
    .pipe(gulp.dest('www/dist/favicon'));

    gulp.src('www/fonts/**')
    .pipe(gulp.dest('www/dist/fonts'));

    gulp.src('www/images/**')
    .pipe(gulp.dest('www/dist/images'));

    gulp.src('www/lib/**')
    .pipe(gulp.dest('www/dist/lib'));

    gulp.src('www/data/**')
    .pipe(gulp.dest('www/dist/data'));

    gulp.src(['www/scripts/**', '!www/scripts/app.js', '!www/scripts/router.js'])
    .pipe(gulp.dest('www/dist/scripts'));

    // gulp.src('www/index.html')
    // .pipe(gulp.dest('www/dist'));
});


// This processes data 
// and then builds the code
gulp.task('all', ['checkPropertiesFiles', 'devDataToDataProcess', 'concatScripts', 'createTemplateCache', 'removeDevScripts','copyAssets'], function () {
    console.log('"gulp all" builds code+data, if you only needs to build the code, type "gulp code"');
});

//This only build the code
//NOT Data
//Because most of the time we only need the code to be updated, while data remains same
gulp.task('code', ['checkPropertiesFiles', 'concatScripts', 'createTemplateCache', 'removeDevScripts','copyAssets'], function () {
    console.log('"gulp code" only builds the code, not the data, if you need to build code+data, type "gulp all"');
});

//same as "gulp code"
gulp.task('default', ['code'], function () {
    console.log('gulp (default) only builds the code, i.e. same as "gulp code", not the data, if you need to build code+data, type "gulp all"');
});

