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

/**
 *  Replaces all references to Youtube, including link href attributes, and
 *  replaces them with invidious links.
 */
javascript: (async function () {
  const INVIDIOUS_JSON_API = "https://api.invidious.io/instances.json";
  const EU_REGIONS = ["AT", "CZ", "DE", "FI", "FR", "LU", "RO", "UA"];
  const NA_REGIONS = ["US"];
  const SA_REGIONS = ["CL"];
  const AS_REGIONS = ["IN", "JP"];
  const OC_REGIONS = ["AU", "NZ"];

  /**
   * Determines the algorithm used to select the invidious instance to use.
   *
   * - nearest: uses the client's region to determine the nearest instance.
   * - region:  uses the client's region to randomly select an instance from
   *            that region. This is best to distribute the load on the ser-
   *            vers.
   * - all:     randomly selects a random instance from all regions.
   */
  const INSTANCE_SELECTOR_ALGO = "region";

  /**
   * The algorithm used to determine the region of the client.
   *
   * - local:    uses the browser's Intl API locally.
   * - external: makes a network request to an external service.
   */
  const REGION_SELECTOR_ALGO = "local";

  switch (REGION_SELECTOR_ALGO) {
    case "local":
      const { timezone } = Intl.DateTimeFormat().resolvedOptions();
      break;
    case "external":
      throw new Error("Not implemented.");
      break;
    default:
      throw new Error("Unrecognized region selector algorithm.");
      break;
  }

  //const res = await fetch(INVIDIOUS_JSON_API);
  //const instances = await res.json();
})();
