import axios from 'axios';
import { GET_ARTICLES, ERROR } from '../types';

import { getConfig, mergeConfig, ensureConfig } from '@edx/frontend-platform';
import { PAGE_SIZE_ARTICLE } from '../constants';

// ensureConfig(['WORDPRESS_BASE_URL']);

mergeConfig(
  {
    WORDPRESS_BASE_URL: process.env.WORDPRESS_BASE_URL,
  },
  'Articles'
);

const WP_BASE_URL = getConfig().WORDPRESS_BASE_URL;

export const getSingleArticle = (id) => async (dispatch) => {
  
  try {
    const res = await axios.get(`${WP_BASE_URL}/wp-json/wp/v2/posts/${id}`);
    dispatch({
      type: GET_SINGLE_ARTICLE,
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

// Get courses
export const getArticles = (offset, search='', categories='') => async (dispatch) => {
  try {
    const res = await axios.get(`${WP_BASE_URL}/wp-json/wp/v2/posts?${categories}search=${search}&offset=${offset}&per_page=${PAGE_SIZE_ARTICLE}`);
    const articleImages = await Promise.all(
      res.data.map(async (article) => {
        return article.featured_media != 0?  await axios.get(`${WP_BASE_URL}/wp-json/wp/v2/media/${article.featured_media}`):  {data:{source_url:'0'}};
      })
    );
    const articlesImagesFilter = articleImages.map((articleImage) => articleImage.data);
    const completeArticles = {
      articles:res.data,
      articleImages:articlesImagesFilter,
      totalPages:res.headers[Object.keys(res.headers)[1]],
      total:res.headers[Object.keys(res.headers)[2]],
    }
    
    dispatch({
      type: GET_ARTICLES,
      payload: completeArticles,
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
