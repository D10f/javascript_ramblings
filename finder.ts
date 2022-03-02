// TODO: Add regular expression support
// TODO: Implement breath-first search
// TODO: Add option to filter output results (using set)

enum ALGORITHMS {
  "DEPTH_FIRST_SEARCH",
  "BREATH_FIRST_SEARCH",
}

interface IFinderOptions {
  algorithm?: ALGORITHMS;
  filterKeys?: string | undefined;
  filterValues?: string | undefined;
  returnEmptyValues?: boolean;
  maxDepth?: number | undefined;
  depthCount?: number;
}

type IFinderProvided = Omit<IFinderOptions, "depthCount">;

const defaultOptions: IFinderOptions = {
  algorithm: ALGORITHMS.DEPTH_FIRST_SEARCH,
  filterKeys: undefined,
  filterValues: undefined,
  returnEmptyValues: false,
  maxDepth: undefined,
  depthCount: 0,
};

function getSettings(options: IFinderOptions): IFinderOptions {
  return { ...defaultOptions, ...options };
}

function isNullOrUndefined(value: unknown): boolean {
  return value === null || value === undefined;
}

function isObject(value: string): boolean {
  return !isNullOrUndefined(value) && value.constructor.name === "Object";
}

function isArray(value: string): boolean {
  return value.constructor.name === "Array";
}

function isAtMaxDepth(options: IFinderOptions): boolean {
  return Boolean(options.maxDepth && options.depthCount! >= options.maxDepth);
}

function increaseDepthCount(options: IFinderOptions): IFinderOptions {
  return { ...options, depthCount: options.depthCount! + 1 };
}

function* _findInTree(
  tree: object,
  options: IFinderProvided
): Generator<unknown, any, any> {
  for (const [key, value] of Object.entries(tree)) {
    if (isNullOrUndefined(value) && !options.returnEmptyValues) {
      continue;
    }

    if (isObject(value)) {
      if (!isAtMaxDepth(options)) {
        for (const node of _findInTree(value, increaseDepthCount(options))) {
          yield node;
        }
      }

      continue;
    }

    if (options.filterKeys && key !== options.filterKeys) {
      continue;
    }

    if (options.filterValues && value !== options.filterValues) {
      continue;
    }

    yield value;
  }
}

function findInTree(tree: object, options: IFinderProvided = {}): any[] {
  const settings = getSettings(options);
  const response = [];
  for (const node of _findInTree(tree, settings)) {
    response.push(node);
  }
  return response;
}

// const data = {
//   value: 1,
//   rest: {
//     value: 2,
//     rest: {
//       value: 3,
//       rest: {
//        value: 4,
//         rest: {
//         value: 5,
//           rest: null,
//         },
//       },
//     },
//   },
// };

// findInTree(data);
