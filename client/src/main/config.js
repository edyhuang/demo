(function(global) {
    
  // map tells the System loader where to look for things
  var map = {
    'demo':                                 '/demo/demo', // 'dist',
    'common':                               '/demo/common',
    'util':                                 '/demo/util',
    'lib':                                  '/_/lib',
    'd3':                                   '/node_modules/d3',    
    'jquery':                               '/node_modules/jquery/dist',    
    'rxjs':                                 '/node_modules/rxjs',
    'stompjs':                              '/node_modules/stompjs/lib',
    'slick':                                '/node_modules/slickgrid-6pac',    
    'semantic':                             '/node_modules/semantic/dist',
        
    'angular2-in-memory-web-api':           '/node_modules/angular2-in-memory-web-api',
    '@angular':                             '/node_modules/@angular'
  };

  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'demo':                                 { main: 'demo.js',  defaultExtension: 'js' },
    'common':                               { defaultExtension: 'js' },
    'util':                                 { defaultExtension: 'js' },
    'lib':                                  { defaultExtension: 'js' },
    'stompjs':                              { defaultExtension: 'js' },
    'd3':                                   { main: 'd3.js' },
    'jquery':                               { defaultExtension: 'js' },
    'slick.custom':                         { defaultExtension: 'js' },
    'rxjs':                                 { defaultExtension: 'js' },
    'angular2-in-memory-web-api':           { defaultExtension: 'js' },
    'semantic':                             { defaultExtension: 'js' },
  };

  var packageNames = [
    '@angular/common',
    '@angular/compiler',
    '@angular/core',
    '@angular/http',
    '@angular/platform-browser',
    '@angular/platform-browser-dynamic',
    '@angular/router',
    '@angular/router-deprecated',
    '@angular/testing',
    '@angular/upgrade',
    'slick',
  ];

  // add package entries for angular packages in the form '@angular/common': { main: 'index.js', defaultExtension: 'js' }
  packageNames.forEach(function(pkgName) {
    packages[pkgName] = { main: 'index.js', defaultExtension: 'js' };
  });

  var config = {
    map: map,
    packages: packages
  }

  // filterSystemConfig - index.html's chance to modify config before we register it.
  if (global.filterSystemConfig) { global.filterSystemConfig(config); }

  System.config(config);

})(this);