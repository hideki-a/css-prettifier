'use strict';

var fs = require('fs');
var path = require('path');
var cssprettifier = require('../lib/css-prettifier');

exports.cssprettifier = {
  testThrough: function (test) {
    test.expect(1);

    var options = {};
    var processor = cssprettifier(options);
    var css = fs.readFileSync(path.join(__dirname, 'fixtures/basic.css'));
    var expected = fs.readFileSync(path.join(__dirname, 'expected/through.css'));
    var actual = processor.process(css).css;

    test.equal(actual, expected, 'File outputted without change.');
    test.done();
  },

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
    var css = fs.readFileSync(path.join(__dirname, 'fixtures/basic.css'));
    var expected = fs.readFileSync(path.join(__dirname, 'expected/basic.css'));
    var actual = processor.process(css).css;

    test.equal(actual, expected, 'File outputted with formatted by setting rules.');
    test.done();
  },

  testSepareteLine: function (test) {
    test.expect(1);

    var options = {
      selectors: 'separateline'
    };
    var processor = cssprettifier(options);
    var css = fs.readFileSync(path.join(__dirname, 'fixtures/basic.css'));
    var expected = fs.readFileSync(path.join(__dirname, 'expected/separeteline.css'));
    var actual = processor.process(css).css;

    test.equal(actual, expected, 'A new line for two or more selectors is started.');
    test.done();
  },

  testAtRuleIndent: function (test) {
    test.expect(2);

    var optionsSeparete = {
      atRule: {
        indent: '    '
      },
      selectors: 'separateline'
    };
    var processor = cssprettifier(optionsSeparete);
    var css = fs.readFileSync(path.join(__dirname, 'fixtures/basic.css'));
    var expected = fs.readFileSync(path.join(__dirname, 'expected/atrule_indent1.css'));
    var actual = processor.process(css).css;

    test.equal(actual, expected, 'Formatted by 4space indent(spareteline).');


    var optionsSameline = {
      atRule: {
        indent: '    '
      },
      selectors: 'sameline'
    };
    processor = cssprettifier(optionsSameline);
    expected = fs.readFileSync(path.join(__dirname, 'expected/atrule_indent2.css'));
    actual = processor.process(css).css;

    test.equal(actual, expected, 'Formatted by 4space indent(sameline).');

    test.done();
  },

  testAtRuleTabIndent: function (test) {
    test.expect(2);

    var optionsSeparete = {
      atRule: {
        indent: '\t'
      },
      selectors: 'separateline'
    };
    var processor = cssprettifier(optionsSeparete);
    var css = fs.readFileSync(path.join(__dirname, 'fixtures/tab.css'));
    var expected = fs.readFileSync(path.join(__dirname, 'expected/atrule_indent1_tab.css'));
    var actual = processor.process(css).css;

    test.equal(actual, expected, 'Formatted by tab indent(sameline).');


    var optionsSameline = {
      atRule: {
        indent: '\t'
      },
      selectors: 'sameline'
    };
    processor = cssprettifier(optionsSameline);
    expected = fs.readFileSync(path.join(__dirname, 'expected/atrule_indent2_tab.css'));
    actual = processor.process(css).css;

    test.equal(actual, expected, 'Formatted by tab indent(sameline).');

    test.done();
  }
};

