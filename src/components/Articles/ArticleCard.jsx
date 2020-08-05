import React from 'react';
import './ArticleCard.css'
import { Route, Link} from 'react-router-dom';
import ArticlePage from './ArticlePage'


function ArticleCard(props) {
  let url = '/articles/' + props.articleId;
   return (
    <div className={props.cardType}>
        <img src={props.imgSrc != '0'? props.imgSrc: "https://digit.ntnu.no/assets/courseware/v1/37dc5a0b469813d19fd6671ff3ce67ee/asset-v1:NTNU+EDU6211+2020_h+type@asset+block/andreas_krokan.png" } alt="" className="CourseCardImage"/>
        <div className="articleCardContent">
          <div className="articleCardTextContent">
            <h4><a href={props.anchor} className="Card_title">{props.title}</a></h4>
            <div className="smallText"
            dangerouslySetInnerHTML={{
              __html:
                props.shortText ||
                '<p>No short description available</p>',
            }}
          /> </div>
          
        <div className="articleCardContentButtonDiv" >
        <Link className="articleCardContentButtonLink"  to={url} ><button className="fuckboibttn" onClick={window.location.href="localhost:8080/articles"}>Read more</button></Link>
        <Route path="/articles/:id" render={() => 
          <ArticlePage articleId={props.articleId}/>
        }></Route> </div>
      </div>
       
      
    </div> )
}

export default ArticleCard;