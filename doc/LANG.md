## Syntax and Language

Each item is either a JSON object that has a `children` object which defines children, attributes and/or various kinds of content or is simply a string which defines the tag's content.

### Simple Example

A JSML file that would look like this:

```JavaScript
[
    {
        tag: "p",
        text: "JSML is cool"
    }
]
```

would compile to:

```HTML
<p>JSML is cool</p>
```

The objects `tag` attribute was used to set the tag and the value of `text` was inserted into it.

### Nested Elements

Nested elements are either attribute definitions or child(-ren) specifications. Here an example:

```JavaScript
[
    {
        tag: "p",
        attributes:{
            "id": "info"
        },
        text: "Hello"
    },
    {
        tag: "p",
        children: [
            {
                tag: "b",
                text: "World"
            }
        ]
    }
]
```

which compiles to:

```HTML
<p id="info">Hello</p>
<p>
    <b>World</b>
</p>
```

It's as simple as it seems, the object from `attributes` is written into the tag itself and the `children` array is loaded into it.

**None:** If `children` and other content is specified, `children` will be added after the content.

**Example file:** [Children and Attributes](/examples/demo.jsml)

### Dynamic JSML and Evaluation

```JavaScript
var name = "mjkaufer";

[
    {
        tag: "h1",
        text: name + " - it works!!"
    }
]
```

Basically, any JavaScript can be run above the first `[` tag, or before the JSML array is initialized. Any JavaScript which *does not produce an output* can be run anywhere. For instance, `var name = "mjkaufer"` is ok to use wherever, but something like `console.log("Matthew")` is only ok before the JSML array is initialized.

Alternatively `eval` can be used, like seen in this example:

```JavaScript
[
    {
        tag: "b",
        eval: "4 + 5"
    }
]
```

turning into:

```HTML
9
```

`eval` can contain any kind of JavaScript statement, all the compiler does is send it through the [eval](http://www.w3schools.com/jsref/jsref_eval.asp) function, and places it instead of `text`. If `text` and `eval` are secified, `eval` will be preferred.

**Example files:**

* [Dynamic JSML](/examples/demo_js.jsml)
* [Evaluation](/examples/demo_eval.jsml)

### Single Child

If you have a single child, you don't need to bother creating an array for `c` or `children` - you can populate it with a single element instead.

```JavaScript
[
    {
        tag:"div",
        children:{
            tag:"p",
            text:"Single child!"
        }
    }
]
```

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

It is much too much work to type `attributes` & co. every time. The next trick may help:

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

will turn into

```HTML
<ul>
    <li>This is one paragraph.</li>
</ul>
<a href="google.com">And this is a link.</a>
```

`t` is short for `tag`, `c` for `children`, `T` for `text` and `a` for `attributes`. If bother were to be specified, the longer one would be chosen.

**Example file:** [Short tags](/examples/demo_js.jsml)

### Load Files into JSML

with the `file` tag, a file can be specified, relative to the working directory, and will be inserted instead of `text` or `eval`. `file` has the highest of all content types, and if specified will always inserted.

**Example file:** [Read File](/examples/demo_file.jsml)
