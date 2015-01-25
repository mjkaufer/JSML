var fs = require('fs');


var args = process.argv;

if(args.length < 3){//no file specified
	throw "Need to specify a filename!";
	process.exit(1);//stop the program
}

var output = args[2].substring(0, args[2].lastIndexOf(".")) + ".html";

fs.readFile(args[2], 'utf8', function(err, json){

	if(err) throw err;
	console.log(json);
	json = eval(json);//we call `eval` so we don't need to require quotes around tags
	console.log("Parsed")

	jsml = handleArray(json, 1);//gets rid of the first \n

	jsml = "<html>\n\t<body>" + jsml;
	jsml += "\n\t</body>\n</html>"

	fs.writeFile(output, jsml, function(err){
		if(err) throw err;

		console.log("Done! Saved as",output);
		process.exit(1);
	})


});

function handleArray(json, tabs){//handles an array

	var body = "";//what we'll be returning. Compiled HTML will be concated to this

	for(var ei in json){
		var element = json[ei];
		body+= handleTag(element, tabs+1);
	}

	return body;
}

function handleTag(json, tabs){
	if(json.tag === undefined){
		console.log(json);
		throw "Need a tag!";//todo, error contains line number

		process.exit(1);
	}

	var t = "\n";//so we skip a  line for starters
	for(var i = 0; i < tabs; i++){
		t+="\t";
	}
	//t will be what we concatenate to our elements to make it look all pretty & indented

	var start = "<" + json.tag;

	if(json.attributes !== undefined){//there are indeed attributes
		for(var a in json.attributes){
			start+=" ";

			start+=a;//add the attribute key
			if(json.attributes[a] !== undefined && json.attributes[a] !== null){//if the attribute key has a value
				start+="=";
				start+="\"" + json.attributes[a] + "\"";//add the attribute value
			}
		}
	}
	start+=">";//now we have our tag to append to the front
	var end = "</" + json.tag + ">";

	if(json.text === undefined)//if there is no text
		json.text = "";

	var children = "";

	if(json.children !== undefined){//if there are indeed children
		children = handleArray(json.children, tabs) + t;
	}

	return t + start + json.text + children + end;

}