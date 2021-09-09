import React from 'react';
import { useHistory}  from 'react-router-dom';
import Swal from 'sweetalert2';

//redux
import { useDispatch } from 'react-redux';
import { borrarProductoAction,obtenerProductoEditar } from '../actions/productosAction'

const Producto = ({producto}) => {
    const {nombre, precio, id } = producto;

    const dispatch = useDispatch(); //Este se requiere para ejecutar las funciones si no, no funciona
    const history = useHistory(); //Habilitar history para redireccion

    //confirmar si desea eliminarlo
    const confirmarEliminarProducto = id => {

        //preguntar al usuario 
        Swal.fire({
            title: '¿Estas seguro un producto que se elimina no se puede recuperar?',
            showDenyButton: true,
            confirmButtonText: `Eliminar`,
            denyButtonText: `Cancelar`,
            icon: 'info'
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {

                //pasarlo al action 
                dispatch(borrarProductoAction(id))
                
            } 
          })

    }

    //funcion que redirige de forma programada
    const redireccionarEdicion = producto => {
        dispatch( obtenerProductoEditar(producto) );
        history.push(`/productos/editar/${producto.id}`)
    }

    return ( 
        <tr>
            <td>{nombre}</td>
            <td> <span className="font-weight-bold"> $ {precio} </span></td>
            <td className="acciones"> 
                <button type="button" onClick={ ()=> redireccionarEdicion(producto) } className="btn btn-primary mr-2">Editar</button>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick= {()=>confirmarEliminarProducto(id)}
                >
                    Eliminar
                </button>
            </td>
        </tr>

     );
}
 
export default Producto;