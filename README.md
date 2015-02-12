### ![JSML](/jsml.png)

JSML (JSON Markup Language) is an investigation into the effectiveness of creating webpages in JSON.

[![npm version](https://img.shields.io/npm/v/node-jsml.svg)](https://www.npmjs.com/package/node-jsml)
[![license](https://img.shields.io/npm/l/node-jsml.svg)](https://www.npmjs.com/package/node-jsml)
[![downloads](https://img.shields.io/npm/dm/node-jsml.svg)](https://www.npmjs.com/package/node-jsml)

## Installation

As JSML is on npm, you can install it easily with the command `npm install -g node-jsml`.

On some systems, superuser access might be required.

## Use

### Through the Terminal

To compile a JSML (a `.jsml` file) into an HTML file, run `jsml [filename]`.

If you want to output to stdout, use `-c` in front of the file, and `-O` to directly specify the output path.

### Through Your Program

To include JSML, use `jsml = require('node-jsml');`

To compile a JSML file to HTML, use the following code

```JavaScript

var jsml = require('node-jsml');

myJSML = [
	{
		t:"p",
		T:"this works!"
	}
];

output = jsml.parse(myJSML);
```

`parse` has an optional parameter, `eval`. If `true`, then `myJSML` (f.e. in this example) will be run though [eval](http://www.w3schools.com/jsref/jsref_eval.asp). This is helpful when reading `.jsml` files which don't have `"` around every tag.

## Syntax and Language

All the rules and tricks can be found in [LANG.md](/doc/LANG.md)

## Inspiration

When using APIs, one lets out a groan when if they see the API outputs data in XML format. JSON is expected, nowadays, when using an API. Nobody has this problem when writing HTML, however. Perhaps this is because writing a webpage in XML format is better than writing it in JSON. But, until now, there has been no way to tell. And thus, JSML was born.

This isn't meant to overtake web design as we know it. It's more of a proof of concept. However, JavaScript code can actually be executed within the JSML file, which is kind of neat. One could make counters, dynamic variables, etc. The possibilities are unexplored and endless!

## Contributing

If you have something very major to contribute, submit an issue first. Otherwise, for any small fixes, feel free to send a pull request.

If you'd like to find issues to work on, check [`TODO.md`](/TODO.md).

**Note:** The logo (svg source file) uses the font [monofur](http://www.dafont.com/monofur.font).
