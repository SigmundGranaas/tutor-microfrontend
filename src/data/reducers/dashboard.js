import {
  GET_COURSE_ENROLLMENTS,
  GET_PROGRAM_ENROLLMENTS,
  ERROR,
} from '../types';

const defaultState = {
  isLoadingCourses: true,
  isLoadingPrograms: true,
  courseEnrollments: [],
  courseEnrollmentCount: 0,
  programEnrollments: [],
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case GET_COURSE_ENROLLMENTS:
      return {
        ...state,
        courseEnrollments: action.payload.results,
        courseEnrollmentCount: action.payload.count,
        isLoadingCourses: false,
      };

    case GET_PROGRAM_ENROLLMENTS:
      return {
        ...state,
        programEnrollments: action.payload,
        isLoadingPrograms: false,
      };

    case ERROR:
      return {
        state,
      };

    default:
      return state;
  }
}
