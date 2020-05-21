import { fromEvent } from 'rxjs';
//fromEvent es SINC y me crea un observer de cada evento del dom que quiero.
const event1$ = fromEvent<MouseEvent>(document, 'click');
const event2$ = fromEvent<KeyboardEvent>(document, 'keyup');
const observer = {
    next: val => console.log(val) 
}
event1$.subscribe(observer);
event1$.subscribe({
    next: val => console.log(val.x, val.y)
})

event1$.subscribe({
    next: ({x,y}) => console.log(x, y)
})


event2$.subscribe({
    next: val => console.log(val.keyCode, val.key)
});
