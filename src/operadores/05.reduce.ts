import { interval } from 'rxjs';
import { take, reduce, tap } from 'rxjs/operators';

const numeros = [1,2,3,4,5];

const sumarNumeros = (acumulador: number, actual: number) => acumulador + actual;
const total = numeros.reduce(sumarNumeros, 0); //reduce de js suma en un acumulador los valores del array.
console.log(total);

interval(1000)
.pipe(
    take(3), //solo tomo hasta la 3er emision del interval. emite, 0,1,2
    tap(console.log), //aca el tap, imprime los valores emitidos 
    reduce(sumarNumeros) //reduce(sumarNumeros()) si yo usaria como esta ahi, con los () me indicaria que ahi mismo ejecuta la funcion, y da error, pq espera los params, por eso lo pasa sin ()!!!!!
)
.subscribe({
    next: val => console.log(val),
    complete: () => console.log('complete')
});