import qs from 'query-string';
import history from '../data/history'
import camelCase from 'lodash.camelcase';
import snakeCase from 'lodash.snakecase';

const updateUrl = (queryOptions) => {
  console.log(queryOptions)
  if (!queryOptions) {
    return;
  }
  const currentQuery = qs.parse(window.location.search);
  console.log(currentQuery)
  // Apply any updates passed in over the current query. This requires consumers to explicitly
  // pass in parameters they want to remove, such as resetting the page when sorting, but ensures
  // that we bring forward all other params such as feature flags
  const newQuery = {
    ...currentQuery,
    ...queryOptions,
  };

  // Because we show page 1 by default, theres no reason to set the url to page=1
  if (newQuery.page === 1) {
    newQuery.page = undefined;
  }
  console.log(newQuery);
  const newQueryString = `?${qs.stringify(newQuery)}`;
  console.log(newQueryString);
  if (newQueryString !== window.location.search) {
    history.push(newQueryString);
  }
};
// Returns an object containing pagination options (page_size, page, ordering) based on the current
// window location's query string, or, if not set in the window location uses defaults values.
const getPageOptionsFromUrl = () => {
  // TODO: this will not support multiple tables paging on a single page. Will need to prefix url
  // params with table id (or some other mechanism) if this becomes a feature requirement
  const defaults = {
    pageSize: PAGE_SIZE,
    page: 1,
    ordering: 'title',
    filter: undefined,
    editors: undefined,
    course_run_statuses: undefined,
  };
  const query = qs.parse(window.location.search);
  return {
    page_size: parseInt(query.page_size, 10) || defaults.pageSize,
    page: parseInt(query.page, 10) || defaults.page,
    ordering: query.ordering || defaults.ordering,
    pubq: query.filter || defaults.filter,
    editors: query.editors || defaults.editors,
    course_run_statuses: query.course_run_statuses || defaults.course_run_statuses,
  };
};
export{
  getPageOptionsFromUrl,
  updateUrl,
}


export const formatDate = (d) => {
  const date = new Date(Date.parse(d));
  const dateTimeFormat = new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  });
  const [
    { value: month },
    ,
    { value: day },
    ,
    { value: year },
  ] = dateTimeFormat.formatToParts(date);

  return day + '-' + month + '-' + year;
};

export const truncateString = (string, length = 30) => {
  if (string.length > length) {
    return string.slice(0, length);
  }
  return string;
};

export function modifyObjectKeys(object, modify) {
  // If the passed in object is not an object, return it.
  if (
    object === undefined ||
    object === null ||
    (typeof object !== 'object' && !Array.isArray(object))
  ) {
    return object;
  }

  if (Array.isArray(object)) {
    return object.map((value) => modifyObjectKeys(value, modify));
  }

  // Otherwise, process all its keys.
  const result = {};
  Object.entries(object).forEach(([key, value]) => {
    result[modify(key)] = modifyObjectKeys(value, modify);
  });
  return result;
}

export function camelCaseObject(object) {
  return modifyObjectKeys(object, camelCase);
}

export function snakeCaseObject(object) {
  return modifyObjectKeys(object, snakeCase);
}

export function convertKeyNames(object, nameMap) {
  const transformer = (key) =>
    nameMap[key] === undefined ? key : nameMap[key];

  return modifyObjectKeys(object, transformer);
}
