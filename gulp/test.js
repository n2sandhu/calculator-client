'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var http = require('http');
var baseUrl = "http://0.0.0.0:3000/api";

gulp.task('partials', function () {

});

gulp.task('calculator-tests', ['add', 'subtract', 'divide', 'multiply'], function () {

});

// Only applies for fonts from bower dependencies
// Custom fonts are handled by the "other" task
gulp.task('test-add', function () {
 
 console.log("RUNNING ADDITION TEST");
 console.log("Should return sum equal to 16 with value1 = 6 and value2 = 10");

 http.get("http://0.0.0.0:3000/api/calculators/add?value1=6&value2=10",function successCallback(response) {
       var body='';
        response.on('data', function(d) {
            body += d;
        });

        response.on('end', function() {
            var parsed = JSON.parse(body);
            console.log("RESULT = "+ parsed);
            if(parsed == 16){
              console.log('TEST PASSED');
              return;
            }
        });
    });
});

gulp.task('test-subtract', function () {
   console.log("RUNNING SUBTRACTION TEST");
   console.log("Should return difference equal to 6 with value1 = 10 and value2 = 4");

   http.get("http://0.0.0.0:3000/api/calculators/subtract?value1=10&value2=4",function successCallback(response) {
     var body='';
      response.on('data', function(d) {
          body += d;
      });

      response.on('end', function() {
          var parsed = JSON.parse(body);
          console.log("RESULT = "+ parsed);
          if(parsed == 6){
            console.log('TEST PASSED');
            return;
          }
      });
  });
});

gulp.task('test-multiply', function () {
  console.log("RUNNING MUTLIPLICATION TEST");
   console.log("Should return multiplication equal to 40 with value1 = 10 and value2 = 4");

   http.get("http://0.0.0.0:3000/api/calculators/multiply?value1=10&value2=4",function successCallback(response) {
     var body='';
      response.on('data', function(d) {
          body += d;
      });

      response.on('end', function() {
          var parsed = JSON.parse(body);
          console.log("RESULT = "+ parsed);
          if(parsed == 40){
            console.log('TEST PASSED');
            return;
          }
      });
  });
});

gulp.task('test-divide', function () {
  console.log("RUNNING DIVISION TEST");
   console.log("Should return result equal to 2.5 with value1 = 10 and value2 = 4");

   http.get("http://0.0.0.0:3000/api/calculators/divide?value1=10&value2=4",function successCallback(response) {
     var body='';
      response.on('data', function(d) {
          body += d;
      });

      response.on('end', function() {
          var parsed = JSON.parse(body);
          console.log("RESULT = "+ parsed);
          if(parsed == 2.5){
            console.log('TEST PASSED');
            return;
          }
      });
  });
});

gulp.task('clean', function () {
  return $.del([path.join(conf.paths.dist, '/'), path.join(conf.paths.tmp, '/')]);
});

gulp.task('build', ['html', 'fonts', 'other']);
