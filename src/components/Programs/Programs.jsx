import React, { Fragment, useEffect } from 'react';
import { sendPageEvent } from '@edx/frontend-platform/analytics';

import Header from '../Layout/Header/Header';
import Footer from '../Layout/Footer';

function Programs() {
  useEffect(() => {
    sendPageEvent('Programs');
  }, []);

  return (
    <Fragment>
      <Header programsLink={true} />
      <div className="programs" style={{ textAlign: 'center' }}>
        <h2>Programs</h2>
      </div>
      <Footer />
    </Fragment>
  );
}

export default Programs;
