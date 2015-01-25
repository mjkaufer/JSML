# JSML

JSON Markup Language, or JSML, is an investigation into the effectiveness of creating webpages in JSON.

## Inspiration

When using APIs, one lets out a groan when if they see the API outputs data in XML format. Nobody has this problem when writing HTML, however. Perhaps this is because writing a webpage in XML format is better than writing it in JSON. But, until now, there has been no way to tell. And thus, JSML was born. 

## Use

To compile a JSML (a `.json` file) into an HTML file, run `node compile.js [filename]`. Eventually, this will be npm'd, and there'll be a command we can run instead but, until now, we'll just do things the normal way.

## Syntax

Each JSON object either has a child object which defines children, attributes, and content, or simply a string which defines the tag's content.

For a program that compiles to 

`<p>JSML is cool</p>`

the JSML would look like

`[
	{
		tag:"p",
		text:"JSML is cool"
	}
]`



Here is an example of nested elements.

HTML:

`<div>
	<p id="info">Hello</p>
	<p>
		<b>World</b>
	</p>
</div>`

JSML:

`[
	{
		tag:"p",
		attributes:{
			"id":"info"
		},
		text:"Hello"
	},
	{
		tag:"p",
		children:[
			{
				tag:"b",
				text:"World"
			}
		]
	}
]`

The reason we have to put stuff in an array is because, if we'd like to use multiple `p` tags, for instance, we could not do so without an array with traditional JSON. JSML seeks to conform to JSON standards. A JSML like

`{
	p:"Hello",
	p:"World"	
}`

would turn into 

`{
	p:"World"	
}`

when read as a JSON file. Thus, everything stays in an array. It would be possible to make something which reads JSML files as a text file and parses it, but that is not JSML's intention. Feel free to fork the project, however, to implement this.