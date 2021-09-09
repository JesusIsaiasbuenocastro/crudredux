import React , {  useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//useSelector: Es el hook que da ridux para leer lo que esta en el state 

//Actions de redux
import { crearNuevoProductoAction } from '../actions/productosAction';
import { mostrarAlerta,ocultarAlertaAction } from '../actions/alertaAction';

const NuevoProducto = ({history}) => {

    //state del componente 
    const [nombre, guardarNombre] = useState('');
    const [precio, guardarPrecio] = useState(0);

    //utilizar usedispatch  y te crea una funcion
    const dispatch = useDispatch();

    //acceder al state del store 
    const cargando = useSelector( state => state.productos.loading );
    const error = useSelector( state => state.productos.error );
    const alerta = useSelector( state => state.alerta.alerta)

    
    //borrar el mensaje del state cuando inicia la pantalla
    dispatch(ocultarAlertaAction());

    //mandar llamar el action de producto action
    const agregarProducto = (producto) => dispatch( crearNuevoProductoAction(producto) );

    //cuando el usario haga submit 
    const submitNuevoProducto = e => {
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
        dispatch(ocultarAlertaAction());


        //crear el nuevo producto 
        agregarProducto({
            nombre,
            precio
        });

        //redireccionar al home
        history.push('/');
    }

    return (
    <div className="row justify-content-center">
        <div className="col-md-8">
            <div className="card">
                <div className="card-body">
                    <h2 className="text-center md-4 font-weight-bold"> Agregar Nuevo Producto </h2>
                    { alerta ? <p className={ alerta.clases}> {alerta.msg}</p> : null }
                    <form
                        onSubmit={ submitNuevoProducto }
                    >
                        <div className="form-group">
                            <label>Nombre producto</label>
                            <input type="text" className="form-control" placeholder="Nombre Producto" name="nombre" value = {nombre} onChange={ e => guardarNombre(e.target.value) }/>
                        </div>
                        <div className="form-group">
                            <label>Precio producto</label>
                            <input type="number" className="form-control" placeholder="Precio Producto" name="precio" value = {precio} onChange={ e => guardarPrecio(Number(e.target.value)) } />
                        </div>
                        <button type="submit" className="btn btn-primary font-weight-bold text-uppercase d-block w-100">
                            Agregar
                        </button>
                    </form>


                    {cargando  ? <p>Cargando...</p> : null}
                    { error ? <p className="alert alert-danger p2 mt-4 text-center">Hubo un error</p> : null }

                </div>

            </div>
        </div>
    </div>
    
    );
}
 
export default NuevoProducto;