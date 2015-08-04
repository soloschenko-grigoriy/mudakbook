'use strict';

var moduleName = process.argv[2],
    fs         = require('fs');

if(!moduleName){

  console.error('Module name should be specified');
  return;
}
console.log('Creating model');
fs.readFile('./server/models/_EXAMPLE', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  var result = data.replace(/%_MODEL_NAME_%/g, moduleName);

  fs.writeFile('./server/models/'+moduleName+'.js', result, 'utf8', function (err) {
    if (err) return console.log(err);
  });
});

console.log('Creating route');
fs.readFile('./server/routes/_EXAMPLE', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  var result = data.replace(/%_MODEL_NAME_%/g, moduleName);

  fs.writeFile('./server/routes/'+moduleName+'.js', result, 'utf8', function (err) {
    if (err) return console.log(err);
  });
});

console.log('Module "'+moduleName + '" successfully created');