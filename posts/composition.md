---
title: composition
slug: composition
date: July 11, 2020
category: computer science
---

Broadly speaking, **composition is putting two or more different things together, and getting the same “kind” of thing — a combination of the inputs — as a result.**

The concrete meaning might depend on the context, so we’ll look at a few examples that come up in front-end JavaScript development.

### Composition in Math

While math is somewhat unrelated to front-end development, it’s useful to recap the [mathematical definition](https://en.wikipedia.org/wiki/Function_composition) — if only to show where the term originates.

Let’s say we have two functions. One function is `y = 2 * x`, which doubles its argument. The other function is `y = x + 10`, which adds 10 to its argument.

If we put them together so that the output of one function is fed to the other function, we get `y = (2 * x) + 10`. This is an example of composition — we’ve “composed” this function out of two other functions. **That’s all this term means.**

Note how composition of two functions gives us another function. It doesn’t give us something entirely different. As a result, we can keep composing it many times.

Composition is a broad term, but we will only use it when the result of putting things together is the same “kind” of thing — whether it’s a function, a component, etc.

### Function Composition

Composition often comes up in the context of functional programming. There, it refers to the same concept as in mathematics, but expressed in code.

Let’s say we have code like this:

```js
let date = getDate();
let text = formatDate(date);
let label = createLabel(text);
showLabel(label);
```

There is some repetition to this code. A [rhythm](https://twitter.com/dan_abramov/status/1216142369181093889), if you will. We take a thing, convert it to something else, take *that* thing, convert it to something else, and so on.

But can we go further and remove the repetition, leaving only the steps?

```js
let steps = [
  getDate,
  formatDate,
  createLabel,
  showLabel
];
```

Some might say this code is [cleaner](https://overreacted.io/goodbye-clean-code/).

Let’s write a function that we’ll call `runSteps` that applies each step one by one:

```js
function runSteps(steps) {
  let result;
  for (let i = 0; i < steps.length; i++) {
    let step = steps[i];
    // Apply next step in the chain
    result = step(result);
  }
  return result;
}
```

With this function, our original code becomes:

```js
runSteps([
  getDate,
  formatDate,
  createLabel,
  showLabel
]);
```

Now let’s say we want to perform all of these steps, but from different places in our program, and at different times. We could write a function that does this for us:

```js
function showDateLabel() {
  runSteps([
    getDate,
    formatDate,
    createLabel,
    showLabel
  ]);
}

// We can call it whenever!
showDateLabel();
showDateLabel();
```

Or we could have a function — we’ll call it `pipe` — that *generates* our function:

```js
let showDateLabel = pipe(
  getDate,
  formatDate,
  createLabel,
  showLabel
);

// We can call it whenever!
showDateLabel();
showDateLabel();
```

This code does exactly the same thing, but we didn’t have to explicitly implement `showDateLabel` (which merely called `runSteps`). We’ve [tucked it away](/closure) inside `pipe`:

```js
function pipe(...steps) {
  // Return a function that will do this for me
  return function runSteps() {
    let result;
    for (let i = 0; i < steps.length; i++) {
      let step = steps[i];
      result = step(result);
    }
    return result;
  }
}
```

This reusable function lets us rewrite our code so that **instead of manually calling functions one by one in a sequence, we only specify the steps**. We called it `pipe` because it “pipes” the output of each previous function to the next one.

Recall our original code:

```js
let date = getDate();
let text = formatDate(date);
let label = createLabel(text);
showLabel(label);
```

And this is what it looks like with `pipe`:

```js
let showDateLabel = pipe(
  getDate,
  formatDate,
  createLabel,
  showLabel
);
showDateLabel();
```

If you’re not sold on expressing everything using function composition, you might be wondering — what was the point? Why did we go through all of these steps? Isn’t the first example a bit more readable? Are you the only person not “getting” it?

#### Functional Eureka

Understanding `pipe` and function composition for the first time is a lightbulb moment. We don’t have to call our functions manually — instead, we can feed our functions to another function that will give us back a function to call our functions!

How “beautiful”.

There is definitely a profound insight there that we shouldn’t disregard. We have *raised the level of abstraction* by making the structure of our program itself — a sequence of steps — into something our code can manipulate. For example, we could teach `pipe` to wrap every step with some logging, or to run every step asynchronously. This is a powerful technique that deserves our understanding.

This programming style can also be a nightmare to work with. We’ve “outsourced” the actual business of function calls to helpers like `pipe`, and as a result we can no longer clearly see how each piece of data flows in and out of our functions because it all happens inside of `pipe`. We’ve added a piece of “indirection” — our code is more flexible, but less direct. Add too many layers, and [our heads will overflow](https://overreacted.io/the-wet-codebase/).

While this programming style can be used with great success (especially in strongly typed languages that enforce *which* things can “fit” into other things), it’s a tad overused by enthusiastic programmers who get a dopamine rush from writing clever one-liners and hiding the control flow in “elegant” helpers. I did that, too.

#### Function Composition Is Neat, Though

That being said, the fundamental idea of function composition is important. Essentially, it means that when we have `doX(doY(doZ(thing)))`, we can *first* compose `doX`, `doY`, and `doZ`, and *then* apply the resulting function together.

In the trivial cases like above, using it directly brings more trouble than it’s worth. But it might get more useful if the problem is more challenging. Perhaps, we want each step to be [memoized](/memoization). Perhaps, each step happens asynchronously and the control flow is more complex. There can be cases where we want something to happen before or after each step, without repeating that fragile logic everywhere. Perhaps, the steps themselves need to be “interpreted” in different ways by our program, so we want to separate their order from how they are being executed.

Function composition can inspire interesting solutions if we keep it mind. This doesn’t mean that we need to take out a `pipe` every time we want to put two functions together. We don’t need to prove to the computer that we’re smart and learned our lessons about composition. Usually, plain function calls are enough.

### Component Composition

Another context in which we might hear the word “composition” is related to declarative UI programming. We’ll take React components as an example.

React components render other components, all the way from `<App>` to a `<Button>`:

```js
function App() {
  return <Screen />;
}

function Screen() {
  return <Form />;
}

function Form() {
  return <Button />;
}

function Button() {
  return <button>Hey there.</button>;
}
```

This is also called “composition” because we are putting things (components) into other things (components), and they fit with each other (“compose”) pretty well.

One interesting variant of composition is when a component has “slots”:

```js
function Layout({ sidebar, content }) {
  return (
    <div>
      <div className="sidebar">{sidebar}</div>
      <div className="content">{content}</div>
    </div>
  )
}
```

Then we can “fill in” those slots from different parent components:

```js
function HomePage() {
  return (
    <Layout
      sidebar={<HomeSidebar />}
      content={<HomeContent />}
    >
  )
}

function AboutPage() {
  return (
    <Layout
      sidebar={<AboutSidebar />}
      content={<AboutContent />}
    >
  )
}
```

Note how these “slots” aren’t a special React feature. They are a consequence of our ability to pass down pieces of UI the same way we would pass any other data.

This is also called “composition” because we compose (“fill in”) `Layout` with different child components. Putting things inside other things.

### Composition vs Inheritance

People sometimes say “composition” when contrasting it with inheritance. This has less to do with functions (which we’ve been discussing all along) and more to do with objects and classes — that is, with traditional object-oriented programming.

In particular, if you express your code as classes, it is tempting to reuse behavior from another class by extending it (inheritance). However, this makes it somewhat difficult to adjust the behavior later. For example, you may want to similarly reuse behavior from *another* class, but you can’t extend more than one base class.

Sometimes, people say that inheritance “locks you into” your first design because the cost of changing the class hierarchy later is too high. When people suggest *composition* is an alternative to inheritance, they mean that instead of extending a class, you can keep an instance of that class as a field. Then you can “delegate” to that instance when necessary, but you are also free to do something different.

Overall, the industry has largely moved away from modeling UI components as deep inheritance hierarchies, as was common in the 2000s.

This doesn’t mean inheritance is always “bad”. But it is a very blunt tool, and it should be approached with moderation. In particular, inheritance hierarchies deeper than a few levels often cause problems that shallow inheritance doesn’t.

Modern front-end codebases rarely use inheritance for their UI because all of the popular UI libraries today feature powerful built-in support for composition. Say, in React, instead of extending a `Button`, you would *render* a `<Button>` in a parent component. Even JavaScript UI libraries that embrace classes typically don’t use inheritance as a way to reuse rendering code. And this is probably for the best.

### Recap

To sum up, we say that we compose two things when we make a third thing out of them that is similarly shaped. The term has a mathematical meaning, and it is close to its meaning in functional programming. But the further we move away from pure functional programming, the less formal and more colloquial this term becomes.

Function composition is a powerful concept, but it raises the level of abstraction and makes your code less direct. If you write your code in a style that composes functions in some way before calling them, and there are other humans on your team, make sure that you’re getting concrete benefits from this approach. It is not “cleaner” or “better”, and there is a price to pay for “beautiful” but indirect code.
