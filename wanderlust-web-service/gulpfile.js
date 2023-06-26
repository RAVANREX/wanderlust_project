let gulp=require("gulp");
let eslint=require('gulp-eslint');
let mocha = require('gulp-mocha');
let shell=require('gulp-shell');
let fs=require('fs');


gulp.task('lint',()=>{
    return gulp.src(['./src/app.js','./src/model/booking.js','./src/model/cancel.js','./src/model/hotdeals.js','./src/model/register.js','./src/model/search.js','./src/model/setupUser.js','./src/model/userslogin.js','./src/model/viewBooking.js','./src/routes/userRouter.js','./src/service/userslogin.js','./src/service/booking.js','./src/service/cancel.js','./src/service/hotdeals.js','./src/service/register.js','./src/service/search.js','./src/service/viewBooking.js','./src/utilities/connections.js','!node_modules/**']) //fetch the files
    .pipe(eslint()) // point the next thing we want to do, chaining the command
    .pipe(eslint.format()) //to display in terminal
    .pipe(eslint.format('html', fs.createWriteStream('lintReports/lint_report.html')))
    .pipe(eslint.format('checkstyle', fs.createWriteStream('lintReports/checkstyle.xml')))
    .pipe(eslint.failAfterError())
})

gulp.task('test', () => {
    return gulp.src(['test/*.js'])// fetching all test case files
      .pipe(mocha(
        {
          reporter: 'mocha-junit-reporter', //npm package
          reporterOptions: {
            mochaFile: './testReport/JUnit/file.xml',
            jenkinsMode:true
          }
        }
      )) //running mocha
      .on('error', console.error)
  });


  gulp.task('coverage', shell.task([
    'nyc --reporter=lcov --reporter=text mocha'
  ]));
 