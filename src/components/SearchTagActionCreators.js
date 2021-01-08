import {ON_TAG_PRESS, SEARCH_TAG} from '../types';
import {createStore} from 'redux';
import searchReducer from './SearchReducer';
const store = createStore(searchReducer);

export function onTagPress(tag) {
  return {
    type: ON_TAG_PRESS,
    payload: tag,
  };
}

export function searchTag(tag) {
  return {
    type: SEARCH_TAG,
    payload: tag,
  };
}
