//Optparse.js 1.0.3-Copyright (c)2009 Johan Dahlberg
//Based on:https://github.com/jfd/optparse-js
//Compressed and removed some redundant features by @phikal
var optparse={};try{optparse=exports;}catch(e){}(function(self){var VERSION='1.0.3';var LONG_SWITCH_RE=
/^--\w/,SHORT_SWITCH_RE=/^-\w/,EXT_RULE_RE=/(\-\-[\w_-]+)\s+([\w\[\]_-]+)|(\-\-[\w_-]+)/,ARG_OPTIONAL_RE
=/\[(.+)\]/,DEFAULT_FILTER='_DEFAULT',PREDEFINED_FILTERS={};function filter_text(value){return value;}
PREDEFINED_FILTERS[DEFAULT_FILTER]=filter_text;PREDEFINED_FILTERS.TEXT=filter_text;function build_rules
(filters,arr){var rules=[];for(var i=0;i<arr.length;i++){var r=arr[i],rule;if(!contains_expr(r))
throw OptError('Rule MUST contain an option.');switch(r.length){case 1:rule=build_rule(filters,undefined,r[0]);
break;case 2:var expr=LONG_SWITCH_RE.test(r[0])?0:1;varalias=expr===0?-1:0;var desc=alias===-1?1:-1;
rule=build_rule(filters,r[alias],r[expr],r[desc]);break;case 3:rule=build_rule(filters,r[0],r[1],r[2]);
break;default:case 0:continue;}rules.push(rule);}return rules;}function build_rule(filters,short,expr,desc){
var optional,filter;var m=expr.match(EXT_RULE_RE);if(m===null)throw OptError('The switch is not well-formed.');
var long=m[1]||m[3];if(m[2]!==undefined){var optional=ARG_OPTIONAL_RE.test(m[2]);var optional_match=m[2].match
(ARG_OPTIONAL_RE);var filter_name=optional?optional_match[1]:m[2];filter=filters[filter_name];if(filter===
undefined)filter=filters[DEFAULT_FILTER];}return{name:long.substr(2),short:short,long:long,decl:expr,desc:
desc,optional_arg:optional,filter:filter};}function contains_expr(arr){if(!arr||!arr.length)return false;var
l=arr.length;while(l-- >0)if(LONG_SWITCH_RE.test(arr[l]))return true;return false;}function extend(dest,src){
var result=dest;for(var n in src)result[n]=src[n];return result;}function spaces(arg1,arg2){var l,builder=[];if(
arg1.constructor===Number)l=arg1;else{if(arg1.length==arg2)return arg1;l=arg2-arg1.length;builder.push(arg1);}
while(l-- > 0)builder.push(' ');return builder.join('');}function Parser(rules){return new OptionParser(rules);}
function OptError(msg){this.toString=function(){return this.msg;};}function OptionParser(rules){this.banner=
'Usage:[Options]';this.options_title='Available options:';this._rules=rules;this._halt=false;this.filters=extend(
{},PREDEFINED_FILTERS);this.on_args={};this.on_switches={};this.on_halt=function(){};this.default_handler=
function(){};}OptionParser.prototype={on:function(value,fn){if(value.constructor===Function){this.default_handler=
value;}else if(value.constructor===Number){this.on_args[value]=fn;}else{this.on_switches[value]=fn;}},filter:
function(name,fn){this.filters[name.toUpperCase()]=fn;},parse:function(args){var result=[],callback;var rules=
build_rules(this.filters,this._rules);var tokens=args.concat([]);var token;while(this._halt===false&&(token=
tokens.shift())){if(LONG_SWITCH_RE.test(token)||SHORT_SWITCH_RE.test(token)){var arg;for(var i=0;i<rules.length;
i++){var rule=rules[i];if(rule.long==token||rule.short==token){if(rule.filter!==undefined){arg=tokens.shift();
if(arg&&(!LONG_SWITCH_RE.test(arg)&&!SHORT_SWITCH_RE.test(arg))){try {arg=rule.filter(arg,tokens);}catch(e){
throw OptError(token+':'+e.toString());}}else if(rule.optional_arg&&arg)tokens.unshift(arg);else throw OptError
('Expected switch argument.');}callback=this.on_switches[rule.name];if(!callback)callback=this.on_switches['*'];
if(callback)callback.apply(this,[rule.name,arg]);break;}}if(i==rules.length)this.default_handler.apply(this,[token]
);}else{callback=this.on_args[result.length];result.push(token);if(callback)callback.apply(this,[token]);}}
return this._halt?this.on_halt.apply(this,[tokens]):result;},options:function(){return build_rules(this.filters,
this._rules);},halt:function(fn){this._halt=fn===undefined;if(fn)this.on_halt=fn;},toString:function(){varbuilder=
[this.banner,'',this.options_title],shorts=false,longest=0,rule;var rules=build_rules(this.filters,this._rules);
for(var i=0;i<rules.length;i++){if((rule=rules[i]).short)shorts=true;if(rule.decl.length>longest)longest=rule.decl.
length;}for(var j=0;j<rules.length;j++){var text=spaces(6);rule=rules[j];if(shorts&&rule.short)text=spaces(2)+
rule.short+',';text+=spaces(rule.decl,longest)+spaces(3);text+=rule.desc;builder.push(text);}returnbuilder.join
('\n');}};self.VERSION=VERSION;self.OptionParser=OptionParser;})(optparse);
