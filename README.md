# xkcd Tweaks

xkcd Tweaks is a script that changes some little things that annoyed me. Made in an afternoon. Thought I would share.

Tested and works perfectly with Firefox 48.0*
Mostly tested and probably works fine with Chrome 52.0*
(Nothing else tested)
<small><small>*Latest as of 2016-08-10</small></small>

<h2><a href="https://xkcd.com/">xkcd.com</a> Tweaks</h2>
- Added the title text below comic and removed from hovering over comic (Disable with `titleText = false`)
- Added the (normally hidden) transcript below the comic (Disable with `transcript = false`)
- Added <kbd>Explain!</kbd> which links to the comic on <a href="http://www.explainxkcd.com/">www.explainxkcd.com</a> (Disable with `explainButton = false`)
- Added a hr (horizontal rule) above and below comic (Disable with `hr = false`)
- Removed <kbd>Next &gt;</kbd> and <kbd>&gt;|</kbd> when on latest comic (as they don't do anything anyways)
- Removed <kbd>&lt; Prev</kbd> and <kbd>|&lt;</kbd> when on first comic (likewise)
- Added <a href="https://xkcd.com/404/">xkcd.com/404/</a>.
- Made scrolling snap to the top of the comic (below info bar) after half a second. It doesn't work well in Chrome. Enable with `snap = true`. (Default `false`)
- Added some keyboard shortcuts.
  - <kbd>←</kbd> (Left arrow) and <kbd>p</kbd> go to the previous comic.
  - <kbd>→</kbd> (Right arrow) and <kbd>n</kbd> go to the next comic.
  - <kbd>r</kbd> goes to a random comic.

<h2><a href="https://what-if.xkcd.com/">what-if.xkcd.com</a> Tweaks</h2>
- If you are on 'whatif.xkcd.com', you are redirected to 'what_-_if.xkcd.com'.
- Added a semi-transparant 2 pixel grey border around images (Disable with `border = false`)
- Added the title text below images and removed from hovering over comic (Disable with `titleText = false`)
- Added a <kbd>First</kbd> button on all but the first article (where it would go nowhere) that links to the first article.
- Likewise for <kbd>Last</kbd>.
- Added a <kbd>Random</kbd> button that goes to a random article.
- Added some keyboard shortcuts.
  - <kbd>←</kbd> (Left arrow) and <kbd>p</kbd> go to the previous article.
  - <kbd>→</kbd> (Right arrow) and <kbd>n</kbd> go to the next article.
  - <kbd>r</kbd> goes to a random article.


Note: To edit variables after you have installed the script with GreaseMonkey on Firefox, go to '<a href="about:addons">about:addons</a>' (Or do <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>a</kbd>), go to the 'User Scripts' tab, click <kbd>Options</kbd> and then 'Edit this User Script'.

_If you are having issues, start a discussion here (GreasyFork)._

<small><small><small><small><small>
<a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/"><img alt="Creative Commons Licence" style="border-width:0" src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png" /></a></small></small></small><br /><span xmlns:dct="http://purl.org/dc/terms/" href="http://purl.org/dc/dcmitype/Text" property="dct:title" rel="dct:type">xkcd Tweaks</span> by <a xmlns:cc="http://creativecommons.org/ns#" href="https://greasyfork.org/en/users/59570-mital-ashok" property="cc:attributionName" rel="cc:attributionURL">Mital Ashok</a> is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/">Creative Commons Attribution-ShareAlike 4.0 International License</a>.
<a rel="icon" href="https://xkcd.com/s/919f27.ico">Icon image</a>, <a rel="xkcd" href="https://xkcd.com/">xkcd</a> and <a rel="what-if" href="https://what-if.xkcd.com/">What If?</a> by <a rel="blog" href="https://blog.xkcd.com/author/randallpmunroe/">Randall P. Munroe</a> are used under <a rel="iconlicense" href="https://creativecommons.org/licenses/by-nc/2.5/">CC BY-NC 2.5<a> / Icon reencoded as .png base 64 data URI (`data:image/png;base64,...`).
</small></small>
