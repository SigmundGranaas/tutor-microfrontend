import { GET_ARTICLES, ERROR, GET_SINGLE_ARTICLE } from '../types';

const defaultState = {
  articles: [],
  article: [],
  isLoadingArticles: true,
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case GET_ARTICLES:
      return {
        ...state,
        articles: action.payload,
        isLoadingArticles: false,
      };
    case GET_SINGLE_ARTICLE:
      return {
        ...state,
        article: action.payload,
        isLoadingArticles: false,
      };

    case ERROR:
      return {
        ...state,
      };

    default:
      return state;
  }
}
