---
title: dynamic dispatch
slug: dynamic-dispatch
date: July 20, 2020
category: computer science
---

In JavaScript, we use *dynamic dispatch* whenever we call a method on an object:

```js
obj.method();
```

In some object-oriented languages that predate JavaScript (notably, in Smalltalk), “calling a method on an object” was known as “sending a message to an object”. The words “dispatch” and “send” are synonyms, which explains the term’s origin.

Why do we say this is “dynamic dispatch”? Can it be static? This depends on the language. For example, in JavaScript, calls like `obj.method()` are always “dynamic”. But this is not universally true for other languages. Let’s unpack the difference.

To understand this, we need to dive deeper into how computer code works under the hood. Generally speaking, the functions we write eventually become sequences of computer instructions that are stored somewhere in memory. Calling a function means the computer will “jump” to its code in memory and execute its operations.

When we say that a language has *static dispatch*, it means that when the computer compiles `obj.method()`, it knows exactly *which* function this code would “jump” to. It won’t need to do any extra operations to “find” the function location in memory.

**When we say that a language has *dynamic dispatch*, it means we can’t be 100% sure which function `obj.method()` will call until this code runs**. For example, any JavaScript engine would need to take the current value of the `obj` variable, search for a property called `method` on that object, keep searching for it on the prototype chain if needed — and finally, “jump” into the function (or error if it wasn’t found).

Static dispatch is more commonly found in lower-level languages like C++ where performance must stay very close to metal. Dynamic dispatch lets us write more expressive code, but at a slight performance cost. This cost is negligible in most scenarios in web development, and JavaScript engines do a really good job to optimize the common cases and make dynamic dispatch as cheap as possible. So in practice, this difference is rarely relevant to JavaScript application development.

In fact, because of the JavaScript engine optimizations, the end result may be counterintuitive. For example, modern JS engines can often optimize a dynamic `obj.method()` call to match performance of a static call in a running program as long as their initial assumptions about your object remain true. The inverse may also happen, where a `fn()` call that seemingly doesn’t involve “searching” for properties, may still require some extra steps. Small benchmarks are usually [a lie](https://mrale.ph/blog/2014/12/24/array-length-caching.html), so you should generally let the engine do its job and write the code in the most natural way to you.

**To sum up,** “dynamic dispatch” means that when we write `obj.method()`, the JS engine may need to “find” our function before it can call it. But in JavaScript, the distinction is fuzzy because at the micro level, the exact steps that happen may change between different concrete examples and even between browser versions.

Unless you’re specifically talking about the tradeoffs of `obj.method()` versus `fn()` calls or comparing different programming languages, saying “method call” is clearer.
