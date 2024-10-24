import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from './rootReducer';

export default store = createStore(rootReducer, applyMiddleware(thunk));