/**
 *  Replaces all reference to Youtube, including link attributes, and replaces them with invidious links.
 */

javascript:
(function() {
  document.body.innerHTML =
  document.body.innerHTML.replace(
    /youtu(\.)?be(.com)?/ig,
    'invidious.snopyta.org'
  )
})()
