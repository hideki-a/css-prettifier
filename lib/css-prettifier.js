'use strict';

var postcss = require('postcss');

var cssprettifier = function (options) {
  var _cssprettifier = new CSSPrittifier(options);
  return _cssprettifier.makePrettifier();
};

function CSSPrittifier(options) {
  this.options = options;
}

CSSPrittifier.prototype = {
  setOptions: function (node, nodeName, permitProp) {
    for (var key in this.options[nodeName]) {
      if (permitProp.indexOf(key) > -1 && this.options[nodeName][key] != null) {
        node[key] = this.options[nodeName][key];
      }
    }
  },

  makePrettifier: function () {
    var self = this;

    return postcss(function (css) {
      css.eachDecl(function (decl) {
        self.setOptions(decl, 'decl', ['before', 'between']);

        if (decl.parent.parent.type === 'atrule' && self.options.atRule && self.options.atRule.indent != null) {
          decl.before = decl.before.replace(/(\r?\n)+\s*/, '$1') + 
                        self.options.atRule.indent + self.options.atRule.indent;
        }
      });
      css.eachRule(function (rule) {
        var indent = '';

        self.setOptions(rule, 'rule', ['before', 'between', 'after']);

        if (rule.parent.type === 'atrule' && self.options.atRule && self.options.atRule.indent != null) {
          rule.before = rule.before.replace(/(\r?\n)+\s*/, '$1') + self.options.atRule.indent;
          rule.after = rule.after.replace(/(\r?\n)+\s*/, '$1') + self.options.atRule.indent;
          indent = self.options.atRule.indent;
        } else if (rule.parent.type === 'atrule') {
          indent = rule.before.replace(/(\r?\n)+(\s*)/, '$2');
        }

        if (self.options.selectors === 'separateline') {
          rule.selector = rule.selector.replace(/, /g, ',\n' + indent);
        } else if (self.options.selectors === 'sameline') {
          rule.selector = rule.selector.replace(/,\n(\s+)?/g, ', ');
        }
      });
      css.eachAtRule(function (atRule) {
        self.setOptions(atRule, 'atRule', ['before', 'between', 'after']);
      });
    });
  }
};

module.exports = cssprettifier;