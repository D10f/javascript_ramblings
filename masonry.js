function masonryLayout(selector) {
  /** Select grid container */
  const grid = document.querySelector(selector);

  /** Just generate some random cells for test */
  // const gridCellFactory = randomGridCellFactory(10, 20);
  // for (const cell of gridCellFactory) {
  //   grid.appendChild(cell);
  // }

  /** Select items in grid */
  // const cells = grid.querySelectorAll('.cell');
  const cells = grid.querySelectorAll(`${selector} > *`);
  console.log(cells);

  /** Select grid properties */
  const columns = getComputedStyle(grid).gridTemplateColumns.split(" ");
  let rows = getComputedStyle(grid).gridTemplateRows.split(" ");

  /** No need for arrangements if there's only 1 column */
  if (columns.length === 1) {
    return;
  }

  cells.forEach((cell, idx) => {
    /** Force cell to be as height as the content it wraps around */
    cell.style.height = "max-content";

    /** Select cell above, return if not found (nothing to do) */
    const cellAbove = cells[idx - columns.length];

    if (!cellAbove) {
      return;
    }

    const rowAbove = rows[_getRowAboveIdx(idx, rows, columns)];
    const rowAboveHeight = parseFloat(rowAbove.replace("px", ""));
    const cellAboveHeight = cellAbove.clientHeight;
    const marginAvailable = rowAboveHeight - cellAboveHeight;

    /** no margin, nothing to do */
    if (!marginAvailable) {
      return;
    }

    const remainingCellsInColumn = _getRemainingCellsInColumn(
      cells,
      idx,
      columns
    );

    remainingCellsInColumn.forEach((cell) => {
      const currentTopMargin = parseInt(
        (cell.style.marginTop || "0px").replace("px", "")
      );

      const newMargin = currentTopMargin - marginAvailable;
      cell.style.marginTop = `${newMargin}px`;

      rows = getComputedStyle(grid).gridTemplateRows.split(" ");
    });
  });
}

function _getRemainingCellsInColumn(cells, currentCellIdx, columns) {
  const searchGrid = Array.from(cells).slice(currentCellIdx);
  return searchGrid.filter((_, idx) => idx % columns.length === 0);
}

function _getRowAboveIdx(currentCellIdx, rows, columns) {
  return Math.floor((currentCellIdx / columns.length) % rows.length) - 1;
}
