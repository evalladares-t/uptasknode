import Swal from "sweetalert2";
import Axios from "axios";

const btnEliminar = document.querySelector('#eliminar-proyecto');

if(btnEliminar){

    btnEliminar.addEventListener('click',e=>{
        const urlProyecto = e.target.dataset.proyectoUrl;

        Swal.fire({
            title: 'Deseas borrar este proyecto',
            text: "Un proyecto eliminado no se puede recuperar",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, Borrar',
            cancelButtonText:'No, cancelar'
        }).then((result) => {
            if (result.value) {
                //enviar petición a axios
                const url = `${location.origin}/proyectos/${urlProyecto}`;
                Axios.delete(url,{params:{urlProyecto}})
                    .then(function (response) {
                        Swal.fire(
                            'Proyecto eliminado!',
                            response.data,
                            'success'
                        );
                        setTimeout(()=>{
                            window.location.href = '/'
                        },3000);
                    })
                    .catch(()=>{
                        Swal.fire({
                            icon: 'error',
                            title: 'Hubo un error',
                            text: 'No se pudo eliminar el proyecto'
                        })
                    })

            }
        })
    });
}

export default btnEliminar;