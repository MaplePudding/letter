var express = require('express');
var router = require('./router.js');
var bodyParser = require('body-parser');
var app = express();

/**
 * Parse post request
 */

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

app.use(router); 
app.listen('3000', function(){
    console.log('listen successfun');
})
