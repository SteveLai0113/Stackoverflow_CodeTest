import {
  ON_TAG_PRESS,
  SEARCH_TAG,
  LOAD_QUESTIONS_DONE,
  SEARCH_TAG_START,
} from '../types';
import {combineReducers} from 'redux';
import Api from '../Api';

// import {combineReduv}
const DEFAULAT_STATE = {
  query: '',
  results: [],
  page: 1,
  pagesize: 20,
  loading: false,
};
const searchReducer = (state = DEFAULAT_STATE, action) => {
  switch (action.type) {
    case ON_TAG_PRESS:
      return {
        query: action.payload,
        results: state.results,
      };
    case SEARCH_TAG:
      return state;
    case LOAD_QUESTIONS_DONE:
      console.log('LOAD_QUESTIONS_DONE');
      return {
        query: state.query,
        results:
          action.payload.page <= 1
            ? action.payload.items
            : state.results.concat(action.payload.items),
        page: action.payload.page,
        pagesize: action.payload.pagesize,
        loading: false,
      };
    case SEARCH_TAG_START:
      return {
        query: action.payload,
        results: state.results,
        loading: true,
      };
    default:
      return state;
  }
};

export default combineReducers({
  searchState: searchReducer,
});
