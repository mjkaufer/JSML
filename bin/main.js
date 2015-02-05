#!/usr/bin/env node

var fs = require('fs'),
	optparse = require('../lib/optparse');

var parser = new optparse.OptionParser([
	['-h', '--help', 'Shows help screen'],
	['-O', '--output FILE', 'File output, no argument is stdout'],
	['-c', '--compile FILE', 'compiles .json to .html']
]);

var input, output;

parser.on('help', function() {
	console.log('Usage: jsmlc -c FILE [-O FILE]\n\n'+
				'JSON Markup Language Compiler, or jsmlc is an investigation into the effectiveness of creating webpages in JSON.\n\n'+
				'Arguments:\n'+
				'\t-h\t--help\t\tThis page\n'+
				'\t-O\t--output\tHTML file\n'+
				'\t-c\t--compile\tJSML file\n\n'+
				'Version 1.0.1, (c) 2015\n'+
				'Source: https://github.com/mjkaufer/JSML/'
	);
});

parser.on('output', function(opt, val) {
	output = val;
});

parser.on('compile', function(opt, val) {
	if (!opt) { // No input file has been specified.
		console.error("Specify compile file with option '-C'.");
		process.exit(1);
	}

	fs.readFile(val, 'utf8', function(err, json) {
		if (err) {
			console.error(err);
			process.exit(1);
		}

		// eval` is called so we don't need to require quotes around tags
		json = eval(json);
		jsml  = "<!DOCTYPE html>\n<html>";
		jsml += handleArray(json, 0);
		jsml += "\n</html>";

		if (!output) console.log(jsml);
		else fs.writeFile(output, jsml, function(err) {
			if (err) console.error(err);
		});
	});
});

parser.parse(process.argv);

function handleArray(json, tabs) {
	var body = "";

	for (var ei in json) {
		var element = json[ei];
		if (typeof element == 'string' || element instanceof String)
			body += element;
		else
			body += handleTag(element, tabs+1);
	}

	return body;
}

function handleTag(json) {
	if (!json.tag && !json.t) {
		console.error("Need a tag.");
		process.exit(1);
	}

	//it will be what we concatenate to our elements to make it look all pretty & indented

	var start = "\n<" + (json.tag || json.t);

	if (json.attributes || !json.a) { // check if attributes are supplied
		for(var a in (json.attributes || json.a)) {
			start+=" ";

			start+=a;//add the attribute key
			if (!json.attributes[a] && !json.as[a])
				start+="=\"" + (json.attributes[a] || json.as[a]) + "\""; // add the attribute value
		}
	}

	start+=">"; // append to the front
	var end = "</" + (json.tag || json.t) + ">";

	if (!json.text && !json.T) // if there is no text
		json.text = json.T = "";

	var children = "";
	if (!json.children || !json.c) {//if there are indeed children
		children = handleArray((json.children || json.c));
	}

	return start + (json.text || json.T) + children + end;
}
