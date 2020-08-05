import React, { useEffect} from 'react';
import { connect } from 'react-redux';
import { getCourses } from '../../data/actions/courses';
import { getArticles } from '../../data/actions/articles';
import Coursecard from '../courses/CourseCard'
import ArticleCard from '../Articles/ArticleCard'
import Carousel from "./Carousel";
import "react-multi-carousel/lib/styles.css";
import UserStory from './UserStory';
import { sendPageEvent } from '@edx/frontend-platform/analytics';
import './Landing.css';
import Header from '../Layout/Header/Header';
import Footer from '../Layout/Footer'
import {Link} from 'react-router-dom';

const featuredCategoryQuery = "categories[]=3&categories[]=4&categories[]=5&"

function Landing({ getArticles, articles: { articles} , getCourses, courses: {courses}}) {
    useEffect(() => {
    sendPageEvent('Landing');
    getCourses();
    getArticles(0, '', featuredCategoryQuery);
  }, [])
  
   const renderCourses = () => {
    let elements = [];
    if(courses.results != undefined && courses.results.length != 0 ){
     courses.results.map((course) => {
       elements.push(
        <Coursecard key={course.key} cardType="Card" 
        anchor={`${process.env.LMS_BASE_URL}/courses/${course.key}/about`} 
        name={course.name} 
        imgSrc={course.media.image.small}
        short_description={course.short_description} />
       );
     });
    };
     return elements.length == 0?<p>No courses found</p>:elements;
    };

    const renderFeaturedArticles = () => {
    let elements = [];
    console.log(articles);     
    if(articles.articles != undefined && articles.articles.length != 0 ){
      articles.articles.sort((a,b) => a.categories[0] - b.categories[0]).map((article) => {
        let articleCard = '';
         if(article.categories[0] == 3){
          articleCard = <ArticleCard key={article.id} articleId={article.id} isOnHomePage={true}  cardType="Featured-course-1" title={article.title.rendered} imgSrc={articles.articleImages[articles.articles.indexOf(article)].source_url} shortText={article.excerpt.rendered}/>
         }else if(article.categories[0] == 4){
          articleCard = <ArticleCard key={article.id} articleId={article.id} isOnHomePage={true}  cardType="Featured-course-2" title={article.title.rendered} imgSrc={articles.articleImages[articles.articles.indexOf(article)].source_url} shortText={article.excerpt.rendered}/>
         }else if(article.categories[0] == 5){
          articleCard = <ArticleCard key={article.id} articleId={article.id} isOnHomePage={true}  cardType="Featured-course-3" title={article.title.rendered} imgSrc={articles.articleImages[articles.articles.indexOf(article)].source_url} shortText={article.excerpt.rendered}/>
         }
       elements.push(articleCard);
     });
    };
     return elements.length == 0?<p>No courses found</p>:elements;
    };

    const renderAndreas = () => {
      let elements = []
      for(let i = 0; i < 4; i++){
        elements.push( <UserStory name="Andreas Krokan" text="Edx platformen har gitt meg uendelig mange muligheter" imgSrc="https://digit.ntnu.no/assets/courseware/v1/37dc5a0b469813d19fd6671ff3ce67ee/asset-v1:NTNU+EDU6211+2020_h+type@asset+block/andreas_krokan.png"/>);
      }
      return elements
    }

  return (
    <div className="landing">
        <Header homeLink={false} />
        <div className="landing-intro">
          <div className="landing-intro-text-div">
        <h3>Introduction to landing page</h3>
        <hr/>
        <p>NTNU's digital course library provides students with the resources they need to succeed.</p>
        </div>
        </div>
        <div className="landing-content">
          <div>
          <div className="course-div">
            <div className="course-paragraph-div">
            <h3 className="course-header">Learn from the best teachers at NTNU</h3>
            
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            </div>
          <img className="krokan" src="https://digit.ntnu.no/assets/courseware/v1/37dc5a0b469813d19fd6671ff3ce67ee/asset-v1:NTNU+EDU6211+2020_h+type@asset+block/andreas_krokan.png"/>
          </div>
          <hr className="landing-hr"/>
          </div>
          <div className="landing-featured-courses">
          <div className="landing-featured-courses-text-div">
        <h3>Explore our course catalouge</h3>
        <hr landing-hr/>
        <p>NTNU's digital course library provides students with the resources they need to succeed.</p>
        <div className="more-course-button-div">
          <Link to='/courses' className="more-course-button">All courses</Link>
          </div>
        </div>
        </div>
          <div className="CourseCarousel">
            <Carousel render={renderCourses} noItems={3}/>
            </div>
            
          <hr className="landing-hr"/>
          <div className="article-div">
          <div className="landing-featured-articles">
          <div className="landing-featured-articles-text-div">
        <h3>Stay on top of our news</h3>
        <hr landing-hr/>
        <p>We are constantly updating and releasing new content. Take a look at our articles to find the latest information.</p>
        <div className="more-course-button-div">
          <Link to='/articles' className="more-course-button">All articles</Link>
          </div>
        </div>
        </div>
          <div className="articles">
              {renderFeaturedArticles()}
            </div> 
          </div>
          <hr className="landing-hr"/>
        <div class='landing-recommendation-div'>
        <div class='landing-recommendation-text-div'>
        <h4>My experience with openEDX</h4>
        <blockquote cite="Sofie">
        The best way to give your testimonial a boost is by adding a compelling summary sub-headline above it. This could be as simple as pulling a powerful quote from a longer testimonial or creating your own copy that nicely sums up the value of the testimonial.

By adding a sub-headline, you’ll not only draw more attention to your testimonial but entice your visitor to actually read what should be your most powerful form of social proof on your site.
        </blockquote>
        
        </div>
        <div>
            <img src='src\components\Landing\assets\sofie1.jpg' class='landing-recommendation-img-div' />
          </div>
      </div>
          <div className="landing-renderAndreas-div">
          <Carousel render={renderAndreas} noItems={2} />
          </div>
          <hr className="landing-hr"/>
        </div>

        <Footer />
  
    </div>
    
  );
}

const mapStateToProps = state => ({
  courses: state.courses,
  articles: state.articles,
})

export default connect(mapStateToProps, { getCourses, getArticles })(Landing);