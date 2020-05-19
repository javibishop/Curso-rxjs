import {Observable, onErrorResumeNext, Observer} from 'rxjs';

//const obs$ = Observable.create();

//Caso 2, defino el observer y se lo paso a un subscribe.
const obsserver : Observer<any> = {
    next: value => console.log('siguiente [next]:', value),
    error: error => console.warn('error[obs]', error),
    complete: () => console.info('Completado [obs]')
}

//el obs emite strings!. TS valida esto.
const obs$ = new Observable<string>(subs => {
    //emite un hola a los subscribers
    subs.next('hola');

    subs.next('casi completo!');
    //a los subscript, desde aca, no les llega nada. 

    //genero un error
    // const a = undefined;
    // a.nombre = 'fernando';

    subs.complete();

    subs.next('estas ahi?');
});


//sino hay una subscription, el obs no se ejecuta ya que no tiene sentido sino hay subs.
//obs$.subscribe(console.log);

//Caso 1, defino dentro del subscribe, mi observer
// obs$.subscribe( 
//     valor => console.log('next:', valor), 
//     error => console.warn('error:', error),
//     () => console.info('Se ejecuto el Complete')
// );

//Caso 2, le paso el observer que defini
obs$.subscribe(obsserver);





