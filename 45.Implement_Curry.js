/**
 * @param {(...args: Array<unknown>) => unknown} func
 * @returns {(...args: Array<unknown>) => unknown}
 */
export default function curry(func) {

  return function curriedFunction(...args) {

    // If enough arguments are collected,
    // execute the original function
    if (args.length >= func.length) {
      return func.apply(this, args);
    }

    // Otherwise return a new function
    // with the current arguments partially stored
    else {
      return curriedFunction.bind(this, ...args);
    }
  };
}

/* --------------------------------------------------

DRY RUN EXAMPLE

function add(a, b, c) {
  return a + b + c;
}

const curriedAddition = curry(add);

-----------------------------------------------------

STEP 1

const fn1 = curriedAddition(1);

args = [1]

func.length = 3
args.length = 1

1 >= 3 -> false

Returns:
curriedFunction.bind(this, 1)

Now fn1 remembers:
a = 1

-----------------------------------------------------

STEP 2

const fn2 = fn1(2);

Internally:

args = [1, 2]

func.length = 3
args.length = 2

2 >= 3 -> false

Returns:
curriedFunction.bind(this, 1, 2)

Now fn2 remembers:
a = 1
b = 2

-----------------------------------------------------

STEP 3

const result = fn2(3);

Internally:

args = [1, 2, 3]

func.length = 3
args.length = 3

3 >= 3 -> true

Executes:

func.apply(this, [1, 2, 3])

Equivalent to:

add(1, 2, 3)

Returns:

6

-----------------------------------------------------

FINAL FLOW

curriedAddition(1)(2)(3)

=> 6

-----------------------------------------------------

IMPORTANT CONCEPT

func.length

represents the number of expected parameters.

Example:

function add(a, b, c) {}

add.length === 3

-------------------------------------------------- */
