import React,{useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {editarProductoAction } from '../actions/productosAction';
import { useHistory } from 'react-router-dom';

import { mostrarAlerta,ocultarAlertaAction } from '../actions/alertaAction';

const EditarProducto = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    
    

    //Nuevo state de producto
    const [producto, guardarProducto ] = useState({
        nombre: '',
        precio: null
    })

    //Nuevo state de producto
    const [productoLocalStorage, guardarProductoLocalStorage ] = useState({
        nombre: '',
        precio: null
    })

    //producto a editar
    const productoEditar = useSelector(state => state.productos.productoEditar); //useSelector para acceder al state de la aplicacion 
    const alerta = useSelector( state => state.alerta.alerta);
    
    //console.log(productoEditar);
    
    //LLenar el state automaticamente
    useEffect(() => {
        if(productoEditar){
            //Guardar el producto a editar en el localstorage
            const serializedState = JSON.stringify(productoEditar);
            localStorage.setItem('productoEditar',serializedState);
            guardarProductoLocalStorage(productoEditar);
            guardarProducto(productoEditar);
        }else
        {
           //console.log( productoLocalStorage);
           //console.log( localStorage.getItem('productoEditar'));
            guardarProducto( localStorage.getItem('productoEditar'));
           // console.log(producto);
        }

    },[productoEditar]);

    //Leer los datos del formulario
    const onChangeFormulario = e =>{
        console.log(producto);
        guardarProducto({
            ...producto,
            [e.target.name] : e.target.value
        })
    }

    //console.log(producto);
    const { nombre, precio}  =producto;

    const submitEditarProducto = e => {
        e.preventDefault();

        //validar formulario
        if(nombre.trim() === '' || precio <= 0)
        {
            const alerta = {
                msg: 'Ambos campos son obligatorios',
                clases: 'alert alert-danger text-center text-uppercase p3'
            }
            
            dispatch(mostrarAlerta(alerta));
            return;
        }

        
        //si no hay errores
        console.log('se elimino el alerta');
        dispatch(ocultarAlertaAction());


        dispatch(editarProductoAction(producto));
        history.push('/');
    }
    return ( 
        <div className="row justify-content-center">
        <div className="col-md-8">
            <div className="card">
                <div className="card-body">
                    <h2 className="text-center md-4 font-weight-bold"> Editar Producto </h2>
                    { alerta ? <p className={ alerta.clases}> {alerta.msg}</p> : null }
                    <form 
                        onSubmit={submitEditarProducto}
                    >
                        <div className="form-group">
                            <label>Nombre producto</label>
                            <input type="text" className="form-control" placeholder="Nombre Producto" name="nombre" value={nombre} onChange={onChangeFormulario}/>
                        </div>
                        <div className="form-group">
                            <label>Precio producto</label>
                            <input type="number" className="form-control" placeholder="Precio Producto" name="precio"value={precio} onChange={onChangeFormulario}/>
                        </div>
                        <button type="submit" className="btn btn-primary font-weight-bold text-uppercase d-block w-100">
                            Guardar Cambios
                        </button>
                    </form>

                </div>

            </div>
        </div>
    </div>
     );
}
 
export default EditarProducto;
