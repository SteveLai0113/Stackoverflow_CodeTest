import {STACKOVERFLOW_APIKEY} from '@env';
import {LOAD_QUESTIONS_DONE} from './types';

const loadQuestions = (tag, page = 1, pagesize = 20) => {
  return function (dispatch) {
    dispatch(searchTagStart(tag));
    let api =
      'https://api.stackexchange.com/2.2/questions?page=' +
      page +
      '&pagesize=' +
      pagesize +
      '&order=desc&sort=activity&tagged=' +
      encodeURIComponent(tag) +
      '&site=stackoverflow';

    console.log(api);
    fetch(api, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'applcation/json; charset=utf-8',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        dispatch({
          type: LOAD_QUESTIONS_DONE,
          payload: {items: json.items, page: page, pagesize: pagesize},
        });
      })
      .catch((error) => {
        throw error;
      });
  };
};

const searchTagStart = (query) => ({
  type: 'SEARCH_TAG_START',
  payload: query,
});

// const loadQuestionStart = queryObject => ()

export default {loadQuestions};
