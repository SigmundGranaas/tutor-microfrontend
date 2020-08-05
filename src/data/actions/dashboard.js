import { getAuthenticatedHttpClient as getHttpClient } from '@edx/frontend-platform/auth';
import {
  GET_COURSE_ENROLLMENTS,
  GET_PROGRAM_ENROLLMENTS,
  ERROR,
} from '../types';

import { getConfig } from '@edx/frontend-platform';

export const getCourseEnrollments = () => async (dispatch) => {
  try {

    
    // Fetch all enrolled courses
    const enrollments = await getHttpClient().get(
      `${getConfig().LMS_BASE_URL}/api/enrollment/v1/enrollment`
    );

    // This block of code returns a list of courses filtered by
    // course_ids from enrollments (since enrollments provided very few details about each course).
    // However this API endpoint does not actually do any filtering.
    // Will leave it as an example of how to join data from two endpoints
     const courses = await Promise.all(
       enrollments.data.map(async (enrollment) => {
         enrollment.discovery = await getHttpClient().get(
           `${
           process.env.DISCOVERY_BASE_URL}/api/v1/course_runs/${
           enrollment.course_details.course_id
           }`
         );
       return enrollment})
     );
 
    dispatch({
      type: GET_COURSE_ENROLLMENTS,
      payload: {
        isLoadingCourses: false,
        results: courses,
        count: courses.length
      }
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

export const getProgramEnrollments = () => async (dispatch) => {
  try {
    const res = await getHttpClient().get(
      `${
      getConfig().LMS_BASE_URL
      }/api/program_enrollments/v1/programs/enrollments/`
    );

    dispatch({
      type: GET_PROGRAM_ENROLLMENTS,
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
