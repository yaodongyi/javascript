!function(c){function n(n){for(var e,t,r=n[0],o=n[1],u=n[2],i=0,a=[];i<r.length;i++)t=r[i],Object.prototype.hasOwnProperty.call(f,t)&&f[t]&&a.push(f[t][0]),f[t]=0;for(e in o)Object.prototype.hasOwnProperty.call(o,e)&&(c[e]=o[e]);for(p&&p(n);a.length;)a.shift()();return s.push.apply(s,u||[]),l()}function l(){for(var n,e=0;e<s.length;e++){for(var t=s[e],r=!0,o=1;o<t.length;o++){var u=t[o];0!==f[u]&&(r=!1)}r&&(s.splice(e--,1),n=i(i.s=t[0]))}return n}var t={},f={1:0},s=[];function i(n){if(t[n])return t[n].exports;var e=t[n]={i:n,l:!1,exports:{}};return c[n].call(e.exports,e,e.exports,i),e.l=!0,e.exports}i.m=c,i.c=t,i.d=function(n,e,t){i.o(n,e)||Object.defineProperty(n,e,{enumerable:!0,get:t})},i.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},i.t=function(e,n){if(1&n&&(e=i(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(i.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)i.d(t,r,function(n){return e[n]}.bind(null,r));return t},i.n=function(n){var e=n&&n.__esModule?function(){return n["default"]}:function(){return n};return i.d(e,"a",e),e},i.o=function(n,e){return Object.prototype.hasOwnProperty.call(n,e)},i.p="";var e=window.webpackJsonp=window.webpackJsonp||[],r=e.push.bind(e);e.push=n,e=e.slice();for(var o=0;o<e.length;o++)n(e[o]);var p=r;s.push([14,0]),l()}({0:function(n,e,t){"use strict";(function(o){function u(n,e){for(var t=0;t<e.length;t++){var r=e[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}Object.defineProperty(e,"__esModule",{value:!0}),e["default"]=void 0,t(2);var n=new(function(){function n(){!function t(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}(this,n),this.str='\n    <div id="_Toast">\n      <div class="t-mask"></div>\n      <div class="t-main">\n        <div>您浏览的网站有更新!</div>\n        <button>立即更新</button>\n      </div>\n    </div>'}return function r(n,e,t){return e&&u(n.prototype,e),t&&u(n,t),n}(n,[{key:"show",value:function(){var t=this;return new Promise(function(n,e){o("body").append(t.str),o("#_Toast").click(function(){t.hide(),n("confirm")})})}},{key:"hide",value:function(){o("#_Toast").remove()}}]),n}());e["default"]=n}).call(this,t(1))},14:function(n,e,r){"use strict";(function(n){var e=function t(n){return n&&n.__esModule?n:{"default":n}}(r(0));n("#jump_home").click(function(){console.log("about"),e["default"].show().then(function(n){console.log(n)})})}).call(this,r(1))},2:function(n,e){}});