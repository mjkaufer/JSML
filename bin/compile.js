String.prototype.isAString = true;

function toJSML(json){
		var json = eval(json);
		// if(!Array.isArray(json))//if an array wasn't passed...
		// 	throw "JSML not an array!";
		var jsml = "<!DOCTYPE html>\n<html>";
		jsml += handleArray(json, 0);
		jsml += "\n</html>";

		return jsml;
}

function handleArray(json, tabs) {
	var body = "";

	for (var ei in json) {
		var element = json[ei];
		body += handleTag(element, tabs+1);
	}

	return body;
}

function handleTag(json, tabs) {
	if (!json.isAString && (!json.tag && !json.t)){
		console.error("Need a tag.");
		console.log(json)
		process.exit(1);
	}

	// Tabs
	var t = '\n'+(Array(tabs+1).join('\t'));

	// If object is a string, it will be added to document as is
	if (json.isAString)
		return t + json;

	// It will be what we concatenate to our elements to make it look all pretty & indented
	var start = "<" + (json.tag || json.t);
	if (json.attributes || json.a) { // check if attributes are supplied

		if(json.attributes)
			for (var key in json.attributes)
				if (json.attributes[key])
					start+=" "+key+"=\"" + json.attributes[key] + "\""; // add the attribute value
		if(json.a)
			for (var key in json.a)
				if (json.a[key])
					start+=" "+key+"=\"" + json.a[key] + "\""; // add the attribute value

	}
	start+=">"; // append to the front

	var end = "</" + (json.tag || json.t) + ">";

	var children = "";
	if (json.children || json.c) //if there are indeed children
		if(Array.isArray((json.children || json.c)))//if it's an array
			children = handleArray((json.children || json.c), tabs)+t;
		else//it's an json chunk
			children = handleTag((json.children || json.c), tabs+1)+t;


	return t + start + (json.text || json.T || "") + children + end;
}

module.exports = {
	"toJSML": function(arg){
		return toJSML(arg);
	}
}