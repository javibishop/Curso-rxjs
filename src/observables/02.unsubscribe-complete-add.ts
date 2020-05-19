import {Observable, onErrorResumeNext, Observer} from 'rxjs';

//Caso 2, defino el observer y se lo paso a un subscribe.
const obsserver : Observer<any> = {
    next: value => console.log('next:', value),
    error: error => console.warn('error', error),
    complete: () => console.info('completado')
}

//genero el observable
const intervalos$ = new Observable<number>(subs =>{
    var contador = 0;
    // setInterval(() => {
    //     contador++;
    //     subs.next(contador);

    //     if(contador > 5){
    //         subs.complete()
    //     }
    //     //****esto es para que aunque se haga el unsubscribe, ver que el obs se sigue ejecutando, puede generar un problema de memoria.
    //     console.log(contador);
    // },1000)

    const intervalo = setInterval(() => {
        contador++;
        subs.next(contador);

        if(contador > 2){
            subs.complete()
        }
        //****esto es para que aunque se haga el unsubscribe, ver que el obs se sigue ejecutando, puede generar un problema de memoria.
        console.log(contador);
    },1000)

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
const subs2 = intervalos$.subscribe(obsserver);
const subs3 = intervalos$.subscribe(obsserver);

subs1.add(subs2).add(subs3);
setTimeout(() => {
    subs1.unsubscribe();
    subs2.unsubscribe();
    subs3.unsubscribe();
    console.log('timeout completado');
}, 3000);

