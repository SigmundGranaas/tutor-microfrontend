import { combineReducers } from 'redux';
import courses from './courses.js';
import { connectRouter } from 'connected-react-router';
import profilePage from './profile';
import dashboard from './dashboard';
import articles from './articles';


const createRootReducer = (history) =>
  combineReducers({
    courses: courses,
    router: connectRouter(history),
    profilePage: profilePage,
    dashboard: dashboard,
    articles: articles,
  });
export default createRootReducer;
