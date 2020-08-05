import React, { useEffect, useState, Fragment, useContext } from 'react';
import ReactPaginate from 'react-paginate'
import { connect } from 'react-redux';
import { getArticles } from '../../data/actions/articles';
import ArticleCard from './ArticleCard'
import history from '../../data/history'
import {PAGE_SIZE_ARTICLE} from '../../data/constants'
import { SearchField} from '@edx/paragon'
import {sendPageEvent} from '@edx/frontend-platform/analytics';
import Header from '../Layout/Header/Header';
import Footer from '../Layout/Footer';
import ArticlePage from './ArticlePage';
import './articles.css';

function Articles({ getArticles, articles: { articles, isLoadingArticles } }) {
  const [offset, setOffset] = useState(0);
  const [filter, setFilter] = useState('');
  useEffect(() => {
    getArticles(offset, filter);
    sendPageEvent('Articles');
  }, []);

  const renderArticles = () => {
    const mock = [];
    for (let i = 0; i < articles.articles.length; i++) {
      articles.articles[i].featured_media != 0? articles.articles[i].featured_media = articles.articleImages[i].source_url : '' ;
      mock.push(articles.articles[i]);
    }
    return mock.map((article) => {
      return (
        <ArticleCard key="1" articleId={article.id} isOnHomePage={false}  cardType="Featured-course-3" title={article.title.rendered} imgSrc={article.featured_media} shortText={article.excerpt.rendered}/>

      );
    });
  };

  const pageUrl = page =>{
    let basePath = '/articles';
    if(page != 1){
      basePath= basePath.concat('/page/'+ page)
    }
    history.push(basePath)
  }
  
  const search = value => {
    console.log(value)
    setOffset(0);
    
    if(value != null){
      setFilter(value);
      getArticles(offset, value);}
    else{
      console.log('hola, empty me')
      setFilter('');
      getArticles(offset, filter);
    }
  }

  const handlePageClick = data => {
    pageUrl(data.selected + 1)
    let selected = data.selected;

    let offset = Math.ceil(selected*PAGE_SIZE_ARTICLE);
    setOffset(offset);
    console.log(filter);
    getArticles(offset, filter);
  };

  let isSingleArticle = () =>{
    if(window.location.pathname == '/articles' || window.location.pathname == '/articles/' || window.location.pathname.includes('/page')){
      return false;
    }else{
      return true;
    }
  }

  let findArticleId = window.location.pathname.split('/')[2]


  return (
    <Fragment>
      <div>
      <Header articlesLink={false} />
      {!isSingleArticle() ? 
      <div className="articlesBackground">
      <div className="articles-header">
          <h2>Articles</h2>
        </div>
        <div className="searchField">
          <SearchField 
              
              onSubmit={(filter) => {
                  search(filter);
              }}
              onChange={(filter) => {
                search(filter);
            }}
            />
           </div>
      <div className="articles">
        <div className="articles-content">
          {isLoadingArticles ? <p>Loading...</p> : renderArticles()}
        </div>
        <div className="paginateDADDY">
      <ReactPaginate
          previousLabel={<i class="fa fa-chevron-left"></i>}
          nextLabel={<i class="fa fa-chevron-right"></i>}
          breakLabel={'...'}
          breakClassName={'pagination-break'}
          pageCount={Math.ceil(articles.total)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={'pagination-container'}
          pageClassName={'pagespagination'}
          activeClassName={'pagination-active'}
          previousClassName={'pagination-previous'}
          nextClassName={'pagination-next'}
          activeLinkClassName={'pagination-active-page'}
          nextLinkClassName={'pagination-active'}
          previousLinkClassName={'pagination-active'}
          pageLinkClassName={'pagination-active'}
        /> 
      </div>
      </div>
        </div>:
         <div> 
           {isLoadingArticles ? <p>Loading...</p> : <div><ArticlePage articleId={findArticleId} />
           </div>}
          </div>}
      <Footer />
      </div>
     
    </Fragment>
   
  );
}

const mapStateToProps = (state) => ({
  articles: state.articles,
});

export default connect(mapStateToProps, { getArticles })(Articles);
