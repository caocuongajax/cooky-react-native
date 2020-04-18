//import cartReducer from './cart';
//import cartInfoReducer from './cartInfo';
import clientReducer from './client';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    //product: productReducer,
    //cart: cartReducer,
    //cartInfo: cartInfoReducer,
    client: clientReducer
}) 
export default rootReducer;