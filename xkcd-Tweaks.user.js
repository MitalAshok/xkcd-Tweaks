// ==UserScript==
// @name          xkcd Tweaks
// @description   Some tweaks to xkcd.com and what-if.xkcd.com
// @include       /^(https?:)?(\/\/)?(www\.)?(what-?if\.)?xkcd\.com/
// @author        Mital Ashok
// @icon          data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABX0lEQVRYhcWVMZIEIQhFOYrhHM8baGjoEbyRYYcehY2cchXwt7O9Q1VXzQDKAxSJiPjLH/G3xARwzi20zrnnAaTAT4GIAGjvJAkhLH4hBBxgzl5ZIFbBqpxWsQXAyk4CQYJbEH8GcNo2EQAVC2CU1to9gE8rIJW6t2gLoDlKC8dAyPWEAOZslAWLDYWGAE5ONBFxa00N3s8BBGCBbO6z2f/bAPPmiM/H11AjtzL03sMA3nsM4M5YfQRgLJn2WxK09CZAz75nOm4y206rpgJIAeYsJJ9T6AVAGzKW7hR6AZDKNZZV0xsb/9IZoPIB211DLbgGPdpEgFlmoN2JZmautS7QtVbVfzsHXq/XorNevJQSExGXUriUwkTEKaX7AJ3+ui5Rv9mQY4wcYzybA1YgFGD+r7UBGkSorWecc37rcs5mG0SAu1nO+nHej+/EvwGgehFgvD47AHQdYMOe0qe+Hzm8hknb8QYpAAAAAElFTkSuQmCC
// @namespace     https://greasyfork.org/en/users/59570-mital-ashok
// @license       MIT License
// @version       2.0.0
// @grant         none
// @noframes
// @run-at        document-start
// ==/UserScript==

var border = true,
  hr = true,
  titleText = true,
  snap = false,
  explainButton = true,
  transcript = true;


if (/(?:^\?|&)tweaks=(?:false|f|0|)(?:&|$)/i.test(window.location.search)) {
  throw new Error('xkcd Tweaks off');
}

var time = new Date().getTime(),
  redirect, location_, lastNumber, xhttp, expired,
  localLatest, inner, number, random, main;


if (/^\/?(?:\d+\/)?random\/?/.test(window.location.pathname)) {
  localLatest = localStorage.latestComic;
  if (typeof localLatest === 'undefined') {
    expired = true;
  } else {
    expired = localLatest[1] <= time;
  }
  var next = function () {
    number = +window.location.pathname.match(/^\/?(\d+\/)?random\/?$/)[1];
    if (!isNaN(number)) {
      lastNumber--;
    }
    random = Math.floor(Math.random() * lastNumber) + 1;
    if (random >= number) {
      random++;
    }
    redirect = window.location.origin + '/' + random + '/';
    inner = '<!DOCTYPE HTML><html><head><meta charset="UTF-8"><meta http-equiv="refresh" content="0;url=' + redirect + '"><script type="text/javascript">window.location.href = "' + redirect + '"</script><title>Redirecting to /' + random + '/ ...</title></head><body>If you are not redirected automatically, follow the <a href="' + redirect + '">link to /' + random + '/</a>.</body></html>';
    window.addEventListener('load', function () {
      window.location.pathname = '/' + random + '/';
      document.documentElement.innerHTML = inner;
    });
    window.location.pathname = '/' + random + '/';
    document.documentElement.innerHTML = inner;
    setTimeout(function () {
      window.location.pathname = '/' + random + '/';
      document.documentElement.innerHTML = inner;
    }, 500);
  };
  if (expired) {
    xhttp = new XMLHttpRequest();
    xhttp.open('get', '/', true);
    xhttp.onreadystatechange = function () {
      if (xhttp.readyState == XMLHttpRequest.DONE) {
        lastNumber = +xhttp.response.match(
          /<a href="\/\/what-if\.xkcd\.com\/(\d+)\/"><h1>/)[1];
        localStorage.latestComic = lastNumber + ',' + (time + 6.048e+8);
        next();
      }
    };
    xhttp.send();
  } else {
    lastNumber = localLatest.split(',')[0];
    next();
  }

} else {
  if (/^\/?\d+(?!\/)$/.test(window.location.pathname)) {
    window.location.pathname += '/';
  }
  location_ = window.location.href.toLowerCase()
    .replace(/^(?:http(s?):)?(?:\/\/)?(?:www\.)?/, 'http$1://')
    .replace(/^https?:\/\/whatif/, 'https://what-if')
    .replace(/^https:\/\/xkcd\.com\/1663/, 'http://xkcd.com/1663')
    .replace(/\/#$/, '/');
  if (location_ !== window.location.href) {
    window.location.replace(location_);
  }

  if (document.readyState === 'loading') {
    window.addEventListener('load', main);
  } else {
    main();
  }
}

function main() {

  function repeat(interval, func, onCompletion) {
    if (typeof onCompletion === 'undefined') {
      onCompletion = function () {};
    }
    if (func()) {
      onCompletion();
      return;
    }
    var intervalId = setInterval(function () {
      if (func()) {
        clearInterval(intervalId);
        onCompletion();
      }
    }, interval);
  }

  function disable(nodeList) {
    return function disable() {
      Array.prototype.forEach.call(nodeList, function (currentValue) {
        currentValue.style = 'visibility:hidden;cursor:default';
        currentValue.removeAttribute('href');
        currentValue.parentElement.style =
          'user-select:none;-moz-user-select:none;-webkit-user-select:none';
      });
      return Array.prototype.every.call(nodeList, function (currentValue) {
        return currentValue.style.visibility === 'hidden' &&
          !currentValue.hasAttribute('href') &&
          currentValue.style.cursor === 'default';
      });
    };
  }

  function activeIsEditable() {
    var node = document.activeElement;
    var name = node.nodeName.toLowerCase();
    return node.isContentEditable || node.nodeType == 1 && (name == "textarea" ||
      name == "input" && /^(?:text|email|number|search|tel|url|password|)$/i.test(node.type)
    );
  }

  var isWhatIf = /^(https?:)?(\/\/)?(www\.)?what-if/i.test(window.location.href),
    number, first, last, left = 37, right = 39, n = 78, p = 80, r = 82;

  if (isWhatIf) {
    last = false;
    var setRandom = function (create) {
        if (!receivedResponse.received) {
          if (receivedResponse.onreceive !== false) {
            receivedResponse.onreceive = !!create;
          }
          return;
        }
        if (create) {
          var addRandom = function (ulTag) {
            var liTag = document.createElement('li'),
              aTag = document.createElement('a');
            aTag.href = './random/';
            aTag.className = 'random-button';
            aTag.appendChild(document.createTextNode('Random'));
            liTag.appendChild(aTag);
            if (last) {
              ulTag.insertBefore(liTag, ulTag.lastChild);
            } else {
              ulTag.insertBefore(liTag, ulTag.lastChild.previousSibling);
            }
            if (first) {
              liTag.style.marginLeft = '8.57552em';
            }
          };
          navs = document.getElementsByClassName('main-nav');
          addRandom(navs[0].firstElementChild);
          addRandom(navs[1].firstElementChild);
        } else {
          window.location.pathname = number + '/random/';
        }
      },
      receivedResponse = {
        'received': false,
        'onreceive': null
      },
      navs, addButtons, expired;

    localLatest = localStorage.latestComic;
    if (typeof localLatest === 'undefined') {
      expired = true;
    } else {
      expired = localLatest[1] <= time;
    }
    if (expired) {
      xhttp = new XMLHttpRequest();
      xhttp.open('get', '/', true);
      xhttp.onreadystatechange = function () {
        if (xhttp.readyState == XMLHttpRequest.DONE) {
          lastNumber = +xhttp.response.match(
            /<a href="\/\/what-if\.xkcd\.com\/(\d+)\/"><h1>/)[1];
          receivedResponse.received = true;
          localStorage.latestComic = lastNumber + ',' + (time + 6.048e+8);
          if (receivedResponse.onreceive !== null) {
            setRandom(receivedResponse.onreceive);
          }
        }
      };
      xhttp.send();
    } else {
      lastNumber = localLatest.split(',')[0];
      receivedResponse.received = true;
    }

    document.addEventListener('keydown', function (event) {
      var keyCode = event.keyCode;
      if ((keyCode === right || keyCode === n) && !last) {
        Array.prototype.forEach.call(document.getElementsByTagName('a'), function (
          currentValue) {
          if (currentValue.firstChild !== null) {
            if (currentValue.firstChild.textContent === 'Next') {
              currentValue.click();
            }
          }
        });
      } else if ((keyCode === left || keyCode === p) && !first) {
        Array.prototype.forEach.call(document.getElementsByTagName('a'), function (
          currentValue) {
          if (currentValue.firstChild !== null) {
            if (currentValue.firstChild.textContent === 'Prev') {
              currentValue.click();
            }
          }
        });
      } else if (keyCode === r) {
        setRandom();
      }
    });

    var headATag = document.getElementsByTagName('h1')[0].parentElement;
    number = +headATag.getAttribute('href').slice(19, -1);

    first = true;
    last = true;
    Array.prototype.forEach.call(document.getElementsByTagName('a'), function (
      currentValue) {
      if (currentValue.firstChild) {
        if (currentValue.firstChild.textContent === 'Prev') {
          first = false;
        }
        if (currentValue.firstChild.textContent === 'Next') {
          last = false;
        }
      }
    });

    if (/^(https?:)?(\/\/)?(www\.)?what-if\.xkcd\.com\/\d+/i.test(window.location.href)) {
      repeat(100, function () {
        headATag.removeAttribute('href');
        headATag.style.textDecoration = 'underline';
        return !headATag.hasAttribute('href') && headATag.style.textDecoration ===
          'underline';
      });
    }
    setRandom(true);

    addButtons = function (navTag) {
      var ulTag = navTag.firstElementChild,
        aTag;
      navTag.style.width = '23.5em';
      if (!first) {
        var firstTag = document.createElement('li');
        aTag = document.createElement('a');
        aTag.appendChild(document.createTextNode('First'));
        aTag.href = '/1/';
        firstTag.appendChild(aTag);
        firstTag.className = 'nav-prev';
        ulTag.insertBefore(firstTag, ulTag.firstChild);
      }
      if (!last) {
        var lastTag = document.createElement('li');
        aTag = document.createElement('a');
        aTag.appendChild(document.createTextNode('Last'));
        aTag.href = '/';
        lastTag.appendChild(aTag);
        lastTag.className = 'nav-next';
        ulTag.insertBefore(lastTag, ulTag.lastElementChild);
      }
      Array.prototype.forEach.call(ulTag.children, function (currentValue) {
        if (currentValue.firstChild.firstChild.textContent !== 'Last') {
          currentValue.style.marginRight = '0.5em';
        }
      });
    };
    navs = document.getElementsByClassName('main-nav');
    addButtons(navs[0]);
    addButtons(navs[1]);


    Array.prototype.forEach.call(document.getElementsByTagName('img'), function (
      currentValue) {
      if (currentValue.hasAttribute('title')) {
        if (border) {
          currentValue.style.border = '2px solid rgba(127, 127, 127, 0.22)';
        }
        if (titleText) {
          currentValue.style.marginTop = currentValue.style.paddingTop;
          var oldPadding = currentValue.style.paddingBottom;
          currentValue.style.marginBottom = 0;
          currentValue.style.paddingTop = 0;
          currentValue.style.paddingBottom = 0;
          var title = document.createElement('p');
          title.appendChild(document.createTextNode(currentValue.title));
          title.style =
            'text-align:center;padding-left:5em;padding-right:5em;padding-top:0;font-size:85%';
          title.style.paddingBottom = oldPadding;
          currentValue.parentElement.insertBefore(title, currentValue.nextSibling);
          currentValue.removeAttribute('title');
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


  var comic = document.getElementById('comic'),
    title = document.createElement('p'),
    permaLinkTag = document.createElement('a'),
    previousButtons, nextButtons, intervalId, getTop, nav, link, oldNav, titleContent,
    permaLink, imgLink, imgLinkTag;
  first = last = false;

  if (!comic) {
    return;
  }
  if (snap) {
    getTop = function () {
      return document.getElementById('middleContainer').offsetTop + 6;
    };
    var tmp = document.createElement('style');
    tmp.innerHTML =
      "a,body{text-decoration:none}#topLeft a:hover,a:hover{text-decoration:underline}#topLeft,#topRight{text-align:left;position:relative}#comicLinks,#licenseText,#masthead{display:block}#footnote,body{font-variant:small-caps}body{background-color:#96A8C8;text-align:center;font-size:16px;font-family:Lucida,Helvetica,sans-serif;font-weight:500;position:absolute;left:50%;width:780px;margin-left:-390px}#ctitle,#slogan,#topLeft a,a{font-weight:800}a{color:#96A8C8}img{border:0}.box{background:#fff;border-style:solid;border-width:1.5px;border-color:#071419;border-radius:12px;-moz-border-radius:12px}#topContainer{width:780px;position:relative;overflow:hidden}#topLeft{width:166px;float:left;padding:17px}#topLeft ul{margin:0;list-style-type:none}#topLeft a{color:#282B30;font-size:21px}#bgLeft{float:left;left:0;width:200px;bottom:0;top:0}#topRight{width:560px;padding-top:15px;padding-bottom:15px;padding-left:15px;float:right;line-height:150%}#slogan{padding:20px;display:inline-block;font-size:20px;font-style:italic;line-height:120%;vertical-align:top}#bgRight{right:0;float:right;width:572px;bottom:0;top:0}.bg{position:absolute;z-index:-1}#middleContainer{width:780px;margin:5px auto;padding:10px 0}#ctitle{margin:10px;font-size:21px}ul.comicNav{padding:0;list-style-type:none}ul.comicNav li{display:inline}ul.comicNav li a{background-color:#6E7B91;color:#FFF;border:1.5px solid #333;font-size:16px;font-weight:600;padding:1.5px 12px;margin:0 4px;text-decoration:none;border-radius:3px;-moz-border-radius:3px;-webkit-border-radius:3px;box-shadow:0 0 5px 0 gray;-moz-box-shadow:0 0 5px 0 gray;-webkit-box-shadow:0 0 5px 0 gray}#footnote,.comicInfo{font-style:italic;font-weight:800}#comic table,#comicLinks{margin:auto}ul.comicNav a:focus,ul.comicNav a:hover{background-color:#FFF;color:#6E7B91;box-shadow:none;-moz-box-shadow:none;-webkit-box-shadow:none}.comicInfo{font-size:12px}#bottom{margin-top:5px;padding:25px 15px;width:750px}#comicLinks{width:300px}#footnote{clear:both;font-size:6px;margin:0;padding:0}#licenseText{margin:auto;width:410px}#transcript{display:none}#middleContainer{position:relative;left:50%;margin-left:-390px}#comic .comic,#comic .cover,#comic .panel,#comic .panel img{position:absolute}#comic .cover{z-index:10}@font-face{font-family:xkcd-Regular;src:url(//xkcd.com/fonts/xkcd-Regular.eot?) format('eot'),url(//xkcd.com/fonts/xkcd-Regular.otf) format('opentype')}";
    document.body.appendChild(tmp);
    window.scrollTo(0, getTop());
    document.body.removeChild(tmp);
    window.addEventListener('scroll', function () {
      var scrollPosition = document.documentElement.scrollTop || document.body.scrollTop,
        top_ = getTop();
      if (scrollPosition > top_ - 145 && top_ + 10 > scrollPosition) {
        if (intervalId === false && scrollPosition !== top_) {
          intervalId = setInterval(function () {
            if (scrollPosition > top_ - 145 && top_ + 10 > scrollPosition) {
              window.scrollTo(0, top_);
            }
            clearInterval(intervalId);
            intervalId = false;
          }, 500);
        }
      } else {
        clearInterval(intervalId);
        intervalId = false;
      }
    });
  }

  imgLink = document.getElementById('transcript').previousSibling;
  permaLink = imgLink.previousSibling.previousSibling;
  permaLinkTag.href = permaLink.textContent.slice(31).replace('http://', 'https://');
  permaLinkTag.style.fontWeight = 'initial';
  permaLinkTag.appendChild(document.createTextNode(permaLink.textContent.slice(31).replace('http://', 'https://')));
  permaLink.textContent = permaLink.textContent.slice(1, 31);
  permaLink.parentElement.insertBefore(permaLinkTag, permaLink.nextSibling);
  if (/comics\/\s*$/.test(imgLink.textContent)) {
    imgLink.parentElement.insertBefore(document.createElement('br'), imgLink);
    imgLink.parentElement.removeChild(imgLink);
  } else {
    imgLinkTag = document.createElement('a');
    imgLinkTag.style.fontWeight = 'initial';
    imgLinkTag.href = imgLink.textContent.slice(39, -1).replace('http://', 'https://');
    imgLinkTag.appendChild(document.createTextNode(imgLink.textContent.slice(39, -1).replace('http://', 'https://')));
    imgLink.textContent = imgLink.textContent.slice(1, 39);
    imgLink.parentElement.insertBefore(imgLinkTag, imgLink.nextSibling);
  }

  repeat(100, function () {
    nextButtons = Array.prototype.slice.call(document.querySelectorAll('[rel="next"], [href="/"]'), 1);
    previousButtons = document.querySelectorAll('[rel="prev"], [href="/1/"]');
    return nextButtons.length === 4 && previousButtons.length === 4;
  }, function () {
    if (previousButtons[1].getAttribute('href') === '#') {
      number = 1;
      first = true;
      repeat(100, disable(previousButtons));
    } else {
      number = +previousButtons[1].getAttribute('href').slice(1, -1) + 1;
      if (number === 404) {
        if (document.getElementById('ctitle').firstChild.textContent === 'Journal 3') {
          number++;
          previousButtons[1].href = '/404/';
          previousButtons[3].href = '/404/';
        } else {
          nextButtons[0].href = '/405/';
          nextButtons[2].href = '/405/';
        }
      } else if (number === 403) {
        nextButtons[0].href = '/404/';
        nextButtons[2].href = '/404/';
      } else if (nextButtons[0].getAttribute('href') === '#') {
        last = true;
        repeat(100, disable(nextButtons));
        document.querySelector('[href="/"]').removeAttribute('href');
      }
    }
  });

  repeat(1000, function () {
    if (comic.firstElementChild.tagName.toLowerCase() === 'script') {
      return false;
    }
    try {
      if (hr) {
        comic.parentElement.insertBefore(document.createElement('hr'), comic.nextSibling);
        comic.parentElement.insertBefore(document.createElement('hr'), comic);
      }
      if (titleText) {
        if (!comic.firstElementChild.hasAttribute('title')) {
          titleContent = comic.firstElementChild;
          if (!titleContent.firstElementChild.hasAttribute('title')) {
            return true;
          }
          titleContent = titleContent.firstElementChild;
        } else {
          if (comic.firstElementChild.nodeName.toLowerCase() === 'iframe' &&
            'hasAttribute' in comic.firstElementChild.nextElementSibling && comic.firstElementChild
            .nextElementSibling.hasAttribute('title')) {
            comic.firstElementChild.removeAttribute('title');
            titleContent = comic.firstElementChild.nextElementSibling;
          } else {
            titleContent = comic.firstElementChild;
          }
        }
        title.appendChild(document.createTextNode(titleContent.title));
        title.style =
          'font-variant:normal;padding-left:80px;padding-right:80px;font-size:20px';
        comic.parentElement.insertBefore(title, comic.nextSibling);
        titleContent.removeAttribute('title');
      }
      return true;
    } catch (e) {
      return true;
    }
  });

  if (explainButton) {
    link = document.createElement('a');
    link.href = 'http://www.explainxkcd.com/' + number + '/';
    link.style =
      'font-family:xkcd-Regular;font-variant:normal;margin-left:5px;display:inline-block;font-size:20px;padding:0px 5px 5px';
    link.appendChild(document.createTextNode('Explain!'));

    nav = document.createElement('ul');
    nav.className = 'comicNav';
    nav.style.marginBottom = 0;
    nav.appendChild(document.createElement('li'));
    nav.firstChild.appendChild(link);

    oldNav = document.getElementsByClassName('comicNav')[1];
    oldNav.parentElement.insertBefore(nav, oldNav.nextSibling);
  }

  document.addEventListener('keydown', function (event) {
    if (activeIsEditable()) {
      return;
    }
    var keyCode = event.keyCode;
    if (number === 1608 && document.activeElement.id === 'explore' && (keyCode ===
        right || keyCode === left)) {
      return;
    }
    if ((keyCode === right || keyCode === n) && !last) {
      nextButtons[0].click();
    } else if ((keyCode === left || keyCode === p) && !first) {
      previousButtons[1].click();
    } else if (keyCode === r) {
      document.querySelector('[href="//c.xkcd.com/random/comic/"]').click();
    }
  });

  if (transcript) {
    xhttp = new XMLHttpRequest();
    var info;
    if (1662 >= number && number >= 1609) {
      info = '/' + (number + 2) + '/info.0.json';
    } else if ( /* 1677 >= number && */ number >= 1663) {
      info = '/' + (number + 3) + '/info.0.json';
    } else {
      info = 'info.0.json';
    }
    xhttp.open('get', info, true);
    xhttp.onreadystatechange = function () {
      if (xhttp.readyState == XMLHttpRequest.DONE) {
        var response = JSON.parse(xhttp.response);
        if (response.transcript) {
          var node = document.createElement('p');

          node.innerHTML = response.transcript
            .replace(/^\s*{{(?:title|alt)(?:[ -]text)?:[^}]*}}\s*/i, '')
            .replace(/\s*{{(?:title|alt)(?:[ -]text)?:[^}]+}}\s*$/i, '')
            .replace(/\s*{{alt text: Also, I hear the 4th root of \(9\^2 \+ 19\^2\n22\) is pi\.\s*$/, '')
            .replace(/&/g, '&amp;').replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;').replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
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
        }
      }
    };
    xhttp.send();
  }
}
