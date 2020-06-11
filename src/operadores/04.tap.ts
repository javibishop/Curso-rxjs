import { range } from 'rxjs';
import { tap, map } from 'rxjs/operators';
//el tap sierve para hacer algo adentro por cada valor del pipe.
const rang$ = range(1,5).pipe(
    tap( x => {
        console.log('antes', x)
        return 100; //este return aca no hace nada. en el tap el return no afecta, ya que el operador no devuelve nada.
    }),
    map( val => val * 10), //el tap no devuelve nada, por ende agarro lo que devuelve el pipe del range.
    //tap(x=> console.log('despues', x)) //imprime lo que devuelve el map y del tipo del map de arriba o del operador que esta antes. en este caso, map
    tap({
        next:valor => console.log('despues', valor), //aca armo un partial ovserver, q es como un observer, uso next y complete
        complete : () => console.log('finalizo todo')
    }) //imprime lo que devuelve el map y del tipo del map de arriba o del operador que esta antes. en este caso, map
);

rang$.subscribe(x=> console.log('subscript', x)); 