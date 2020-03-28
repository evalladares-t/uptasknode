import proyectos from './modules/proyectos';
import tareas from './modules/tareas';
import {actualizarAvance} from './funcions/avance';
import Swal from "sweetalert2";

document.addEventListener('DOMContentLoaded',()=>{
    actualizarAvance();
});
