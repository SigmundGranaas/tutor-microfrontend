export const ERROR = 'ERROR';
export const GET_COURSES = 'GET_COURSES';
export const GET_COURSE_ENROLLMENTS = 'GET_COURSE_ENROLLMENTS';
export const GET_PROGRAM_ENROLLMENTS = 'GET_PROGRAM_ENROLLMENTS';
export const GET_ARTICLES = 'GET_ARTICLES';
export const GET_SINGLE_ARTICLE = 'GET_SINGLE_ARTICLE'

export class AsyncActionType {
  constructor(topic, name) {
    this.topic = topic;
    this.name = name;
  }

  get BASE() {
    return `${this.topic}__${this.name}`;
  }

  get BEGIN() {
    return `${this.topic}__${this.name}__BEGIN`;
  }

  get SUCCESS() {
    return `${this.topic}__${this.name}__SUCCESS`;
  }

  get FAILURE() {
    return `${this.topic}__${this.name}__FAILURE`;
  }

  get RESET() {
    return `${this.topic}__${this.name}__RESET`;
  }
}
