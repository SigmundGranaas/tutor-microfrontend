import React, { useEffect, useState } from 'react';
import './ArticlePage.css'
import { getConfig, mergeConfig } from '@edx/frontend-platform';
import axios from 'axios';

mergeConfig(
    {
      WORDPRESS_BASE_URL: process.env.WORDPRESS_BASE_URL,
    },
    'Articles'
  );

const WP_BASE_URL = getConfig().WORDPRESS_BASE_URL;

function ArticlePage(props) {
    const [article, setArticle] = useState({});
    const [image, setImage] = useState({});
    useEffect(() => {
        (async function getArticle(){
        try{
            let res = await axios.get(`${WP_BASE_URL}/wp-json/wp/v2/posts/${props.articleId}`);
            setArticle(res.data);
            if(article.title != undefined && article.featured_media != undefined && article.featured_media != 0){
            let resImage = await axios.get(`${WP_BASE_URL}/wp-json/wp/v2/media/${article.featured_media}`);
            setImage(resImage.data.source_url);
           
            }else{
              setImage(null);
            }
            
        }
            
        catch (err) {console.log(err)}
        })();

      }, [image]);
     
   return (
    <div className="articlePageDiv">
        {article.title != undefined? <div className="articleContent">
            <h1>{article.title.rendered}</h1>
            {image != null? <img src={image} />: ''}
            
            <div dangerouslySetInnerHTML={{
              __html:
              article.content.rendered ||
                '<p>No ping pong</p>',
            }}/>

        </div>: ""}
    </div> )
} 

export default ArticlePage;
