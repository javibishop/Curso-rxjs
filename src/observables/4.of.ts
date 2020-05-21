import {of} from 'rxjs';
//of es SINC y me convierte los argumentos en observables. Por ende, cada elemento es un obs.
//const of$ = of(1,2,3,4,5,6);
//const of$ = of(...[1,2,3,4,5,6]);
const of$ = of([1,2,3,4,5,6], function(){}, Promise.resolve(true), "chau");
console.log("inicio")
of$.subscribe(
    next => console.log(next),
    null,
    () => console.log("complete")
)
console.log("fin")