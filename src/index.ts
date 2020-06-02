import { from } from 'rxjs';
import {filter} from 'rxjs/operators';

// range(1,10).pipe(
//     filter((value, index) =>{           //filter evalua una condicion y devuelve cuando es true.
//         console.log('index',index);
//         return value % 2 ===1;
//     })
// ).subscribe(console.log);
interface persona {
    tipo:string,
    nombre:string
}

const personas: Array<persona> = [
    {
        tipo:'h',
        nombre: 'batman'
    },
    {
        tipo:'h',
        nombre: 'robin'
    },
    {
        tipo:'v',
        nombre: 'guazon'
    }
]

//from crea un obs de un array, promise, iterable, object

const obs$ = from(personas).pipe(
    filter(p => p.tipo === 'h')
)

obs$.subscribe(console.log);