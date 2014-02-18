'use strict';

var fs = require('fs');
var path = require('path');
var cssprettifier = require('../lib/css-prettifier');

exports.cssprettifier = {
  testBasic: function (test) {
    test.expect(1);

    var options = {
      decl: {
        before: '\n',
        between: ':',
      },
      rule: {
        before: '\n\n',
        between: '',
        after: '\n',
      },
      atRule: {
        before: '\n\n',
        between: '',
        after: '\n\n',
      },
      selectors: 'separateline',
    };
    var processor = cssprettifier(options);
    var css = fs.readFileSync(path.join(__dirname, 'fixtures/basic.css'), 'utf8');
    var expected = fs.readFileSync(path.join(__dirname, 'expected/basic.css'), 'utf8');
    var actual = processor.process(css).css.trim();

    test.equal(actual, expected, 'should be equal.');
    test.done();
  }
};

