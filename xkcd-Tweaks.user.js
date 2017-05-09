// ==UserScript==
// @name          xkcd Tweaks
// @description   Some tweaks to xkcd.com and what-if.xkcd.com
// @include       /^(https?:)?(\/\/)?(www\.)?(what-?if\.)?xkcd\.com/
// @author        Mital Ashok
// @icon          https://xkcd.com/favicon.ico
// @namespace     https://greasyfork.org/en/users/59570-mital-ashok
// @license       MIT License
// @version       3.0.4
// @grant         none
// @updateurl     https://mitalashok.github.io/xkcd-Tweaks.user.js
// @run-at        document-start
// @noframes
// ==/UserScript==

// @require       https://raw.githubusercontent.com/stefanpenner/es6-promise/master/dist/es6-promise.auto.min.js
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.ES6Promise=e()}(this,function(){"use strict";function t(t){return"function"==typeof t||"object"==typeof t&&null!==t}function e(t){return"function"==typeof t}function n(t){I=t}function r(t){J=t}function o(){return function(){return process.nextTick(a)}}function i(){return"undefined"!=typeof H?function(){H(a)}:c()}function s(){var t=0,e=new V(a),n=document.createTextNode("");return e.observe(n,{characterData:!0}),function(){n.data=t=++t%2}}function u(){var t=new MessageChannel;return t.port1.onmessage=a,function(){return t.port2.postMessage(0)}}function c(){var t=setTimeout;return function(){return t(a,1)}}function a(){for(var t=0;t<G;t+=2){var e=$[t],n=$[t+1];e(n),$[t]=void 0,$[t+1]=void 0}G=0}function f(){try{var t=require,e=t("vertx");return H=e.runOnLoop||e.runOnContext,i()}catch(n){return c()}}function l(t,e){var n=arguments,r=this,o=new this.constructor(p);void 0===o[et]&&k(o);var i=r._state;return i?!function(){var t=n[i-1];J(function(){return x(i,o,t,r._result)})}():E(r,o,t,e),o}function h(t){var e=this;if(t&&"object"==typeof t&&t.constructor===e)return t;var n=new e(p);return g(n,t),n}function p(){}function v(){return new TypeError("You cannot resolve a promise with itself")}function d(){return new TypeError("A promises callback cannot return that same promise.")}function _(t){try{return t.then}catch(e){return it.error=e,it}}function y(t,e,n,r){try{t.call(e,n,r)}catch(o){return o}}function m(t,e,n){J(function(t){var r=!1,o=y(n,e,function(n){r||(r=!0,e!==n?g(t,n):S(t,n))},function(e){r||(r=!0,j(t,e))},"Settle: "+(t._label||" unknown promise"));!r&&o&&(r=!0,j(t,o))},t)}function b(t,e){e._state===rt?S(t,e._result):e._state===ot?j(t,e._result):E(e,void 0,function(e){return g(t,e)},function(e){return j(t,e)})}function w(t,n,r){n.constructor===t.constructor&&r===l&&n.constructor.resolve===h?b(t,n):r===it?(j(t,it.error),it.error=null):void 0===r?S(t,n):e(r)?m(t,n,r):S(t,n)}function g(e,n){e===n?j(e,v()):t(n)?w(e,n,_(n)):S(e,n)}function A(t){t._onerror&&t._onerror(t._result),T(t)}function S(t,e){t._state===nt&&(t._result=e,t._state=rt,0!==t._subscribers.length&&J(T,t))}function j(t,e){t._state===nt&&(t._state=ot,t._result=e,J(A,t))}function E(t,e,n,r){var o=t._subscribers,i=o.length;t._onerror=null,o[i]=e,o[i+rt]=n,o[i+ot]=r,0===i&&t._state&&J(T,t)}function T(t){var e=t._subscribers,n=t._state;if(0!==e.length){for(var r=void 0,o=void 0,i=t._result,s=0;s<e.length;s+=3)r=e[s],o=e[s+n],r?x(n,r,o,i):o(i);t._subscribers.length=0}}function M(){this.error=null}function P(t,e){try{return t(e)}catch(n){return st.error=n,st}}function x(t,n,r,o){var i=e(r),s=void 0,u=void 0,c=void 0,a=void 0;if(i){if(s=P(r,o),s===st?(a=!0,u=s.error,s.error=null):c=!0,n===s)return void j(n,d())}else s=o,c=!0;n._state!==nt||(i&&c?g(n,s):a?j(n,u):t===rt?S(n,s):t===ot&&j(n,s))}function C(t,e){try{e(function(e){g(t,e)},function(e){j(t,e)})}catch(n){j(t,n)}}function O(){return ut++}function k(t){t[et]=ut++,t._state=void 0,t._result=void 0,t._subscribers=[]}function Y(t,e){this._instanceConstructor=t,this.promise=new t(p),this.promise[et]||k(this.promise),B(e)?(this._input=e,this.length=e.length,this._remaining=e.length,this._result=new Array(this.length),0===this.length?S(this.promise,this._result):(this.length=this.length||0,this._enumerate(),0===this._remaining&&S(this.promise,this._result))):j(this.promise,q())}function q(){return new Error("Array Methods must be provided an Array")}function F(t){return new Y(this,t).promise}function D(t){var e=this;return new e(B(t)?function(n,r){for(var o=t.length,i=0;i<o;i++)e.resolve(t[i]).then(n,r)}:function(t,e){return e(new TypeError("You must pass an array to race."))})}function K(t){var e=this,n=new e(p);return j(n,t),n}function L(){throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")}function N(){throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")}function U(t){this[et]=O(),this._result=this._state=void 0,this._subscribers=[],p!==t&&("function"!=typeof t&&L(),this instanceof U?C(this,t):N())}function W(){var t=void 0;if("undefined"!=typeof global)t=global;else if("undefined"!=typeof self)t=self;else try{t=Function("return this")()}catch(e){throw new Error("polyfill failed because global object is unavailable in this environment")}var n=t.Promise;if(n){var r=null;try{r=Object.prototype.toString.call(n.resolve())}catch(e){}if("[object Promise]"===r&&!n.cast)return}t.Promise=U}var z=void 0;z=Array.isArray?Array.isArray:function(t){return"[object Array]"===Object.prototype.toString.call(t)};var B=z,G=0,H=void 0,I=void 0,J=function(t,e){$[G]=t,$[G+1]=e,G+=2,2===G&&(I?I(a):tt())},Q="undefined"!=typeof window?window:void 0,R=Q||{},V=R.MutationObserver||R.WebKitMutationObserver,X="undefined"==typeof self&&"undefined"!=typeof process&&"[object process]"==={}.toString.call(process),Z="undefined"!=typeof Uint8ClampedArray&&"undefined"!=typeof importScripts&&"undefined"!=typeof MessageChannel,$=new Array(1e3),tt=void 0;tt=X?o():V?s():Z?u():void 0===Q&&"function"==typeof require?f():c();var et=Math.random().toString(36).substring(16),nt=void 0,rt=1,ot=2,it=new M,st=new M,ut=0;return Y.prototype._enumerate=function(){for(var t=this.length,e=this._input,n=0;this._state===nt&&n<t;n++)this._eachEntry(e[n],n)},Y.prototype._eachEntry=function(t,e){var n=this._instanceConstructor,r=n.resolve;if(r===h){var o=_(t);if(o===l&&t._state!==nt)this._settledAt(t._state,e,t._result);else if("function"!=typeof o)this._remaining--,this._result[e]=t;else if(n===U){var i=new n(p);w(i,t,o),this._willSettleAt(i,e)}else this._willSettleAt(new n(function(e){return e(t)}),e)}else this._willSettleAt(r(t),e)},Y.prototype._settledAt=function(t,e,n){var r=this.promise;r._state===nt&&(this._remaining--,t===ot?j(r,n):this._result[e]=n),0===this._remaining&&S(r,this._result)},Y.prototype._willSettleAt=function(t,e){var n=this;E(t,void 0,function(t){return n._settledAt(rt,e,t)},function(t){return n._settledAt(ot,e,t)})},U.all=F,U.race=D,U.resolve=h,U.reject=K,U._setScheduler=n,U._setAsap=r,U._asap=J,U.prototype={constructor:U,then:l,"catch":function(t){return this.then(null,t)}},U.polyfill=W,U.Promise=U,U.polyfill(),U});

(function(window, document, undefined) {'use strict';

  // ==Settings==

  var border = true;
  var hr = true;
  var title_text = true;
  var snap = !false;
  var explain_button = true;
  var transcript = true;

  // ==/Settings==

  var main_run = false;
  function main() {
    if (main_run) {
      return;
    }
    main_run = true;

    function repeat(interval, func, callback) {
      callback = callback || (function() {});
      if (func()) {
        callback();
        return;
      }
      var interval_id = window.setInterval(function() {
        if (func()) {
          window.clearInterval(interval_id);
          callback();
        }
      }, interval);
    }

    function disable(node_list) {
      return function() {
        window.Array.prototype.forEach.call(node_list, function(node) {
          node.style = 'visibility:hidden;cursor:default';
          node.removeAttribute('href');
          node.parentElement.style = 'user-select:none;-moz-user-select:none;-webkit-user-select:none';
        });
        return window.Array.prototype.every.call(node_list, function(node) {
          return node.style.visibility === 'hidden' && !node.hasAttribute('href') && node.style.cursor === 'default';
        });
      };
    }

    function is_editable(node) {
      var name = node.nodeName.toLowerCase();
      return node.hasAttribute('contenteditable') || node.nodeType === 1 && (name === "textarea" ||
        name === "input" && /^(?:text|email|number|search|tel|url|password|)$/i.test(node.type));
    }

    function xhr(url, timeout, method) {
      return new window.Promise(function(resolve, reject) {
        var resolved = false;
        var x = new window.XMLHttpRequest();
        x.onreadystatechange = function() {
          if (x.readyState === window.XMLHttpRequest.DONE) {
            resolve(x.responseText, x);
            resolved = true;
          }
        };
        x.open(method || 'GET', url, true);
        x.send(null);
        if (timeout === null) {
          return;
        }
        window.setTimeout(function() {
          if (!resolved) {
            x.abort();
            reject(new window.Error('Timeout'));
          }
        }, timeout || 5000);
      });
    }
    var number;

    var localStorage = window.localStorage || {};
    var key_codes = {
      left: 37, right: 39, n: 78, p: 80, r: 82
    };

    if (/^(https?:)?(\/\/)?(www\.)?what-if/i.test(window.location.href)) {
      var time = +new window.Date();
      var last_number;
      var local_latest = localStorage.latest_comic;
      var expired = local_latest === undefined;
      if (!expired) {
        local_latest = local_latest.split(',');
        expired = +local_latest[0] <= time;
      }
      if (expired) {
        last_number = xhr('/').then(function(html) {
          var from_html = +html.match(
            /<a href="\/\/what-if\.xkcd\.com\/(\d+)\/"><h1>/
          )[1];
          localStorage.latest_comic = from_html + ',' + (time + 6.048e+8);
          return from_html;
        });
      } else {
        last_number = new window.Promise(function(resolve) {
          return +local_latest[1];
        });
      }
      var head_anchor = document.getElementsByTagName('h1')[0].parentElement;
      number = +head_anchor.getAttribute('href').slice(19, -1);

      if (/^(https?:)?(\/\/)?(www\.)?what-if\.xkcd\.com\/\d+/i.test(window.location.href)) {
        repeat(100, function() {
          head_anchor.removeAttribute('href');
          head_anchor.style.textDecoration = 'underline';
          return !head_anchor.hasAttribute('href') && head_anchor.style.textDecoration === 'underline';
        });
      }
      var is_first;
      var is_last;
      window.Array.prototype.forEach.call(document.getElementsByTagName('a'), function(a) {
        if (a.firstChild) {
          if (a.firstChild.textContent === 'Prev') {
            is_first = false;
          } else if (a.firstChild.textContent === 'Next') {
            is_last = false;
          }
        }
      });
      var add_buttons = function(nav) {
        var ul = nav.firstElementChild;
        var a;
        nav.style.width = '23.5em';
        if (!is_first) {
          var first_tag = document.createElement('li');
          a = document.createElement('a');
          a.textContent = 'First';
          a.href = '/1/';
          first_tag.appendChild(a);
          first_tag.className = 'nav-prev';
          ul.insertBefore(first_tag, ul.firstChild);
        }
        if (!is_last) {
          var last_tag = document.createElement('li');
          a = document.createElement('a');
          a.textContent = 'Last';
          a.href = '/';
          last_tag.appendChild(a);
          last_tag.className = 'nav-next';
          ul.insertBefore(last_tag, ul.lastElementChild);
        }
        window.Array.prototype.forEach.call(ul.children, function(li) {
          if (li.firstChild.firstChild.textContent !== 'Last') {
            li.style.marginRight = '0.5em';
          }
        });
      };
      var navs = document.getElementsByClassName('main-nav');
      add_buttons(navs[0]);
      add_buttons(navs[1]);
      last_number.then(function(last) {
        var add_random = function(ul) {
          var li = document.createElement('li');
          var a = document.createElement('a');
          a.href = window.decodeURIComponent('%6A%61%76%61%73%63%72%69%70%74%3A') + window.encodeURIComponent(
              'function() {' +
              'var random = window.Math.floor(window.Math.random() * ' + (last_number - 1) + ') + 1;' +
              'if (random >= ' + number + ') {' +
              'random++;' +
              '}' +
              'window.location.replace("' + window.location.origin + '/" + random + "/");' +
              '}'
            );
          a.className = 'random-button';
          a.innerText = 'Random';
          li.appendChild(a);
          if (is_last) {
            ul.insertBefore(li, ul.lastChild);
          } else {
            ul.insertBefore(li, ul.lastChild.previousSibling);
          }
          if (is_first) {
            li.style.marginLeft = '8.57552em';
          }
        };
        var navs = document.getElementsByClassName('main-nav');
        add_random(navs[0].firstElementChild);
        add_random(navs[1].firstElementChild);
        return last;
      });
      document.addEventListener('keydown', function(event) {
        switch(event.keyCode) {
          case key_codes.right: case key_codes.n:
          if (is_first) return;
          window.Array.prototype.forEach.call(document.getElementsByTagName('a'), function(a) {
            if (a.firstChild !== null && a.firstChild.textContent === 'Next') {
              a.click();
            }
          });
          return;
          case key_codes.left: case key_codes.p:
          if (is_last) return;
          window.Array.prototype.forEach.call(document.getElementsByTagName('a'), function(a) {
            if (a.firstChild !== null && a.firstChild.textContent === 'Prev') {
              a.click();
            }
          });
          return;
          case key_codes.r:
            last_number.then(function(last) {
              var random = window.Math.floor(window.Math.random() * (last_number - 1)) + 1;
              if (random >= number) {
                random++;
              }
              window.location.replace(window.location.origin + '/' + random + '/');
            });
        }
      }, true);
      window.Array.prototype.forEach.call(document.getElementsByTagName('img'), function(img) {
        if (img.hasAttribute('title')) {
          if (border) {
            img.style.border = '2px solid rgba(127, 127, 127, 0.22)';
          }
          if (title_text) {
            img.style.marginTop = img.style.paddingTop;
            var oldPadding = img.style.paddingBottom;
            img.style.marginBottom = 0;
            img.style.paddingTop = 0;
            img.style.paddingBottom = 0;
            var title = document.createElement('p');
            title.textContent = img.title;
            title.style = 'text-align:center;padding-left:5em;padding-right:5em;padding-top:0;font-size:85%';
            title.style.paddingBottom = oldPadding;
            img.parentElement.insertBefore(title, img.nextSibling);
            img.removeAttribute('title');
          }
        }
      });
      return;
    }
    var comic = document.getElementById('comic');
    if ((window.location.pathname === '/404/' || window.location.pathname === '/404') && !comic) {
      var slash = window.location.pathname === '/404' ? '/' : '';
      xhr('/403/').then(function(page) {
        var title_text = 'April Fools! (This page was created by xkcd tweaks. It would normally be a HTTP 404 error page.)';
        var title = 'Not Found';
        document.documentElement.innerHTML = page;
        document.title = 'xkcd: ' + title;
        document.getElementById('comic').innerHTML =
          '<iframe title="' + title_text + '" style="border:1px solid gray;outline:1px solid black;margin-top:1px;width:296px;height:296px;" src="/404' + slash + '" height="296" width="296">' +
              '<h1 style="text-align:left;font-size:2em;font-variant:normal;font-family:Times New Roman;font-weight:bold;">404 - Not Found</h1>' +
          '</iframe>' +
          '<div style="width:300px;height:300px;position:absolute;left:240px;margin-top:-299px;" title="' + title_text + '"></div>';
        document.getElementById('ctitle').textContent = title;
        var img_link = document.getElementById('transcript').previousSibling;
        var perma_link = img_link.previousSibling.previousSibling;
        img_link.textContent = img_link.textContent.replace('convincing_pickup_line.png', '');
        perma_link.textContent = perma_link.textContent.replace('403', '404');
        window.Array.prototype.forEach.call(document.querySelectorAll('a[rel="prev"]'), function(el) {
          el.setAttribute('href', '/403/');
        });
        window.Array.prototype.forEach.call(document.querySelectorAll('a[rel="next"]'), function(el) {
          el.setAttribute('href', '/405/');
        });
        main_run = false;
        main();
      });
      return;
    }
    if (!comic) {
      return;
    }
    if (snap) {
      var get_top = function() {
        return ((document.getElementById('middleContainer') || {}).offsetTop || 173) + 6;
      };
      window.setTimeout(function() {
        window.scrollTo({
          left: 0,
          top: get_top(),
          behavior: 'smooth'
        });
      }, 500);
      var scroll_interval_id = null;
      window.addEventListener('scroll', function() {
        var scroll_position = document.documentElement.scrollTop || document.body.scrollTop;
        var top = get_top();
        if (scroll_position > top - 145 && top + 10 > scroll_position) {
          if (scroll_interval_id === null && scroll_position !== top) {
            scroll_interval_id = window.setInterval(function() {
              if (scroll_position > top - 145 && top + 10 > scroll_position) {
                window.scrollTo({
                  left: 0,
                  top: top,
                  behavior: 'smooth'
                });
              }
              window.clearInterval(scroll_interval_id);
              scroll_interval_id = null;
            }, 500);
          }
        } else {
          if (scroll_interval_id !== null) {
            window.clearInterval(scroll_interval_id);
            scroll_interval_id = null;
          }
        }
      }, false);
    }

    var img_link = document.getElementById('transcript').previousSibling;
    var perma_link = img_link.previousSibling.previousSibling;
    var perma_link_tag = document.createElement('a');
    perma_link_tag.href = perma_link.textContent.slice(31).replace('http://', 'https://');
    perma_link_tag.style.fontWeight = 'initial';
    perma_link_tag.innerText = perma_link.textContent.slice(31).replace('http://', 'https://');
    perma_link.textContent = perma_link.textContent.slice(1, 31);
    perma_link.parentElement.insertBefore(perma_link_tag, perma_link.nextSibling);
    if (/comics\/\s*$/.test(img_link.textContent)) {
      img_link.parentElement.insertBefore(document.createElement('br'), img_link);
      img_link.parentElement.removeChild(img_link);
    } else {
      var imgLinkTag = document.createElement('a');
      imgLinkTag.style.fontWeight = 'initial';
      imgLinkTag.href = img_link.textContent.slice(39, -1).replace('http://', 'https://');
      imgLinkTag.innerText = img_link.textContent.slice(39, -1).replace('http://', 'https://');
      img_link.textContent = img_link.textContent.slice(1, 39);
      img_link.parentElement.insertBefore(imgLinkTag, img_link.nextSibling);
    }

    var next_buttons;
    var previous_buttons;
    repeat(100, function() {
      next_buttons = window.Array.prototype.slice.call(document.querySelectorAll('[rel="next"], [href="/"]'), 1);
      previous_buttons = document.querySelectorAll('[rel="prev"], [href="/1/"]');
      return next_buttons.length === 4 && previous_buttons.length === 4;
    }, function() {
      if (previous_buttons[1].getAttribute('href') === '#') {
        number = 1;
        repeat(100, disable(previous_buttons));
      } else {
        number = +previous_buttons[1].getAttribute('href').slice(1, -1) + 1;
        if (number === 404) {
          if (document.getElementById('ctitle').firstChild.textContent === 'Journal 3') {
            number++;
            previous_buttons[1].href = '/404/';
            previous_buttons[3].href = '/404/';
          } else {
            next_buttons[0].href = '/405/';
            next_buttons[2].href = '/405/';
          }
        } else if (number === 403) {
          next_buttons[0].href = '/404/';
          next_buttons[2].href = '/404/';
        } else if (next_buttons[0].getAttribute('href') === '#') {
          repeat(100, disable(next_buttons));
          document.querySelector('[href="/"]').removeAttribute('href');
        }
      }
    });

    repeat(1000, function() {
      if (comic.firstElementChild.tagName.toLowerCase() === 'script') {
        return false;
      }
      window.setTimeout(function() {
        if (hr) {
          comic.parentElement.insertBefore(document.createElement('hr'), comic.nextSibling);
          comic.parentElement.insertBefore(document.createElement('hr'), comic);
        }
        if (title_text) {
          var title = document.createElement('p');
          var title_content;
          if (!comic.firstElementChild.hasAttribute('title')) {
            title_content = comic.firstElementChild;
            if (!title_content.firstElementChild || !title_content.firstElementChild.hasAttribute('title')) {
              return;
            }
            title_content = title_content.firstElementChild;
          } else {
            if (comic.firstElementChild.nodeName.toLowerCase() === 'iframe' && 'hasAttribute' in comic.firstElementChild.nextElementSibling && comic.firstElementChild.nextElementSibling.hasAttribute('title')) {
              comic.firstElementChild.removeAttribute('title');
              title_content = comic.firstElementChild.nextElementSibling;
            } else {
              title_content = comic.firstElementChild;
            }
          }
          title.textContent = title_content.title;
          title.style = 'font-variant:normal;padding-left:80px;padding-right:80px;font-size:20px';
          comic.parentElement.insertBefore(title, comic.nextSibling);
          title_content.removeAttribute('title');
        }
      }, 0);
      return true;
    });

    if (explain_button) {
      var link = document.createElement('a');
      link.href = 'http://www.explainxkcd.com/' + number + '/';
      link.style =
        'font-family:xkcd-Regular;font-variant:normal;margin-left:5px;display:inline-block;font-size:20px;padding:0px 5px 5px';
      link.textContent = 'Explain!';

      var nav = document.createElement('ul');
      nav.className = 'comicNav';
      nav.style.marginBottom = 0;
      nav.appendChild(document.createElement('li'));
      nav.firstChild.appendChild(link);

      var old_nav = document.getElementsByClassName('comicNav')[1];
      old_nav.parentElement.insertBefore(nav, old_nav.nextSibling);
    }

    document.addEventListener('keydown', function(event) {
      if (is_editable(document.activeElement)) {
        return;
      }
      var e = event || window.event || {};
      var key_code = e.which || e.charCode || e.keyCode;
      if (number === 1608 && document.activeElement.id === 'explore' && (key_code === key_codes.right || key_code === key_codes.left)) {
        return;
      }
      var node;
      if (key_code === key_codes.right || key_code === key_codes.n) {
        node = document.querySelector('[rel="next"]');
      } else if (key_code === key_codes.left || key_code === key_codes.p) {
        node = document.querySelector('[rel="prev"]');
      } else if (key_code === key_codes.r) {
        window.location.href = '//c.xkcd.com/random/comic/';
      }
      if (node) {
        node.click();
      }
    }, true);
    if (transcript) {
      var info;
      if (1662 >= number && number >= 1609) {
        info = '/' + (number + 2) + '/info.0.json';
      } else if ( /* 1677 >= number && */ number >= 1663) {
        info = '/' + (number + 3) + '/info.0.json';
      } else {
        info = 'info.0.json';
      }

      var others = new window.RegExp('\\s*(?:' + [
        "{{It's commonly known that too much perspective can be a downer.}}",
        '{{They are six-legged spiders}}',
        "{{I don't want to talk about it}}",
        '{{No more, no less}}',
        '{{Love and circuit analysis, hand in hand at last.}}',
        '{{Medium: Pencil on paper}}',
        '{{Mouseover text: "..."}}',
        "{{It's science!}}",
        "{{alt: I always wanted to impress them with how well I could hear, didn't you? Also, this sets the record for number of awkward-pause panels in one strip (previously held by Achewood)]]",
        "{{Your IDE's color may vary.}}",
        "alt-text: And she's gonna feel like a jerk when she realizes it was actually Under Pressure.",
        '{{alt text: Also, I hear the 4th root of (9^2 + 19^2\n22) is pi.',
        '{[title text: A tribute to Buttercup Festival.}}',
        "[[Alt text: If you're interested in the subject, Lawrence Lessig's 'Free Culture' is pretty good]]",
        "{{Mouseover text:  James suggested this, and I'd have to agree.  It'd be much worse.}}"
      ].map(
        function(s) {
          return s.replace(/[.^$*+?()[{\\|\-\]]/g, (function(m) { return '\\' + m; }));
        }).join('|') + ')\\s*$');

      xhr(info).then(function(i) {
        var response;
        try {
          response = window.JSON.parse(i);
        } catch (e) {
          return;
        }
        if (!response || !response.transcript) {
          return;
        }
        var node = document.createElement('p');
        node.innerHTML = response.transcript
          .replace(/^\s*{{\s*(?:title|alt|tag)[ -]?(?:text|title)?:[^}]*}}?\s*/i,  '')
          .replace( /\s*{{\s*(?:title|alt|tag)[ -]?(?:text|title)?:[^}]*}}?\s*$/i, '')
          .replace(others, '').replace(/&/g, '&amp;').replace(/"/g, '&quot;')
          .replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
          .replace(/\n/g, '<br style="display: block; margin: 3px 0;">');
        node.style =
          'font-variant:normal;padding-left:80px;padding-right:80px;font-size:14px;text-align:left;white-space:pre-wrap';
        var ul = document.getElementsByTagName('ul');
        ul = ul[ul.length - 1];
        var parent = ul.parentElement;
        ul = ul.nextSibling;
        if (hr) {
          parent.insertBefore(document.createElement('hr'), ul);
        }
        parent.insertBefore(node, ul);
        if (hr) {
          parent.insertBefore(document.createElement('hr'), ul);
        }
      });
    }
  }

  if (/(?:^\?|&)tweaks=(?:false|f|0|)(?:&|$)/i.test(window.location.search)) {
    return;
  }

  var location = window.location.href;
  var new_location = location.toLowerCase()
    .replace(/^(?:https?:)?(?:\/\/)?(?:www\.)?/, 'https://')
    .replace(/^https?:\/\/whatif/, 'https://what-if')
    .replace(/\/#$/, '/')
    .replace(/^(https:\/\/(?:what-if\.)?xkcd\.com\/\d+)$/, '$1/');
  if (new_location !== location) {
    window.location.replace(new_location);
  }

  document.addEventListener('DOMContentLoaded', main, true);
  window.addEventListener('load', main, true);
  if (document.readyState !== 'loading') {
    main();
  }

})(this, this.document);
