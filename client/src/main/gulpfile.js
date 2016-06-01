var clean = require('gulp-clean'),
    gulp = require('gulp'),
    merge = require('merge-stream'),
    tsc = require('gulp-typescript');

gulp.task('clean', function(done)
{
    return gulp.src('demo/**/*.js')
        .pipe(clean({force:true}), done);
})
.task('clean:tests', function(done)
{
    return gulp.src('tests/**/*.js')
        .pipe(clean({force:true}), done);
});

var _compile = function(done){
    var tscResult = gulp.src(['demo/**/*.ts', 'typings/**/*.ts'])
        .pipe(tsc({
            module : 'commonjs',
            target : 'es5',
            emitDecoratorMetadata : true,
            experimentalDecorators : true,
            sourceMap : false,
            noImplicitAny : false,
            noLib : true,
        }));
    return tscResult.js.pipe(gulp.dest('demo'), done);
};

gulp.task('compile', ['clean'], function(done)
{
    return _compile(done);
})
.task('Compile', function(done)
{
    return _compile(done);
});

var _compileTest = function(done){
    var tscResult = gulp.src(['../tests/unit/**/*.ts'])
        .pipe(tsc({
            module : 'commonjs',
            target : 'es5',
            emitDecoratorMetadata : true,
            experimentalDecorators : true,
            sourceMap : false,
            noImplicitAny : false,
            noLib : true        
        }));
    return tscResult.js.pipe(gulp.dest('../tests'), done);
};

gulp.task('compile:tests', ['clean:tests'], function(done)
{
    return _compileTest(done);
})
.task('Compile:tests', function(done)
{
    return _compileTest(done);
});

var _gather = function(done){
   var t1 = gulp.src(['demo/**/*.html'])
        .pipe(htmlmin({
            collapseWhitespace : true,
            removeComments : true,
            removeOptionalTags : true,
            minifyCSS : true
        }))
        .pipe(gulp.dest('transpiled/demo/')); 
   var t2 = gulp.src(['index.html'])
        .pipe(htmlmin({
            collapseWhitespace : true,
            removeComments : true,
            removeOptionalTags : true,
            minifyCSS : true
        }))
        .pipe(gulp.dest('transpiled/')); 
   var t3 = gulp.src(['resources/**/*'])
        .pipe(gulp.dest('transpiled/resources/')); 
   var t4 = gulp.src(['node_modules/**/*'])
        .pipe(gulp.dest('transpiled/node_modules/')); 
   var t5 = gulp.src(['config.js'])
        .pipe(gulp.dest('transpiled/')); 
   return merge(t1, t2, t3, t4, t5);
};

gulp.task('gather', ['compile'], function(done)
{
    return _gather(done);
})
.task('Gather', function(done)
{
    return _gather(done);
});

var _bundle = function(done){
    var t1 = jspm({
        bundleOptions:{
            sourceMaps : false,
            minify : false,
            mangle : false
        },
        bundles : [{ src : 'transpiled/custom_modules/demo/demo.component', dst : 'demo.js'}],        
        bundleSfx : true
    })
    .pipe(gulp.dest('transpiled/'));
    return merge(t1);
};

gulp.task('bundle', ['gather'], function(done)
{
    return _bundle(done);
})
.task('Bundle', function(done)
{
    return _bundle(done);
});

var _link = function(done){
   var t1 = gulp.src(['resources/lib/jquery-1.7.min.js','resources/lib/jquery-ui-1.8.16.custom.min.js','resources/lib/jquery.event.drag-2.2.js','resources/lib/slick.core.6pac-2.2.6.js','resources/lib/slick.dataview.6pac-2.2.6.js','resources/lib/slick.grid.6pac-2.2.6.js','transpiled/demo.js'])
    .pipe(concat('demo.js'))
    .pipe(gulp.dest('transpiled/'));
    var t2 = gulp.src(['node_modules/jspm/github/Semantic-Org/Semantic-UI@2.1.8/semantic.min.css','node_modules/jspm/npm/slickgrid-6pac@2.2.9/slick.grid.css','resources/css/jquery-ui-1.8.16.custom.css','resources/css/custom.grid.css','resources/css/common.css','transpiled/resources/demo.css'])
    .pipe(concat('demo.css'))
    .pipe(gulp.dest('transpiled/resources/css/'));
    return merge(t1, t2);
};

gulp.task('link', ['bundle'], function(done)
{
    return _link(done);
})
.task('Link', function(done)
{
    return _link(done);
});

var _compress = function(done){
    var t1 = gulp.src('transpiled/demo.js')
    .pipe(minify({mangle:true}))
    .pipe(gulp.dest('transpiled/'));
    var t2 = gulp.src('transpiled/resources/css/demo.css')
        .pipe(cssmin())
        .pipe(rename('demo.css'))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
        .pipe(gulp.dest('transpiled/resources/css/'));   
    return merge(t1, t2);    
};

gulp.task('compress', ['link'], function(done)
{
    return _compress(done);
})
.task('Compress', function(done)
{
    return _compress(done);
});

var _dist = function(done){
    var t1 = gulp.src(['transpiled/index.html'])
        .pipe(gulp.dest('./../../../server/src/main/resources/public/'));  
    var t2 = gulp.src(['transpiled/custom_modules/demo/demo.html'])
        .pipe(gulp.dest('./../../../server/src/main/resources/public/demo/'));  
    var t3 = gulp.src(['transpiled/demo.js'])
        .pipe(gulp.dest('./../../../server/src/main/resources/public/demo/'));  
    var t4 = gulp.src(['transpiled/resources/**/*'])
        .pipe(gulp.dest('./../../../server/src/main/resources/public/_/'));  
    var t5 = gulp.src(['node_modules/jspm/github/Semantic-Org/Semantic-UI@2.1.8/semantic.min.js'])
        .pipe(gulp.dest('./../../../server/src/main/resources/public/_/'));  
    var t6 = gulp.src(['node_modules/jspm/github/Semantic-Org/Semantic-UI@2.1.8/semantic.min.css'])
        .pipe(gulp.dest('./../../../server/src/main/resources/public/_/css/'));  
    return merge(t1, t2, t3, t4, t5, t6);
};

gulp.task('dist', ['compress'], function(done)
{
    return _dist(done);    
})
.task('Dist', function(done)
{
    return _dist(done);    
});

var _distRaw = function(done){
    var t1 = gulp.src(['demo/**/*'])
        .pipe(gulp.dest('./../../../server/src/main/resources/public/demo/'));  
    var t2 = gulp.src(['_/**/*'])
        .pipe(gulp.dest('./../../../server/src/main/resources/public/_/'));  
    var t3 = gulp.src(['node_modules/**/*'])
        .pipe(gulp.dest('./../../../server/src/main/resources/public/node_modules'));  
    var t4 = gulp.src(['config.js'])
        .pipe(gulp.dest('./../../../server/src/main/resources/public/'));  
    var t5 = gulp.src(['index.html'])
        .pipe(gulp.dest('./../../../server/src/main/resources/public/'));  
    return merge(t1, t2, t3, t4, t5);
};

gulp.task('dist:raw', ['compile'], function(done)
{
    return _distRaw(done);    
})
.task('Dist:raw', function(done)
{
    return _distRaw(done);    
})

//******************************* INFRASTRUCTURE RELATED *****************************
gulp
.task('server', function(done)
{
    browserSync({
        server : {
            baseDir : 'transpiled/'
        }
    })  
})
.task('karma', ['tsc:tests'], function(done)
{
    karma.start(
    {
        configFile : __dirname + "/karma.conf.js",
        singleRun : true        
    }, done);
})
.task('karma:watch', ['tsc:tests'], function(done)
{
    karma.start(
    {
        configFile : __dirname + "/karma.conf.js",        
        singleRun : false
    }, done);
});