import {
    GET_COURSES,
    ERROR
  } from '../types';
  
  const defaultState = {
    courses: []
  };
  
  export default function(state = defaultState, action) {
  
    switch (action.type) {
      case GET_COURSES:
        return {
          ...state,
          courses: action.payload
        };

      case ERROR:
          return {
              ...state
          }
  
      default:
        return state;
    }
  };