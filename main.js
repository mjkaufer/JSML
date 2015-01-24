var fs = require('fs');


var args = process.argv;

if(args.length < 3){//no file specified
	throw "Need to specify a filename!";
	process.exit(1);//stop the program
}

fs.readFile('file', 'utf8', function(err, json){

	if(err) throw err;
	json = JSON.parse(json);

	jsml = handleArray(json, 0);

	fs.writeFile("done.html", )


});

function handleArray(json, tabs){//handles an array

	var body = "";//what we'll be returning. Compiled HTML will be concated to this

	for(var ei in json){
		var element = json[ei];
		body+= handleTag(element, tabs+1);
	}
}

function handleTag(json, tabs){
	if(json.tag === undefined){
		throw "Need a tag!";//todo, error contains line number
		process.exit(1);
	}

	var t = "";
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
				start+=json.attributes[a];//add the attribute value
			}
		}
	}
	start+=">";//now we have our tag to append to the front
	var end = "</" + json.tag + ">";

	if(json.text === undefined)//if there is no text
		json.text = "";

	if(json.children === undefined){//if no children were passed
		return t + start + json.text + end;
	}

}