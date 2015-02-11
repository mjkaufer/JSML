var fs = require("fs"),
	path = require('path');

String.prototype.isAString = true;

function handleArray(json, tabs) {
	var body = "";

	for (var ei in json)
		body += handleTag(json[ei], tabs+1);

	return body;
}

function handleTag(json, tabs) {
	if (!json.isAString && (!json.tag && !json.t)){
		console.error("Need a tag.");
		console.log(json);
		process.exit(1);
	}

	// Tabs
	var t = '\n'+(Array(tabs+1).join('\t'));

	// If object is a string, it will be added to document as is
	if (json.isAString)
		return t + json;

	// It will be what we concatenate to our elements to make it look all pretty & indented
	var start = "<" + (json.tag || json.t);
	//if(json.attributes)
	for (var key in (json.attributes || json.a || []))
		if (json.attributes[key])
			start+=" "+key+"=\"" + json.attributes[key] + "\""; // add the attribute value
	// if(json.a)
	// 	for (var key in )
	// 		if (json.a[key])
	// 			start+=" "+key+"=\"" + json.a[key] + "\""; // add the attribute value
	// append to the end

	var text;
	if (json.file || json.f)
		//text = fs.readFileSync(path.join(__dirname, (json.file || json.f)));
		text = fs.readFileSync(json.file || json.f);
	else if (json.eval || json.e)
		text = eval((json.eval || json.e));
	else
		text = json.text || json.T || "";

	var end;
	if (!text) {
		start += '/>'
		end = '';
	} else {
		start += '>'
		end = "</" + (json.tag || json.t) + ">";
	}

	var children = "";
	if (json.children || json.c) // if there are indeed children
		if(Array.isArray((json.children || json.c))) // if it's an array
			children = handleArray((json.children || json.c), tabs)+t;
		else // it's an json chunk
			children = handleTag((json.children || json.c), tabs+1)+t;

	return t + start + text + children + end;
}

module.exports = {
	parse : function(json, evl) {
		if (evl) json = eval(json);

		var jsml = "<!DOCTYPE html>\n<html>";
		jsml += handleArray(json, 0);
		jsml += "\n</html>";

		return jsml;
	}
};
