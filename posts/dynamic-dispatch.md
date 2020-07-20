---
title: dynamic dispatch
slug: dynamic-dispatch
date: July 11, 2020
category: computer science
---

In JavaScript, we use *dynamic dispatch* whenever we call a method on an object:

```js
obj.method();
```

In some object-oriented languages that predate JavaScript (notably, in Smalltalk), “calling a method on an object” was known as “sending a message to an object”. The words “dispatch” and “send” are synonyms, which explains the term’s origin.

Why do we say this is “dynamic dispatch”? Can it be static? This depends on the language. For example, in JavaScript, calls like `obj.method()` are always “dynamic”. But this is not universally true for other languages. Let’s unpack the difference.

To understand this, we need to dive deeper into how computer code works under the hood. Generally saying, the functions we write eventually become sequences of computer instructions that are stored somewhere in memory. Calling a function means the computer will “jump” to its code in memory and execute its operations.

When we say that a language has *static dispatch*, it means that when the computer compiles `obj.method()`, it knows exactly *which* function this code would “jump” to. It won’t need to do any extra operations to “find” the function location in memory.

**When we say that a language has *dynamic dispatch*, it means we can’t be 100% sure which function `obj.method()` will call until this code runs**. For example, any JavaScript engine would need to take the current value of the `obj` variable, search for a property called `method` on that object, keep searching for it on the prototype chain if needed — and finally, “jump” into the function (or error if it wasn’t found).

Static dispatch is more commonly found in lower-level languages like C++ where performance must stay very close to metal. Dynamic dispatch lets us write more expressive code, but at a slight performance cost. This cost is negligible in most scenarios in web development, and JavaScript engines do a really good job to optimize the common cases and make dynamic dispatch as cheap as possible. So in practice, this difference is rarely relevant to JavaScript application development.

It is worth noting that even though `obj.method()` calls are dynamic in JavaScript, regular function calls like `fn()` are not. This is because `obj.method()` needs to first *find the function itself on that object*, whereas a call like `fn()` means that the `fn` variable already points to the function we need — so the engine has fewer steps to do to call it. That’s still not as “static” as the compiler knowing the exact function memory offset ahead of time, but it’s the closest JavaScript has to static dispatch.

**To sum up,** “dynamic dispatch” means that when we write `obj.method()`, the JS engine has to a tiny bit of extra work to “find” our function before it can call it.

Unless you’re specifically talking about the tradeoffs of `obj.method()` versus `fn()` calls or comparing different programming languages, saying “method call” is clearer.
