---
title: memoization
slug: memoization
date: July 12, 2020
category: computer science
---

Before we start, let’s make sure we don’t confuse memoization and memorization. Memorization is when you put something in *your* head. It has the letter “r” in it.

But *memoization* (no “r”) is a nerdy computer science topic. Although in practice it also (unsurprisingly!) has to do with remembering things, there exist snobs who will hold it against you if you say “memorize” when you really mean “memoize”. I am not personally one of them, but you’ll need to keep this in mind for some job interviews.

Okay, if these are different things, then what *is* memoization?

### tl;dr

To illustrate it, imagine you’re writing a JavaScript app that calculates the weather based on the atmosphere readings. You don’t know how to do it, but luckily, there is an npm package with a `getChanceOfRain` function that you can use from your code:

```js
import { getChanceOfRain } from 'magic-weather-calculator';

function showWeatherReport() {
  let result = getChanceOfRain(); // Let the magic happen
  console.log("The chance of rain tomorrow is:", result);
}
```

There is just one problem. No matter what you do, calling `getChanceOfRain()` takes 100 milliseconds. So if the user rage-clicks “Show me the weather!” button, the weather will have to be recalculated and the app will briefly freeze on every click:

```js
showWeatherReport(); // (!) Triggers the calculation
showWeatherReport(); // (!) Triggers the calculation
showWeatherReport(); // (!) Triggers the calculation
```

This is not ideal. In the real life, if you already knew the answer, you wouldn’t be calculating it over and over! You would reuse the result from your previous calculation. That’s what memoization is. **Memoization means storing the result so you can use it next time instead of calculating the same thing again and again.**

In the below example, we call `memoizedGetChanceOfRain()` instead. This is a new function that we added which will check if we already have an answer — and if we do, it will return the previous answer instead of re-running `getChanceOfRain()`:

```js
import { getChanceOfRain } from 'magic-weather-calculator';

let isCalculated = false;
let lastResult;

// We added this function!
function memoizedGetChanceOfRain() {
  if (isCalculated) {
    // No need to calculate it again.
    return lastResult;
  }
  // Gotta calculate it for the first time.
  let result = getChanceOfRain();
  // Remember it for the next time.
  lastResult = result;
  isCalculated = true;
  return result;
}

function showWeatherReport() {
  // Use the memoized function instead of the original function.
  let result = memoizedGetChanceOfRain();
  console.log("The chance of rain tomorrow is:", result);
}
```

This makes every call to `showWeatherReport()` except the first one instant:

```js
showWeatherReport(); // (!) Triggers the calculation
showWeatherReport(); // Uses the calculated result
showWeatherReport(); // Uses the calculated result
showWeatherReport(); // Uses the calculated result
```

That’s what memoization is. When we say a function is “memoized”, it doesn’t mean we do something special to it from the JavaScript language perspective. It only means that we avoid calling it unnecessarily if we know its result won’t change.

---

**You can stop reading here, if you want.** We’ll continue with a few extra details.

---

### Memoization and Parameters

Generally, memoization always follows the same scheme:

1. Check if we already have a result.
2. If yes, return it.
3. If no, calculate the result and store it for the next time.

However, the actual implementation depends on our circumstances. For example, let’s say that the `getChanceOfRain` function takes a `city` parameter:

```js
function showWeatherReport(city) {
  let result = getChanceOfRain(city); // Pass the city
  console.log("The chance of rain tomorrow is:", result);
}
```

If we naïvely memoized this function like we did before, we would introduce a bug:

```js
showWeatherReport('Tokyo');  // (!) Triggers the calculation
showWeatherReport('London'); // Uses the calculated answer
```

Do you see the bug yet? The weather in Tokyo and London might be very different, so we can’t safely reuse the previous answer. This means that **when we memoize a function and reuse its result, we have to take its parameters into account too**.

#### Solution 1: Only Keep the Last Result

The easiest solution to our example is to remember both the result *and* the parameters for which that result was calculated. Here is how we could do it:

```js
import { getChanceOfRain } from 'magic-weather-calculator';

let lastCity;
let lastResult;

function memoizedGetChanceOfRain(city) {
  if (city === lastCity) { // Notice this check!
    // Same parameters, so we can reuse the last result.
    return lastResult;
  }
  // Either we're called for the first time,
  // or we're called with different parameters.
  // We have to perform the calculation.
  let result = getChanceOfRain(city);
  // Remember both the parameters and the result.
  lastCity = city;
  lastResult = result;
  return result;
}

function showWeatherReport(city) {
  // Pass the parameters to the memoized function.
  let result = memoizedGetChanceOfRain(city);
  console.log("The chance of rain tomorrow is:", result);
}
```

Notice how this example is subtly different from our original one. Instead of *always* returning the last result when it exists, we check `city === lastCity` first. If the city changes midway, we’re going to have to re-calculate the result again:

```js
showWeatherReport('Tokyo');  // (!) Triggers the calculation
showWeatherReport('Tokyo');  // Uses the calculated result
showWeatherReport('Tokyo');  // Uses the calculated result
showWeatherReport('London'); // (!) Triggers the calculation
showWeatherReport('London'); // Uses the calculated result
```

This fixes our bug, but it’s not always an optimal solution. In particular, if our `city` parameter changes on every function call, our memoization becomes useless:

```js
showWeatherReport('Tokyo');  // (!) Triggers the calculation
showWeatherReport('London'); // (!) Triggers the calculation
showWeatherReport('Tokyo');  // (!) Triggers the calculation
showWeatherReport('London'); // (!) Triggers the calculation
showWeatherReport('Tokyo');  // (!) Triggers the calculation
```

Whenever you add memoization, remember to check if it actually helps!

#### Solution 2: Keep Many Results

Another thing we could do is to keep *many* results instead of just the last one. Although we could define variables like `lastTokyoResult`, `lastLondonResult`, and so on, it is much easier to use a [`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) which lets us hold a result for every `city` value:

```js
// Remember the last result *for every city*.
let resultsPerCity = new Map();

function memoizedGetChanceOfRain(city) {
  if (resultsPerCity.has(city)) {
    // We already have a result for this city.
    return resultsPerCity.get(city);
  }
  // We're called for the first time for this city.
  let result = getChanceOfRain(city);
  // Remember the result for this city.
  resultsPerCity.set(city, result);
  return result;
}

function showWeatherReport(city) {
  // Pass the parameters to the memoized function.
  let result = memoizedGetChanceOfRain(city);
  console.log("The chance of rain tomorrow is:", result);
}
```

This solution works great for our use case because it only ever calculates the result the first time it encounters a particular value of `city`. Every next call with the same `city` parameter will reuse the previously calculated result that we stored in our `Map`:

```js
showWeatherReport('Tokyo');  // (!) Triggers the calculation
showWeatherReport('London'); // (!) Triggers the calculation
showWeatherReport('Tokyo');  // Uses the calculated result
showWeatherReport('London'); // Uses the calculated result
showWeatherReport('Tokyo');  // Uses the calculated result
showWeatherReport('Paris');  // (!) Triggers the calculation
```

However, this solution isn’t without its downsides too. **In particular, if we keep passing more different `city` values to our function, our `Map` will keep growing.**

So this solution trades faster performance for potentially unbounded memory growth. In the very worst cases, this can result in our browser tab crashing, especially if every result uses a significant part of memory (e.g. a DOM tree).

#### Other Solutions

There are many solutions on the spectrum between “keep only the last result” and “keep all results”. For example, you may keep results for the last N parameter values, which is known as an LRU, or a “least recently used”, cache. It’s nothing more than a Map with extra logic. You may also decide to *remove* past results after some time passes — similar to how browsers removes the cached assets after they expire. If our parameter were an object (rather than a string, like it is above), we could use [`WeakMap`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap) instead of `Map` in modern browsers. The benefit of `WeakMap` is that it would automatically “clean up” the entries when our object key is no longer accessible. Memoization is a flexible technique, and you can choose between many tradeoffs.

### Memoization and Purity

We should note memoization isn’t always safe to do.

For example, imagine that the `getChanceOfRain` function from our magical npm package does not receive `city` as a parameter, but shows an input box to the user:

```js
// Inside the magical npm package
function getChanceOfRain() {
  // Show the input box!
  let city = prompt('Where do you live?');
  // ... calculation ...
}


// Our code
function showWeatherReport() {
  let result = getChanceOfRain();
  console.log("The chance of rain tomorrow is:", result);
}
```

If we call `showWeatherReport()` two times, we will see two input boxes. We could input different cities, and see different results in the console. But if we memoized the `getChanceOfRain` function, we would only see one input box! Each next call would keep returning the same result and wouldn’t let us enter a different city.

So memoization is only safe to do when the function is “pure” — that is, **if it only reads its parameters and doesn’t interact with the “outside world”.** With a pure function, it doesn’t matter whether you call it once or if you reuse its previous result.

This is why in a complex algorithm, it can be beneficial to separate the parts that *do* something from the parts that merely *calculate* something. The parts that calculate something can be pure, so they can be safely memoized and skipped on repeated calls. But the code that *does* something can’t be skipped without behavior changes:

```js
// If this function only calculates things,
// we would call it "pure".
// It is safe to memoize this function.
function getChanceOfRain(city) {
  // ... calculation ...
}


// This function is "impure" because
// it shows a prompt to the user.
function showWeatherReport() {
  // The prompt is now here
  let city = prompt('Where do you live?');
  let result = getChanceOfRain(city);
  console.log("The chance of rain tomorrow is:", result);
}
```

Now it would be safe to memoize `getChanceOfRain` — because it takes `city` as a parameter rather than showing the input box to the user. In other words, it is pure. Concretely, it would mean that you would still see an input box on every call to `showWeatherReport`, but the calculation would be skipped if we had the result.

### Reusable Memoization

If you want to memoize several functions, it can be annoying to repeat the same steps every time: add a variable, check if we have the result, store the result.

Luckily, we have a tool at our disposal — *functions!* — that lets us automate this. **We will use a function to “write” this repetitive memoization logic for us.**

Let’s take our first example that memoizes the last result:

```js
let isCalculated = false;
let lastResult;

function memoizedGetChanceOfRain() {
  if (isCalculated) {
    return lastResult;
  }
  let result = getChanceOfRain();
  lastResult = result;
  isCalculated = true;
  return result;
}
```

Then let’s wrap it all (without any changes) in a function called `memoize`:

```js
function memoize() {
  let isCalculated = false;
  let lastResult;

  function memoizedGetChanceOfRain() {
    if (isCalculated) {
      return lastResult;
    }
    let result = getChanceOfRain();
    lastResult = result;
    isCalculated = true;
    return result;
  }
}
```

We want to make this function more useful than just calculating the chance of rain. So instead of `getChanceOfRain`, we’ll add a function parameter that we’ll call `fn`:

```js
function memoize(fn) { // Declare the fn parameter
  let isCalculated = false;
  let lastResult;

  function memoizedGetChanceOfRain() {
    if (isCalculated) {
      return lastResult;
    }
    let result = fn(); // Call the passed function
    lastResult = result;
    isCalculated = true;
    return result;
  }
}
```

Finally, let’s also rename `memoizedGetChanceOfRain` to `memoizedFn` and *return* it:

```js
function memoize(fn) {
  let isCalculated = false;
  let lastResult;

  return function memoizedFn() { // Return the generated function!
    if (isCalculated) {
      return lastResult;
    }
    let result = fn();
    lastResult = result;
    isCalculated = true;
    return result;
  }
}
```

What we got as a result is a *reusable* function that does memoization for us.

Now our original example could shrink to this:

```js
import { getChanceOfRain } from 'magic-weather-calculator';

// Instead of writing it by hand, generate it.
let memoizedGetChanceOfRain = memoize(getChanceOfRain);

function showWeatherReport() {
  let result = memoizedGetChanceOfRain();
  console.log("The chance of rain tomorrow is:", result);
}
```

The `isCalculated` and `lastResult` variables still exist, but they are neatly tucked away inside the `memoize` function. In other words, they are part of a [closure](/closure). We can now use `memoize` anywhere, with each call to `memoize` independent from the others:

```js
import { getChanceOfRain, getNextEarthquake, getCosmicRaysProbability } from 'magic-weather-calculator';

// Each of these generated functions has its own lastResult and isCalculated.
// It's like if we wrote each of them by hand, but shorter.
let memoizedGetChanceOfRain = memoize(getChanceOfRain);
let memoizedGetNextEarthquake = memoize(getNextEarthquake);
let memoizedGetCosmicRaysProbability = memoize(getCosmicRaysProbability);
```

Here, the goal of `memoize` is to *generate a memoized version* of the function we provide to it, so that we don’t have to write each of them by hand every time.

A reusable `memoize` function like this exists in [Lodash](https://lodash.com/docs/4.17.15#memoize) and many other packages.

### Recap

Now let’s quickly recap what we learned. Memoization (without “r”) is a way to make your program faster. It works when there is a section of code that executes many times, but that code only performs a calculation (in other words, it is “pure”) — so it is safe to reuse the previous result. There are different approaches to memoization: you can memoize only the last result, the last N results, or even all previous results. You should use your judgement to choose the approach that makes sense in each specific case. Generally speaking, it is not hard to implement memoization manually, but there are also packages that do that for you. Here is how Lodash [implements it](https://github.com/lodash/lodash/blob/master/memoize.js).

But at its core, memoization is about taking code like this:

```js
import { getChanceOfRain } from 'magic-weather-calculator';

function showWeatherReport() {
  let result = getChanceOfRain();
  console.log("The chance of rain tomorrow is:", result);
}
```

And turning it into this:

```js
import { getChanceOfRain } from 'magic-weather-calculator';

let isCalculated = false;
let lastResult;

function memoizedGetChanceOfRain() {
  if (isCalculated) {
    return lastResult;
  }
  let result = getChanceOfRain();
  lastResult = result;
  isCalculated = true;
  return result;
}

function showWeatherReport() {
  let result = memoizedGetChanceOfRain();
  console.log("The chance of rain tomorrow is:", result);
}
```

Use memoization wisely and only where it brings concrete performance improvements. Otherwise, you’re adding complexity and potential bugs.
