# ![JSML](/jsml.png)

JSON Markup Language, or JSML, is an investigation into the effectiveness of creating webpages in JSON.

## Inspiration

When using APIs, one lets out a groan when if they see the API outputs data in XML format. JSON is expected, nowadays, when using an API. Nobody has this problem when writing HTML, however. Perhaps this is because writing a webpage in XML format is better than writing it in JSON. But, until now, there has been no way to tell. And thus, JSML was born.

This isn't meant to overtake web design as we know it. It's more of a proof of concept. However, JavaScript code can actually be executed within the JSML file, which is kind of neat. One could make counters, dynamic variables, etc. The possibilities are unexplored and endless!

## Use

To compile a JSML (a `.jsml` file) into an HTML file, run `jsml -c [filename]`.

## Examples & Syntax

Each JSON object either has a child object which defines children, attributes, and content, or simply a string which defines the tag's content.

### Simple Example

For a program that compiles to

```HTML
<p>JSML is cool</p>
```

the JSML would look like

```JavaScript
[
	{
		tag:"p",
		text:"JSML is cool"
	}
]
```

### Nested Elements

HTML:

```HTML
<p id="info">Hello</p>
<p>
	<b>World</b>
</p>
```

JSML:

```JavaScript
[
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
]
```

### Dynamic JSML

```JavaScript
var name = "mjkaufer";

[
	{
		tag:"h1",
		text:name + " - it works!!"
	}
]
```

Basically, any JavaScript can be run above the first `[` tag, or before the JSML array is initialized. Any JavaScript which *does not produce an output* can be run anywhere. For instance, `var name = "mjkaufer"` is ok to use wherever, but something like `console.log("Matthew")` is only ok before the JSML array is initialized.

### Simple Text

```HTML
This is nice
```

```JavaScript
[
	"This is nice"
]
```

If you use a string instead of an object within an array, it will be directly inserted into the parent.

### Short names

```HTML
<ul>
	<li>This is one paragraph.</li>
</ul>
<a href="google.com">And this is a link.</a>
```

```JavaScript
[
	{
		t: "ul",
		c: [
			{
				t: "li",
				T: "This is one paragraph."
			}
		]
	},
	{
		t: "a",
		a: [
			"href": "google.com"
		],
		T: "And this is a link."
	}
]
```

`t` is short for `tag`, `c` for `children`, `T` for `text` and `a` for `attributes`. If bother were to be specified, the longer one would be chosen.

## Contributing

If you have something very major to contribute, submit an issue first. Otherwise, for any small fixes, feel free to send a pull request.

If you'd like to find issues to work on, check [`TODO.md`](/TODO.md).
