import { GET_COURSES, ERROR } from '../types';
import DiscoveryDataApiService from '../services/DiscoveryDataApiService';

// Get courses
export const getCourses = (options) => async (dispatch) => {
  try {
    const res = await DiscoveryDataApiService.fetchCourses(options);
    dispatch({
      type: GET_COURSES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
      payload: {
        error: err,
      },
    });
  }
};