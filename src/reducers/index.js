import { combineReducers } from 'redux';
import productoReducer from './productosReducer';
import alertaReducer from './alertaReducers';

export default combineReducers({
    productos: productoReducer,
    alerta: alertaReducer
});