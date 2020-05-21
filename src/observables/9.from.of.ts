import { of, from, observable } from 'rxjs';
import { async } from 'rxjs/internal/scheduler/async';
//of es SINC y me convierte los argumentos en observables. Por ende, cada elemento es un obs.
//from crea un obs de un array, promise, iterable, object
const observer = {
    next: val => console.log('next:', val) ,
    complete: () => console.log('complete') 
}

// const source$ = from([1,2,3,4,5])
// const source3$ = of(...[1,2,3,4,5])
// const source2$ = of([1,2,3,4,5])
// const source4$ = from('Jacinto')
// source$.subscribe(observer);
// source2$.subscribe(observer);
// source3$.subscribe(observer);
// source4$.subscribe(observer);

const source$ = from(fetch('https://api.github.com/users/javibishop'))
// source$.subscribe( resp =>{
//     resp.json().then(respo => {
//         console.log(respo)
//     });
// });

//The word “async” before a function means one simple thing: a function always returns a promise. Other values are wrapped in a resolved promise automatically.
//So, async ensures that the function returns a promise, and wraps non-promises in it. Simple enough, right? But not only that. There’s another keyword, await, that works only inside async functions, and it’s pretty cool.
//The keyword await makes JavaScript wait until that promise settles and returns its result.
/**
 * function f() {
  let promise = Promise.resolve(1);
  let result = await promise; // Syntax error
}
 */

source$.subscribe(async(resp) =>{
    let result = await resp.json();
    console.log(result);
});

//funcion generadora 
const miGenerador = function *(){
    yield 1;
    yield 2;
    yield 3;
    yield 4;
    yield 5;
    yield 6;
}

const miIterable = miGenerador();

let gene = from(miIterable);
gene.subscribe(observer);
