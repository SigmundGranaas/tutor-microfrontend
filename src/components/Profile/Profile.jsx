import React, { useEffect, useContext } from 'react';

import { sendPageEvent } from '@edx/frontend-platform/analytics';

// import './Profile.css';
import Header from '../Layout/Header/Header';
import Footer from '../Layout/Footer';
import { injectIntl } from '@edx/frontend-platform/i18n';
import { AppContext } from '@edx/frontend-platform/react';
// import EdxProfile from '@edx/frontend-app-profile';

function Profile() {
  const { authenticatedUser, config } = useContext(AppContext);

  useEffect(() => {
    sendPageEvent('Profile');
  }, []);

  return (
    <div className="profile">
      <Header />
      <h1>{config.SITE_NAME} authenticated page.</h1>
      {authenticatedUser && <p>Hi there, {authenticatedUser.username}.</p>}
      <Footer />
    </div>
  );
}

export default injectIntl(Profile);
