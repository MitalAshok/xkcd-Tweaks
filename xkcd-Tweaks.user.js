// ==UserScript==
// @name          xkcd Tweaks
// @description   Some tweaks to xkcd.com and what-if.xkcd.com
// @include       /^(https?:)?(\/\/)?(www\.)?(what-?if\.)?xkcd\.com/
// @author        Mital Ashok
// @icon          data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABX0lEQVRYhcWVMZIEIQhFOYrhHM8baGjoEbyRYYcehY2cchXwt7O9Q1VXzQDKAxSJiPjLH/G3xARwzi20zrnnAaTAT4GIAGjvJAkhLH4hBBxgzl5ZIFbBqpxWsQXAyk4CQYJbEH8GcNo2EQAVC2CU1to9gE8rIJW6t2gLoDlKC8dAyPWEAOZslAWLDYWGAE5ONBFxa00N3s8BBGCBbO6z2f/bAPPmiM/H11AjtzL03sMA3nsM4M5YfQRgLJn2WxK09CZAz75nOm4y206rpgJIAeYsJJ9T6AVAGzKW7hR6AZDKNZZV0xsb/9IZoPIB211DLbgGPdpEgFlmoN2JZmautS7QtVbVfzsHXq/XorNevJQSExGXUriUwkTEKaX7AJ3+ui5Rv9mQY4wcYzybA1YgFGD+r7UBGkSorWecc37rcs5mG0SAu1nO+nHej+/EvwGgehFgvD47AHQdYMOe0qe+Hzm8hknb8QYpAAAAAElFTkSuQmCC
// @namespace     https://greasyfork.org/en/users/59570-mital-ashok
// @license       MIT License
// @version       3.0.0
// @grant         none
// @require       https://raw.githubusercontent.com/stefanpenner/es6-promise/master/dist/es6-promise.auto.min.js
// @updateurl     https://mitalashok.github.io/xkcd-Tweaks.user.js
// @noframes
// @run-at        document-start
// ==/UserScript==

(function(window, document, Array, undefined) {'use strict';

  // ==Settings==

  var border = true;
  var hr = true;
  var title_text = true;
  var snap = false;
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
        Array.prototype.forEach.call(node_list, function(node) {
          node.style = 'visibility:hidden;cursor:default';
          node.removeAttribute('href');
          node.parentElement.style = 'user-select:none;-moz-user-select:none;-webkit-user-select:none';
        });
        return Array.prototype.every.call(node_list, function(node) {
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
      return new window.Promise(function (resolve, reject) {
        var resolved = false;
        var x = new window.XMLHttpRequest();
        x.onreadystatechange = function () {
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
            reject(new Error('Timeout'));
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
        repeat(100, function () {
          head_anchor.removeAttribute('href');
          head_anchor.style.textDecoration = 'underline';
          return !head_anchor.hasAttribute('href') && head_anchor.style.textDecoration === 'underline';
        });
      }
      var is_first;
      var is_last;
      Array.prototype.forEach.call(document.getElementsByTagName('a'), function(a) {
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
          a.appendChild(document.createTextNode('First'));
          a.href = '/1/';
          first_tag.appendChild(a);
          first_tag.className = 'nav-prev';
          ul.insertBefore(first_tag, ul.firstChild);
        }
        if (!is_last) {
          var last_tag = document.createElement('li');
          a = document.createElement('a');
          a.appendChild(document.createTextNode('Last'));
          a.href = '/';
          last_tag.appendChild(a);
          last_tag.className = 'nav-next';
          ul.insertBefore(last_tag, ul.lastElementChild);
        }
        Array.prototype.forEach.call(ul.children, function(li) {
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
          a.href = decodeURIComponent('%6A%61%76%61%73%63%72%69%70%74%3A') + encodeURIComponent(
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
          Array.prototype.forEach.call(document.getElementsByTagName('a'), function(a) {
            if (a.firstChild !== null && a.firstChild.textContent === 'Next') {
              a.click();
            }
          });
          return;
          case key_codes.left: case key_codes.p:
          if (is_last) return;
          Array.prototype.forEach.call(document.getElementsByTagName('a'), function (a) {
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
      });
      Array.prototype.forEach.call(document.getElementsByTagName('img'), function(img) {
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
            title.appendChild(document.createTextNode(img.title));
            title.style = 'text-align:center;padding-left:5em;padding-right:5em;padding-top:0;font-size:85%';
            title.style.paddingBottom = oldPadding;
            img.parentElement.insertBefore(title, img.nextSibling);
            img.removeAttribute('title');
          }
        }
      });
      return;
    }
    if (window.location.pathname === '/404/' || window.location.pathname === '/404') {
      var slash = window.location.pathname === '/404' ? '/' : '';
      document.documentElement.innerHTML =
        "<!DOCTYPE html>\n<html>\n<head>\n<link rel=\"stylesheet\" type=\"text/css\" href=\"/s/b0dcca.css\" title=\"Default\"/>\n<title>xkcd: Not Found</title>\n<meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\"/>\n<link rel=\"shortcut icon\" href=\"/s/919f27.ico\" type=\"image/x-icon\"/>\n<link rel=\"icon\" href=\"/s/919f27.ico\" type=\"image/x-icon\"/>\n<link rel=\"alternate\" type=\"application/atom+xml\" title=\"Atom 1.0\" href=\"/atom.xml\"/>\n<link rel=\"alternate\" type=\"application/rss+xml\" title=\"RSS 2.0\" href=\"/rss.xml\"/>\n<script>\n(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){\n(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),\nm=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)\n})(window,document,'script','//www.google-analytics.com/analytics.js','ga');\n\nga('create', 'UA-25700708-7', 'auto');\nga('send', 'pageview');\n</script>\n<script type=\"text/javascript\" src=\"//xkcd.com/1350/jquery.min.js\"></script>\n<script type=\"text/javascript\" src=\"//xkcd.com/static/json2.js\"></script>\n\n</head>\n<body>\n<div id=\"topContainer\">\n<div id=\"topLeft\">\n<ul>\n<li><a href=\"/archive\">Archive</a></li>\n<li><a href=\"http://what-if.xkcd.com\">What If?</a></li>\n<li><a href=\"http://blag.xkcd.com\">Blag</a></li>\n<li><a href=\"http://store.xkcd.com/\">Store</a></li>\n<li><a rel=\"author\" href=\"/about\">About</a></li>\n</ul>\n</div>\n<div id=\"topRight\">\n<div id=\"masthead\">\n<span><a href=\"/\"><img src=\"//imgs.xkcd.com/static/terrible_small_logo.png\" alt=\"xkcd.com logo\" height=\"83\" width=\"185\"/></a></span>\n<span id=\"slogan\">A webcomic of romance,<br/> sarcasm, math, and language.</span>\n</div>\n<div id=\"news\">\nxkcd updates every Monday, Wednesday, and Friday.\n<script>\nmu = window.location.href.split(\"#\")[1]\nif(/([0-9a-b]+-)[4][0-9a-b]+/.test(mu)) { window.location.href = \"http://xkcd.com/1663/#\"+mu }\n</script>\n\n\n</div>\n</div>\n<div id=\"bgLeft\" class=\"bg box\"></div>\n<div id=\"bgRight\" class=\"bg box\"></div>\n</div>\n<div id=\"middleContainer\" class=\"box\">\n\n<div id=\"ctitle\">Not Found</div>\n<ul class=\"comicNav\">\n<li><a href=\"/1/\">|&lt;</a></li>\n<li><a rel=\"prev\" href=\"/403/\" accesskey=\"p\">&lt; Prev</a></li>\n<li><a href=\"//c.xkcd.com/random/comic/\">Random</a></li>\n<li><a rel=\"next\" href=\"/405/\" accesskey=\"n\">Next &gt;</a></li>\n<li><a href=\"/\">&gt;|</a></li>\n</ul>\n<div id=\"comic\">\n<iframe title=\"April Fools! (This page was created by xkcd tweaks. It would normally be a HTTP 404 error page.)\" style=\"border: 1px solid gray; outline: 1px solid black; margin-top: 1px; width: 296px; height: 296px;\" src=\"/404" + slash + "\" height=\"296\" width=\"296\"><h1 style=\"text-align: left; font-size: 2em; font-variant: normal; font-family: Times New Roman; font-weight: bold;\">404 - Not Found</h1></iframe><div style=\"width: 300px; height: 300px; position: absolute; left: 240px; margin-top: -299px;\" title=\"April Fools! (This page was created by xkcd tweaks. It would normally be a HTTP 404 error page.)\"></div>\n</div>\n<ul class=\"comicNav\">\n<li><a href=\"/1/\">|&lt;</a></li>\n<li><a rel=\"prev\" href=\"/403/\" accesskey=\"p\">&lt; Prev</a></li>\n<li><a href=\"//c.xkcd.com/random/comic/\">Random</a></li>\n<li><a rel=\"next\" href=\"/405/\" accesskey=\"n\">Next &gt;</a></li>\n<li><a href=\"/\">&gt;|</a></li>\n</ul>\n<br />\nPermanent link to this comic: http://xkcd.com/404/<br />\nImage URL (for hotlinking/embedding): http://imgs.xkcd.com/comics/\n<div id=\"transcript\" style=\"display: none\">[[A couple sit at the small table of a cafe.  The woman holds up a graph.]]\nWoman: We&#39;re a terrible match.  But if we sleep together, it&#39;ll make the local hookup network a symmetric graph.\nMan: I can&#39;t argue with that.\n{{Title text: Check it out; I&#39;ve had sex with someone who&#39;s had sex with someone who&#39;s written a paper with Paul Erd\xC5\x91s!}}</div>\n</div>\n<div id=\"bottom\" class=\"box\">\n<img src=\"//imgs.xkcd.com/s/a899e84.jpg\" width=\"520\" height=\"100\" alt=\"Selected Comics\" usemap=\"#comicmap\"/>\n<map id=\"comicmap\" name=\"comicmap\">\n<area shape=\"rect\" coords=\"0,0,100,100\" href=\"/150/\" alt=\"Grownups\"/>\n<area shape=\"rect\" coords=\"104,0,204,100\" href=\"/730/\" alt=\"Circuit Diagram\"/>\n<area shape=\"rect\" coords=\"208,0,308,100\" href=\"/162/\" alt=\"Angular Momentum\"/>\n<area shape=\"rect\" coords=\"312,0,412,100\" href=\"/688/\" alt=\"Self-Description\"/>\n<area shape=\"rect\" coords=\"416,0,520,100\" href=\"/556/\" alt=\"Alternative Energy Revolution\"/>\n</map>\n<div>\n<!--\nSearch comic titles and transcripts:\n<script type=\"text/javascript\" src=\"//www.google.com/jsapi\"></script>\n<script type=\"text/javascript\">google.load('search', '1');google.setOnLoadCallback(function() {google.search.CustomSearchControl.attachAutoCompletion('012652707207066138651:zudjtuwe28q',document.getElementById('q'),'cse-search-box');});</script>\n<form action=\"//www.google.com/cse\" id=\"cse-search-box\">\n<div>\n<input type=\"hidden\" name=\"cx\" value=\"012652707207066138651:zudjtuwe28q\"/>\n<input type=\"hidden\" name=\"ie\" value=\"UTF-8\"/>\n<input type=\"text\" name=\"q\" id=\"q\" size=\"31\"/>\n<input type=\"submit\" name=\"sa\" value=\"Search\"/>\n</div>\n</form>\n<script type=\"text/javascript\" src=\"//www.google.com/cse/brand?form=cse-search-box&amp;lang=en\"></script>\n-->\n<a href=\"/rss.xml\">RSS Feed</a> - <a href=\"/atom.xml\">Atom Feed</a>\n</div>\n<br />\n<div id=\"comicLinks\">\nComics I enjoy:<br/>\n        <a href=\"http://threewordphrase.com/\">Three Word Phrase</a>,\n        <a href=\"http://www.smbc-comics.com/\">SMBC</a>,\n        <a href=\"http://www.qwantz.com\">Dinosaur Comics</a>,\n        <a href=\"http://oglaf.com/\">Oglaf</a> (nsfw),\n        <a href=\"http://www.asofterworld.com\">A Softer World</a>,\n        <a href=\"http://buttersafe.com/\">Buttersafe</a>,\n        <a href=\"http://pbfcomics.com/\">Perry Bible Fellowship</a>,\n        <a href=\"http://questionablecontent.net/\">Questionable Content</a>,\n        <a href=\"http://www.buttercupfestival.com/\">Buttercup Festival</a>,\n        <a href=\"http://www.mspaintadventures.com/?s=6&p=001901\">Homestuck</a>,\n\t<a href=\"http://www.jspowerhour.com/\">Junior Scientist Power Hour</a>\n</div>\n<p>Warning: this comic occasionally contains strong language (which may be unsuitable for children), unusual humor (which may be unsuitable for adults), and advanced mathematics (which may be unsuitable for liberal-arts majors).</p>\n<div id=\"footnote\">BTC 1FhCLQK2ZXtCUQDtG98p6fVH7S6mxAsEey<br />We did not invent the algorithm. The algorithm consistently finds Jesus. The algorithm killed Jeeves. <br/>The algorithm is banned in China. The algorithm is from Jersey. The algorithm constantly finds Jesus.<br/>This is not the algorithm. This is close.</div>\n<div id=\"licenseText\">\n<p>\nThis work is licensed under a\n<a href=\"http://creativecommons.org/licenses/by-nc/2.5/\">Creative Commons Attribution-NonCommercial 2.5 License</a>.\n</p><p>\nThis means you're free to copy and share these comics (but not to sell them). <a rel=\"license\" href=\"/license.html\">More details</a>.</p>\n</div>\n</div>\n</body>\n<!-- Layout by Ian Clasbey, davean, and chromakode -->\n</html>\n\n";
    }
    var comic = document.getElementById('comic');
    if (!comic) {
      return;
    }
    if (snap) {
      var get_top = function() {
        return ((document.getElementById('middleContainer') || {}).offsetTop || 173) + 6;
      };
      window.scrollTo(0, get_top());
      var scroll_interval_id = null;
      window.addEventListener('scroll', function() {
        var scroll_position = document.documentElement.scrollTop || document.body.scrollTop;
        var top = get_top();
        if (scroll_position > top - 145 && top + 10 > scroll_position) {
          if (scroll_interval_id === null && scroll_position !== top) {
            scroll_interval_id = window.setInterval(function() {
              if (scroll_position > top - 145 && top + 10 > scroll_position) {
                window.scrollTo(0, top);
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
      });
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
    repeat(100, function () {
      next_buttons = Array.prototype.slice.call(document.querySelectorAll('[rel="next"], [href="/"]'), 1);
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

    repeat(1000, function () {
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
            if (!title_content.firstElementChild.hasAttribute('title')) {
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
          title.appendChild.innerText = title_content.title;
          title.style =  'font-variant:normal;padding-left:80px;padding-right:80px;font-size:20px';
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
      link.appendChild(document.createTextNode('Explain!'));

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
      var key_code = event.keyCode;
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
    });
    if (transcript) {
      var info;
      if (1662 >= number && number >= 1609) {
        info = '/' + (number + 2) + '/info.0.json';
      } else if ( /* 1677 >= number && */ number >= 1663) {
        info = '/' + (number + 3) + '/info.0.json';
      } else {
        info = 'info.0.json';
      }

      var others/* = new window.RegExp('\\s*(?:' + [
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
        }).join('|') + ')\\s*$')*/;
      others = /\s*(?:\{\{It's commonly known that too much perspective can be a downer\.}}|\{\{They are six\-legged spiders}}|\{\{I don't want to talk about it}}|\{\{No more, no less}}|\{\{Love and circuit analysis, hand in hand at last\.}}|\{\{Medium: Pencil on paper}}|\{\{Mouseover text: "\.\.\."}}|\{\{It's science!}}|\{\{alt: I always wanted to impress them with how well I could hear, didn't you\? Also, this sets the record for number of awkward\-pause panels in one strip \(previously held by Achewood\)\]\]|\{\{Your IDE's color may vary\.}}|alt\-text: And she's gonna feel like a jerk when she realizes it was actually Under Pressure\.|\{\{alt text: Also, I hear the 4th root of \(9\^2 \+ 19\^2\n22\) is pi\.|\{\[title text: A tribute to Buttercup Festival\.}}|\[\[Alt text: If you're interested in the subject, Lawrence Lessig's 'Free Culture' is pretty good\]\]|\{\{Mouseover text:  James suggested this, and I'd have to agree\.  It'd be much worse\.}})\s*$/;
      // `others` compiled from above.

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

  var new_location = window.location.href.toLowerCase()
    .replace(/^(?:http(s?):)?(?:\/\/)?(?:www\.)?/, 'http$1://')
    .replace(/^https?:\/\/whatif/, 'https://what-if')
    .replace(/^https:\/\/xkcd\.com\/1663/, 'http://xkcd.com/1663')
    .replace(/\/#$/, '/')
    .replace(/^https\/\/(what-if\.)?xkcd\.com\/\d+$/);
  if (new_location !== window.location.href) {
    window.location.replace(new_location);
  }

  document.addEventListener('DOMContentLoaded', main);
  window.addEventListener('load', main);
  if (document.readyState !== 'loading') {
    main();
  }

})(window, window.document, window.Array);
