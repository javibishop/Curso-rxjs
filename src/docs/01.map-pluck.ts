import { range, fromEvent } from 'rxjs';
import {map, pluck, mapTo} from 'rxjs/operators';

// range(1,5).pipe(
//     map<number, string>(val => (val * 10).toString())
// ).subscribe(console.log);
//pipe permite usar un operador adentro de pipe. aca ejecuta el map. map transforma una entrada en una salida.
const keyup = fromEvent<KeyboardEvent>(document, 'keyup');
const evn$ = keyup.pipe(
    map(key => key.code)
);

const epluck$ = keyup.pipe(
    pluck('target','baseURI') //pluck extrae por nombre de propiedad dentro de un objeto valores.
);

const mapto$= keyup.pipe(
    mapTo('Hola') //por cada uno, devuelve Hola
);

evn$.subscribe(console.log);
epluck$.subscribe(val => console.log('pluck', val));
mapto$.subscribe(val => console.log('mapto', val));