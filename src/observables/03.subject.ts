import {Observable, onErrorResumeNext, Observer, Subject} from 'rxjs';

//Caso 2, defino el observer y se lo paso a un subscribe.
const obsserver : Observer<any> = {
    next: value => console.log('next:', value),
    error: error => console.warn('error', error),
    complete: () => console.info('completado')
}

//genero el observable
const intervalos$ = new Observable<number>(subs =>{
    const intervalo = setInterval(() => {
        subs.next(Math.random());
        console.log('random me sigo ejecutando');
    },3000)

    //para que no pase lo de arriba, que el obs se sigue ejecutando. hago una var del interval y creo la funcion que se ejecuta al hacer un unsubscribe
    //Esto tambien se ejecuta al hacer un Complete!
    // unsubscribe != Complete
    return () =>{
        console.log('llamaron al Unsubscribe o al Complete! me muero! ya no me ejecuto mas! era el Observable! chau!');
        clearInterval(intervalo);
    }
})

//Caso 1 me subscribo
//intervalos$.subscribe(obsserver);

//Caso 2, uso el settimeout para que a los 3 segs se unscribe. Pero el observable se sigue ejecutando.
const subs1 = intervalos$.subscribe(obsserver);
//Caso 3, agrego mas subs, pero quiero que cuando el subs1 haga el unsubs, se haga para los otros 2. Esto solo ejecuta el complete del 1.
// const subs2 = intervalos$.subscribe(obsserver);
// const subs3 = intervalos$.subscribe(obsserver);

//creacion de Subject. 
//Casteo multiple
//Es un observer
//Next, complete, error
const subject$ = new Subject();

//intervalos$.subscribe(subject$);
//Caso 5, asigno la subcipcion que me devuele el subscribe a una constante para luego hacer el unsubscribe.
const intevalosUbject = intervalos$.subscribe(subject$);
//caso de uso de subject para obtener el mismo valor del random en el subs 2 y 3. El uno sigue solo
const subs2 = subject$.subscribe(rnd => console.log('subs 2', rnd));
const subs3 = subject$.subscribe(rnd => console.log('subs 3', rnd));

setTimeout(() => {
    //caso 5, como el subject tambien es un observer, entonces uso su next y complete para emitir valores, ademas de los que emite el intervalos$
     subs1.unsubscribe();
    // subs2.unsubscribe();
    // subs3.unsubscribe();

    subject$.next(10);
    subject$.complete();
    //con este complete, no hace que el random se deje de ejecutar, ya que tengo el subject todavia activo, para que el setInterbal del random pare, necesito hacer el unsubscribe del subject.abs
    //subject$.unsubscribe(); --> asi en caso 5 da error pq bajo el subject pero tengo los dos subs2 y 3 activos.
    intevalosUbject.unsubscribe();
    console.log('timeout completado');
}, 9000);

