import { AGREGAR_PRODUCTO,AGREGAR_PRODUCTO_EXITO,AGREGAR_PRODUCTO_ERROR,
        COMENZAR_DESCARGA_PRODUCTOS, DESCARGA_PRODUCTOS_EXITO,DESCARGA_PRODUCTOS_ERROR,
        OBTENER_PRODUCTO_ELIMINAR,
        PRODUCTO_ELIMINADO_EXITO, PRODUCTO_ELIMINADO_ERROR,
        OBTENER_PRODUCTO_EDITAR, PRODUCTO_EDITADO_EXITO,PRODUCTO_EDITADO_ERROR,COMENZAR_EDICION_PRODUCTO
} from '../types';
import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';
//Crear nuevos productos 

export function crearNuevoProductoAction(producto){
    return  async (dispatch ) => {
        dispatch(agregarProducto());

        try{
            // insertar en la api
            await clienteAxios.post('/productos', producto);

            //si todo sale bien actualizar el state 
            dispatch( agregarProductoExito(producto));

            //Alerta
            Swal.fire(
                'Correcto',
                'El producto se agregó correctamente ',
                'success'
            );

        }catch(error){
            console.log(error);
            //si hay un error cambiar el state 
            dispatch( agregarProductoError(true));

            //Alerta de error
            Swal.fire(
              {
                  icon: 'error',
                  title: 'Hubo un error',
                  text: 'Ocurrió un error al guardar el producto'
              }
            );
        }


    }
}

const agregarProducto = () => ({
    type: AGREGAR_PRODUCTO,
    payload: true
})

//si el producto se guarda en la bd 
const agregarProductoExito = producto => ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
})

//si hubo un error
const agregarProductoError = estado => ({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: estado
})


//Funcion que descarga los productos de la base de datos 

export function obtenerProductosAction(){
    return async (dispatch) => {
        dispatch( descargarProductos());

        try {
            setTimeout( async () => {
                const respuesta = await  clienteAxios.get('/productos');
                console.log(respuesta.data);
                dispatch (descargaProductosExitosa(respuesta.data));
            }, 1500);
          
            //DESCARGA_PRODUCTOS_EXITO
            
        } catch (error) {
            dispatch (descargaProductosError(true));
            
        }
    }
}

const descargarProductos = () => ({
    type: COMENZAR_DESCARGA_PRODUCTOS,
    payload: true
})

const descargaProductosExitosa = productos => ({
    type: DESCARGA_PRODUCTOS_EXITO,
    payload: productos
})

const descargaProductosError = estado => ({
    type: DESCARGA_PRODUCTOS_ERROR,
    payload: estado
})

//Selecciona y elimina el producto
export function borrarProductoAction (id){

    return async ( dispatch ) => {
        
        dispatch( obtenerProductoEliminar(id));

        try {
            await clienteAxios.delete(`/productos/${id}`);
            dispatch( eliminarProductoExito() );

            //Si se elimina mostrar alarta 
            Swal.fire('Registro Eliminado!', 'El producto se elimino correctamente', 'success')

        } catch (error) {
            dispatch( eliminarProductoError() );
        }
    }
}

const obtenerProductoEliminar = (id) =>({
    type: OBTENER_PRODUCTO_ELIMINAR,
    payload: id
})

const eliminarProductoExito = () => ({
    type: PRODUCTO_ELIMINADO_EXITO
})

const eliminarProductoError = () => ({
    type: PRODUCTO_ELIMINADO_ERROR,
    payload: true
})


//Colocar producto en edicion
export function obtenerProductoEditar(producto) {
    return (dispatch) => {
        dispatch(obtenerProductoEditarAction(producto));
    }

}

const obtenerProductoEditarAction = producto => ({
    type: OBTENER_PRODUCTO_EDITAR,
    payload: producto
})


//Editar un registro en la api y state 
export function editarProductoAction(producto){
    return  async (dispatch) => {
        dispatch( editarProducto() )

        try {
            //sintaxis             url          id del producto  y el producto a eliminar       
            await clienteAxios.put(`/productos/${producto.id}`,producto);
            dispatch( editarProductoExito(producto));
        } catch (error) {
            console.log(error);
            dispatch(editarProductoError());
        }

    }
}

const editarProducto = () => ({
    type: COMENZAR_EDICION_PRODUCTO
})

const editarProductoExito= producto => ({
    type: PRODUCTO_EDITADO_EXITO,
    payload: producto
})

const editarProductoError= () =>({
    type: PRODUCTO_EDITADO_ERROR,
    payload: true
})