import axios from "axios";
import Swal from "sweetalert2";
import {actualizarAvance} from '../funcions/avance';

const tareas = document.querySelector('.listado-pendientes');

if(tareas){
    tareas.addEventListener('click',e=>{
        if (e.target.classList.contains('fa-check-circle')){
            const icono = e.target;
            const idTarea = icono.parentElement.parentElement.dataset.tarea;
            const url = `${location.origin}/tareas/${idTarea}`;
            axios.patch(url,{idTarea})
                .then((response)=>{
                    if(response.status===200){
                        icono.classList.toggle('completo');

                        actualizarAvance();
                    }
                })
        }
        if (e.target.classList.contains('fa-trash')){
            const TareaHTML = e.target.parentElement.parentElement;
            const idTarea = TareaHTML.dataset.tarea;
            console.log(TareaHTML);
            Swal.fire({
                title: 'Deseas borrar esta tarea',
                text: "Una tarea eliminada no se puede recuperar",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, Borrar',
                cancelButtonText:'No, cancelar'
            }).then((result)=>{
                if(result.value){
                    const url = `${location.origin}/tareas/${idTarea}`;
                    axios.delete(url,{params:{idTarea}})
                        .then((response)=>{
                            if(response.status===200){
                                Swal.fire(
                                    'Tarea eliminada!',
                                    response.data,
                                    'success'
                                );
                                TareaHTML.parentElement.removeChild(TareaHTML);
                                actualizarAvance();

                            }
                        })
                }
            })
        }
    })
}

export default tareas;