import React, { useEffect, Fragment, useState } from 'react';
import axios from 'axios';
import { getConfig } from '@edx/frontend-platform';

import './about.css';
import Header from '../Layout/Header/Header';
import Footer from '../Layout/Footer';

const WP_BASE_URL = getConfig().WORDPRESS_BASE_URL;

function About() {

    const [about, setAbout] = useState(null);

    useEffect(() => {
        getAboutPage()
    }, []);

    // /wp-json/wp/v2/pages/<id> must match exactly
    const getAboutPage = () => {
        axios.get(`${WP_BASE_URL}/wp-json/wp/v2/pages/10`)
            .then(res => setAbout(res.data))
    }

    const renderAboutPage = () => {
        return (
            about === null ? <p>Loading...</p> : (
                <Fragment>
                    <h2>{about.title.rendered}</h2>
                    <div
                        dangerouslySetInnerHTML={{
                            __html:
                                about.content.rendered
                        }}
                    />
                </Fragment>
            )
        )

    }


    // const resizeIframe = obj => {
    //     obj.style.height = obj.contentWindow.document.documentElement.scrollHeight + 'px';
    // }


    return (
        <div className="about">
            <Header aboutLink={false} />
            <div className="about-content">
                {renderAboutPage()}
            </div>
            <Footer />
        </div >
    );
}

export default About;