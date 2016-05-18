"use strict";

const express = require('express');
const app = express();
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const MonkeyLearn = require('monkeylearn');
 
var ml = new MonkeyLearn('d8c3a3020c67ec7ecdd07d41440262e054a73642');
var module_id = 'cl_iSNkahnf';

app.set('port', (process.env.PORT || 5000));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);

app.use(express.static(__dirname + '/public'));

app.get('/', (request, response) => {
  response.render ('index', { title: "SpamCatcher - Mail classifier using NLP"} );
});

app.get('/classify', (request, response) => {
	var text_list = [request.query.data];
	var p = ml.classifiers.classify(module_id, text_list, true);
	p.then(function (res) {
		//console.log(res.result);
		response.send ({ "result": res.result});
	});
});

app.listen(app.get('port'), () => {
    console.log(`Node app is running at localhost: ${app.get('port')}` );
});
