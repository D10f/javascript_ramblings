/**
 *  Replaces all references to Youtube, including link href attributes, and
 *  replaces them with invidious links.
 */

javascript:
(function() {
  document.body.innerHTML =
  document.body.innerHTML.replace(
    /youtu(\.)?be(.com)?/ig,
    'invidious.snopyta.org'
  )
})()
