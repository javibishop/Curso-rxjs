import { timer, interval } from 'rxjs';
//timer (se ejecuta en un x tiempo y hace el complete), interval(se ejecuta cada tiempo x) son asincronicos
const observer = {
    next: val => console.log('next:', val) ,
    complete: () => console.log('complete') 
}
const time$ = timer(1000);
const time2$ = timer(2000, 1000); // -> esto arranca en 2000 y hace interval de 1000
const interval$ = interval(1000);

console.log('inicio') 
const intervalo = interval$.subscribe(observer);
time$.subscribe({
    next: val => console.log('time unsubscribe'),
    complete: () => intervalo.unsubscribe() 
});

console.log('fin') 


