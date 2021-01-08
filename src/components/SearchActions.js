import {SEARCH_DONE, SEARCH_TAG, ON_TAG_PRESS} from '../types';

export const searchDone = (results) => ({
  type: SEARCH_DONE,
  payload: results,
});

export const onTagPress = (tag) => ({
  type: ON_TAG_PRESS,
  payload: tag,
});

export const searchTag = (tag) => ({
  type: SEARCH_TAG,
  payload: tag,
});
