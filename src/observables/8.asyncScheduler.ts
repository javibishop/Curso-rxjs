import { asyncScheduler } from 'rxjs';
//asyncScheduler (se ejecuta en un x tiempo y hace el complete), interval(se ejecuta cada tiempo x) son asincronicos
const observer = {
    next: val => console.log('next:', val) ,
    complete: () => console.log('complete') 
}

//como un setTimeOut
const saludar = () => console.log('Hola pepe');
const saludar2 = (nombre) => console.log(`Hola ${nombre}`);
//si haria asyncScheduler.schedule(saludar(), 2000); los () harian que la funcion se ejecute ahi en ese momento.
asyncScheduler.schedule(saludar, 2000);
asyncScheduler.schedule(saludar2, 2000, 'Javier');

//como un SetInterval

