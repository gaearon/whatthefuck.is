---
title: a callback
slug: callback
date: July 21, 2020
category: language
---

When you are working with javascript you will hear callback function a lot. So `whatthefuck.is` a callback function.

In JavaScript functions are object and we can pass functions as parameters. (callback function a concept and not limited to javascript only.) So when we pass such function as a parameter and then you can call and invoke it inside the outer function is called a callback function.

Wait, it sounds complicated. Let's see an example.

**Example 1**
A normal calculate function which can print the output.
```
function calculate(a, b, callback){
    const sum = a + b;
    callback(sum); 
}

function printCallback(value){
    console.log(value);
}

calculate(1,2,printCallback)
```

Let's see the above example:
- We created a calculate function can accept 3 parameters
    - value a (number)
    - value b (number)
    - callback (function/object)
- We have a printCallback function that prints the value it gets.
- We call the function at the end with 1,2, and print function.
- Now inside the calculate function we perform the sum and pass that value to callback and call the function with that value.

So, in this case it assures that the callback function is getting called after it perform the sum.

---
You can stop reading here, if you want. We’ll continue with a few extra details and examples.

---

**Example 2**
You might be familiar with setTimeout.

It also uses callback. When we pass a function to it as a first argument, it uses it to call it after the amount specified in the second argument.

```
setTimeout(function(){
     console.log("I am a callback function") 
    }, 1000);
```

**What is the use case?**
When you want to run some function after another function then this is useful. Let's see the code. (Don't worry. I will explain what it is.)

```
function getUserFromBackend(callback){
    makeFakeApiCall().then(values => { 
       callback(values.data)
    }); 
}

function makeFakeApiCall(){
    return new Promise((resolve, reject) => { 
        setTimeout(() => { 
            resolve({data:"I am Api response"}); 
        }, 1000); 
    })
}

function print(data){
    console.log(data); 
}

getUserFromBackend(print);
```

- We created 3 functions.
- You can ignore `makeFakeApiCall` function. Just think that it will return a promise.
- `getUserFromBackend` function will call `makeFakeApiCall`. Then we get the value and use our callback function and pass the value to that callback function.
- `print` is the function that we are gonna pass it as a callback function and it will just print the value.
- In the end we call it.

Now do one thing to understand it better. 
- Create a function `handleError` and show the alert when makeFakeApi throws error.
- Use catch block inside `getUserFromBackend` (`makeFakeApiCall().then().catch()`) and use another callback parameter with `handleError`.
- To throw error from `makeFakeApiCall` use `throw 'Error Occured';` inside `setTimeout` instead of `resolve`



**To sum up,** Callback function is the functions that passed as an argument to another function so it can call it whenever it requires. Generally, it's useful with some API calls when you want to handle the success part or the error part. We can also use it with recursive function as well. And a lot of library functions also use callback for ex. `setTimeout`, `addEventListner`, `setState` (react), `useEffect` (react) etc. 