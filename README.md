# CSS Prettifier [![Build Status](https://secure.travis-ci.org/hideki-a/generator-skyward.png?branch=master)](http://travis-ci.org/hideki-a/generator-skyward) [![Dependencies update check badge](https://david-dm.org/hideki-a/css-prettifier.png)](https://david-dm.org/hideki-a/css-prettifier)

CSS prettifier in your style.

## Sample

### Node.js

```js
var fs = require("fs");
var path = require("path");
var options = {
    decl: {
        before: '\n\t'
    },
    selectors: 'separateline'
};
var cssprettifier = require("../lib/css-prettifier");
var processor = cssprettifier(options);
var css = fs.readFileSync("before.css");
var result = processor.process(css, {
    map: true,
    from: "prefixer.css",
    to: "after.css"
});


fs.writeFileSync("after.css", result.css.trim());
```

Before execution css is:

```css
p, ul {
  margin-bottom: 1em;
}

.lyt-column .unit {
  float: left;
  margin-right: 20px;
}
.lyt-column .unit.last-unit {
  margin-right: 0;
}
```

After execution css is:

```css
p,
ul {
	margin-bottom: 1em;
}

.lyt-column .unit {
	float: left;
	margin-right: 20px;
}
.lyt-column .unit.last-unit {
	margin-right: 0;
}
```

## Usage

### Grunt.js

You can use the [grunt-csspretty](https://github.com/hideki-a/grunt-csspretty) plugin for Grunt.js.

### gulp.js

You can use the [gulp-csspretty](https://github.com/hideki-a/gulp-csspretty) plugin for gulp.js.