/*jshint node: true, eqnull: true */
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
    var optAtRule = self.options.atRule;
    var existOptAtRuleIndent = !!(optAtRule && optAtRule.indent != null);

    return postcss(function (css) {
      css.eachDecl(function (decl) {
        self.setOptions(decl, 'decl', ['before', 'between']);

        // Edit before property(in @rule)
        if (decl.parent.parent.type === 'atrule' && existOptAtRuleIndent) {
          decl.before = decl.before.replace(/^((\r?\n)+)(( |\t)+)?$/, '$1') + 
                        optAtRule.indent + optAtRule.indent;
        }
      });
      css.eachRule(function (rule) {
        var indent = '';    // Indent before selector in @rule

        self.setOptions(rule, 'rule', ['before', 'between', 'after']);

        // Edit before selector(in @rule)
        if (rule.parent.type === 'atrule' && existOptAtRuleIndent) {
          rule.before = rule.before.replace(/^((\r?\n)+)(( |\t)+)?$/, '$1') + 
                        optAtRule.indent;
          rule.after = rule.after.replace(/^((\r?\n)+)(( |\t)+)?$/, '$1') + 
                        optAtRule.indent;
          indent = optAtRule.indent;
        } else if (rule.parent.type === 'atrule') {
          indent = rule.before.replace(/^((\r?\n)+)(( |\t)+)?$/, '$3');
        }

        // Edit two or more selectors arrange
        if (self.options.selectors === 'separateline') {
          rule.selector = rule.selector.replace(/,( |\t)?(?!\n)/g, ',\n' + indent);
          if (rule.parent.type === 'atrule' && existOptAtRuleIndent) {
            rule.selector = rule.selector.replace(/,\n(?!( |\t))/g, ',\n' + indent);
          }
        } else if (self.options.selectors === 'sameline') {
          rule.selector = rule.selector.replace(/,\n+(( |\t)+)?/g, ', ');
        }
      });
      css.eachAtRule(function (atRule) {
        if (atRule.name !== 'charset') {
          self.setOptions(atRule, 'atRule', ['before', 'between', 'after']);
        }
      });
    });
  }
};

module.exports = cssprettifier;