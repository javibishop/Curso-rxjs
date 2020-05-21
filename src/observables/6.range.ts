import { range } from 'rxjs';
//range es SINC y me crea un observer de un rango, con un valor inicial y la cantidad de elementos que quiero.
const event1$ = range(1,5);
const observer = {
    next: val => console.log(val) 
}
event1$.subscribe(observer);
