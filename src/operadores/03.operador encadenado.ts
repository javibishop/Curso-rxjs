import { fromEvent } from 'rxjs';
import { filter, map } from 'rxjs/operators';

const keyup = fromEvent<KeyboardEvent>(document, 'keyup').pipe(
    map(event => event.code), //del event, saco el code
    filter(key => key=== "Enter") //y filtro la tecla enter
);

keyup.subscribe(console.log);