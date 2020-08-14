---
title: a closure (Español)
slug: closure
date: July 11, 2020
category: language
---

Las Clausuras (closures en inglés) son confusos porque son un concepto "invisible".

Cuando tú usas un objeto, una variable o una función, tu lo haces intencionalmente. Tú piensas: "Voy a necesitar una variable aquí", y la agregas a tu código.

Las clausuras son diferente. Para cuando la mayoría de las personas se acercan a las clausuras, ya las han usado sin saberlo muchas veces, y es probable que esto también sea cierto para ti. Por lo tanto, aprender sobre las clausuras se trata menos de comprender un *nuevo* concepto y se trata más de reconocer algo que ya *has estado haciendo* durante un tiempo.

### tl;dr

Tienes una clausura cuando **una función accede a variables definidas fuera de ella**.

Por ejemplo, este fragmento de código contiene una clausura:

```js
let users = ['Alice', 'Dan', 'Jessica'];
let query = 'A';
let user = users.filter(user => user.startsWith(query));
```

Observa como `user => user.startsWith(query)` es en sí misma una función. Utiliza la variable `query`. Pero la variable `query` está definida *fuera* de la función. Esto es una clausura.

---

**Puedes dejar de leer aquí si así lo quieres.** El resto del artículo aborda las clausuras de una manera diferente. En lugar de explicar qué es una clausura, te guiará a través del proceso de *descubrimiento* de las clausuras, como lo hicieron los primeros programadores en la década de 1960.

---

### Paso 1: Las funciones pueden acceder a variables externas

Para entender las clausuras, debemos estar familiarizados con las variables y las funciones. En este ejemplo, declaramos que la variable `food` está *dentro* de la función `eat`:

```js
function eat() {
  let food = 'cheese';
  console.log(food + ' is good');
}

eat(); // Logs 'cheese is good'
```

Pero, ¿qué pasaría si luego quisiéramos cambiar la variable `food` *fuera* de la función `eat`? Para hacer esto, podemos mover la variable `food` de nuestra función al nivel superior.

```js
let food = 'cheese'; // La movemos hacia afuera

function eat() {
  console.log(food + ' is good');
}
```

Esto nos permite cambiar la `food` "desde afuera" en cualquier momento que queramos:

```js
eat(); // Logs 'cheese is good'
food = 'pizza';
eat(); // Logs 'pizza is good'
food = 'sushi';
eat(); // Logs 'sushi is good'
```

En otras palabras, la variable `comida` ya no está *localmente* disponible para nuestra función `eat`, pero nuestra función `eat` no tiene problemas para acceder a ella. **Las funciones pueden acceder a variables fuera ellas** Detente un segundo y asegúrate que no has tenido problema con esta idea. Una vez que se haya asentado cómodamente en tu cerebro, avanza hacia el segundo paso.

### Paso 2: Código de envoltura (Wrapping Code) en una llamada de función

Digamos que tenemos un código:

```js
/* Un fragmento de código */
```

No importa lo que haga ese código. Pero digamos que **queremos ejecutarlo dos veces**.

Una forma de hacerlo, sería copiarlo y pegarlo:

```js
/* Un fragmento de código */
/* Un fragmento de código */
```

Otra forma de hacerlo sería usando un bucle:

```js
for (let i = 0; i < 2; i++) {
  /* Un fragmento de código */
}
```

La tercera forma, que es en la cual estamos interesados hoy, es envolverlo en una función:

```js
function doTheThing() {
  /* Un fragmento de código */
}

doTheThing();
doTheThing();
```

El uso de una función nos da la máxima flexibilidad porque podemos ejecutar esta función cualquier número de veces, en cualquier momento, y desde cualquier lugar de nuestro programa.

De hecho, **podemos llamar a nuestra función solo *una vez***, si así lo queremos:

```js
function doTheThing() {
  /* Un fragmento de código */
}

doTheThing();
```

Observa cómo el código anterior es equivalente al fragmento de código original:

```js
/* Un fragmento de código */
```

En otras palabras, **si tomamos algún fragmento de código, "envolvemos" ese código en una función, y luego llamamos a esa función exactamente una vez, no hemos cambiado lo que ese código hace**. Hay algunas excepciones a esta regla que ignoraremos, pero en general esto debería tener sentido. Toma esta idea hasta que tu cerebro se sienta cómoda con ella.

### Paso 3: Descubriendo Clausuras

Hemos trazado nuestro camino a través de dos ideas diferentes:

* **Las funciones pueden acceder a variables definidas fuera de ellas.**
* **Envolver código en una función y llamarla una vez no cambia el resultado.**

Ahora, veamos qué sucede si las combinamos.

Tomaremos el código de ejemplo de nuestro paso 1:

```js
let food = 'cheese';

function eat() {
  console.log(food + ' is good');
}

eat();
```

Luego, envolvemos *todo este ejemplo* en una función, a la que llamaremos una vez:

```js
function liveADay() {
  let food = 'cheese';

  function eat() {
    console.log(food + ' is good');
  }

  eat();
}

liveADay();
```

Lee ambos fragmentos de código una vez más y asegúrate que sean equivalentes.

¡Este código funciona! Pero mira más de cerca. Observa que la función `eat` está *dentro* de la función `liveADay`. ¿Esto está permitido? ¿Podemos realmente poner una función dentro de otra función?

Hay lenguajes en los que un código estructurado de esta manera *no* es válido. Por ejemplo, este código no es válido en el lenguage C (que no tiene clausuras). Esto significa que en C, nuestro segunda conclusión no es cierta - no podemos tomar un fragmento de código arbitrariamente y envolverlo en una función. Pero JavaScript no sufre esa limitación.

Echa otro vistazo a este código y observa dónde se declara y se utiliza `food`:

```js
function liveADay() {
  let food = 'cheese'; // Declarar `food`

  function eat() {
    console.log(food + ' is good'); // Leer `food`
  }

  eat();
}

liveADay();
```

Repasemos este código juntos - paso a paso. Primero, hemos declarado la función `liveADay` en el nivel superior. Inmediatamente la llamamos. Tiene una variable local `food`. También contiene una función `eat`. Luego la función `eat` es llamada. Como `eat` está dentro de `liveADay`, "ve" todas sus variables. Es por eso que puede leer la variable `food`.

**Esto se llama una clausura.**

**Decimos que hay una clausura cuando una función (como `eat`) lee o escribe una variable (como `food`) que se declare fuera de ella (como en `liveADay`).**

Tómate un tiempo para re leer esto, y asegúrate rastrear esto en el código.

Aquí hay un ejemplo que hemos introducido en la sección tl;dr:

```js
let users = ['Alice', 'Dan', 'Jessica'];
let query = 'A';
let user = users.filter(user => user.startsWith(query));
```

Puede ser más fácil notar la clausura si reescribimos esto como una función expresada:

```js
let users = ['Alice', 'Dan', 'Jessica'];
// 1. La variable "query" es declarada afuera
let query = 'A';
let user = users.filter(function(user) {
  // 2. Estamos en la función anidada
  // 3. Y leemos la variable "query" (¡que está declarada afuera!)
  return user.startsWith(query);
});
```

Cada vez que una función accede a una variable que está declarada fuera de ella, decimos que es una clausura. El término en sí se usa un poco flojo. Algunas personas se referirán a la *función anidada* como "la clausura" en este ejemplo. Otros pueden referirse a la *técnica* de acceder a variables de afuera como la clausura. La verdad, no importa.

### Un Fantasma de una llamada de función

Las clausuras pueden ser engañosamente siemple ahora. Esto no significa que tenga sus propias trampas. El hecho de que una función pueda escribir y leer variables fuera de ella puede tener consecuencias bastante profundas si realmente lo piensas. Por ejemplo, esto significa que estas variables pueden "sobrevivir" mientras la función anidada sea llamada:

```js
function liveADay() {
  let food = 'cheese';

  function eat() {
    console.log(food + ' is good');
  }

  // Llamar a "eat" después de 5 segundos
  setTimeout(eat, 5000);
}

liveADay();
```

Aquí, `food` es una variable local dentro de la llamada de función `liveADay()`. Es tentador pensar que "desaparece" después de salir de `liveADay`, y que no volverá a perseguirnos.

Sin embargo, dentro de `liveADay` le decimos al navegador que llame a `eat` en 5 segundos. Y `eat` lee la variable `food`. **Por lo tanto, el motor de JavaScript debe mantener la variable `food` de esa particular llamada de función `liveADay()` disponible hasta que se haya llamado a `eat`**

En ese sentido, podemos pensar que las clausuras son como "fantasmas" o "recuerdos" de las llamadas a funciones pasadas. A pesar que nuestra llamada a la función `liveADay()` ha finalizado después de un tiempo, esas variables deben continuar existiendo mientras se pueda llamar a la función anidadad `eat`. Afortunadamente, JavaScript lo hace por nosotros, y por lo tanto, nosotros no debemos pensar en eso.

## ¿Por qué "clausuras"?

Finalmente, puede que te preguntes, ¿por qué las clausuras se llaman así?. La razón es principalmente histórica. Una persona familiarizada con la jerga informática puede decir que una expresión como `user => user.startsWith(query)` tiene un "enlace abierto". En otras palabras, queda claro que `user` es (un parámetro), pero no queda claro que `query` está aislada. Cuando decimos que "en realidad, `query` se refiere a una variable declarada afuera", estamos "cerrando" ese enlace abierto. En otras palabras, obtenemos una *clausura*.

No todos los lenguajes implementan clausuras. Por ejemplo, en algunos lenguajes como C, no está permitido anidar funciones en absoluto. Como resultado, una función solo puede acceder a sus propias variables locales o variables globales, pero nunca en ninguna situación puede acceder a variables locales de una función principal. Naturalmente, esa limitación es dolorosa.

Y con eso, Yo espero que puedas ¡clausurar el concepto de las clausuras!

>Si prefieres un enfoque más visual de los fundamentos de JavaScript, chequea [Just JavaScript](https://justjavascript.com/). Es mi curso ilustrado en colaboración con [Maggie Appleton](https://maggieappleton.com/).