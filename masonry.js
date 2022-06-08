/**
 * Creates a masonry layout out of a grid container. Does not handle any CSS
 * styling, only calculates and adjusts the items' position inside the grid.
 * @param {string} selector css selector to the grid container
 */
function masonryLayout(selector) {
  /** Select grid container */
  const grid = document.querySelector(selector);

  /** Select items in grid */
  const cells = Array.from(grid.children);

  /** Select grid properties */
  const columns = getComputedStyle(grid).gridTemplateColumns.split(" ");
  let rows = getComputedStyle(grid).gridTemplateRows.split(" ");

  /** No need for arrangements if there's only 1 column */
  if (columns.length === 1) {
    return;
  }

  cells.forEach((cell, idx) => {
    /** Force cell to be as high as the content it wraps around */
    cell.style.height = "max-content";

    /** Reset previous style updates (to work with window resizes) */
    cell.style.transform = "";

    /** Select cell above, return if not found (nothing to do) */
    const cellAbove = cells[idx - columns.length];

    if (!cellAbove) {
      return;
    }

    /** Check if cell above has some margin left */
    const rowAbove = rows[_getRowAboveIdx(idx, rows, columns)];
    const rowAboveHeight = parseFloat(rowAbove.replace("px", ""));
    const cellAboveHeight = cellAbove.clientHeight;
    const marginAvailable = rowAboveHeight - cellAboveHeight;

    /** no margin, nothing to do */
    if (!marginAvailable) {
      return;
    }

    /** Select all cells below, in the same column */
    const remainingCellsInColumn = _getRemainingCellsInColumn(
      cells,
      idx,
      columns
    );

    remainingCellsInColumn.forEach((_cell) => {
      /** Updates the css properties as needed */
      calculateTransformYDiff(_cell, marginAvailable);

      /** Update rows variable as cells are shifted upwards */
      rows = getComputedStyle(grid).gridTemplateRows.split(" ");
    });
  });
}

/**
 * Updates an element's position relative to the margin available on the above row
 * @param {HTMLElement} cell the item to be updated
 * @param {number} marginAvailable the amount of pixels to move the element upwards
 */
function calculateTransformYDiff(cell, marginAvailable) {
  const transformString = cell.style.transform || "translateY(0px)";
  const currentTransformYOffset = parseInt(
    transformString.match(/translateY\((.*)\)$/i)[1].replace("px", "")
  );

  const newDiff = currentTransformYOffset - marginAvailable;
  cell.style.transform = `translateY(${newDiff}px)`;
}

/**
 * Selects all cells from the same column that are below a given index
 * @param {array}  cells The HTML Elements inside the grid container
 * @param {number} currentCellIdx The current cell being processed
 * @param {array} columns Total number of columns in the grid container
 * @returns {array} Cells from the same column below the current cell
 */
function _getRemainingCellsInColumn(cells, currentCellIdx, columns) {
  const searchGrid = Array.from(cells).slice(currentCellIdx);
  return searchGrid.filter((_, idx) => idx % columns.length === 0);
}

/**
 * Given an cell grid and an index, returns the number of the above row
 * @param {number} currentCellIdx The current cell being processed
 * @param {array} rows Total number of rows in the grid container
 * @param {array} columns Total number of columns in the grid container
 * @returns {number} The row above the active cell
 */
function _getRowAboveIdx(currentCellIdx, rows, columns) {
  return Math.floor((currentCellIdx / columns.length) % rows.length) - 1;
}
