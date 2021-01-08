import {createStore, applyMiddleware} from 'redux';
import searchReducer from './components/SearchReducer';
import thunk from 'redux-thunk';

export default function configureStore() {
  return createStore(searchReducer, applyMiddleware(thunk));
}
