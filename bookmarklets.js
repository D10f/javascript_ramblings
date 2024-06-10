/**
 *  Replaces all references to Youtube, including link href attributes, and
 *  replaces them with invidious links.
 */
javascript: (function () {
  document.body.innerHTML = document.body.innerHTML.replace(
    /youtu(\.)?be(.com)?/gi,
    "invidious.snopyta.org",
  );
})();

/**
 * Opens a new tab to the search engine of choice, and search for the
 * highlighted text on the current page.
 */
javascript: (function () {
  const selection = window.getSelection().toString();
  const searchEngine = "https://qwant.com?q=define: ";
  const queryStr = decodeURIComponent(selection.replace(/\s+/, "+"));
  window.open(searchEngine + queryStr, "_blank").focus();
})();
