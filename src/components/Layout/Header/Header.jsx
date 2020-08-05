import React, { useContext } from 'react';
import Responsive from 'react-responsive';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { AppContext } from '@edx/frontend-platform/react';
import { ensureConfig } from '@edx/frontend-platform/config';
import DesktopHeader from './DesktopHeader';
import MobileHeader from './MobileHeader';
import logo from '../../../assets/ntnu_alt_versjon_uten_slagord.png'
import messages from '../../../data/messages/header';

ensureConfig([
  'LMS_BASE_URL',
  'LOGOUT_URL',
  'LOGIN_URL',
  'SITE_NAME',
  'BASE_URL'
], 'Header component');

function Header({ intl, homeLink, coursesLink, articlesLink, programsLink, aboutLink }) {
  const { authenticatedUser, config } = useContext(AppContext);

  const mainMenu = []

  console.log(window.location.href)

  mainMenu.push({
    type: 'item',
    href: `/`,
    active: homeLink,
    content: intl.formatMessage(messages['header.links.home'])
  })
  mainMenu.push({
    type: 'item',
    href: `/programs`,
    active: programsLink,
    content: intl.formatMessage(messages['header.links.programs']),
  })
  mainMenu.push({
    type: 'item',
    href: `/courses`,
    active: coursesLink,
    content: intl.formatMessage(messages['header.links.courses']),
  })
  mainMenu.push({
    type: 'item',
    href: `/articles`,
    active: articlesLink,
    content: intl.formatMessage(messages['header.links.articles']),
  })
  mainMenu.push({
    type: 'item',
    href: `/about`,
    active: aboutLink,
    content: intl.formatMessage(messages['header.links.about']),
  })

  const userMenu = authenticatedUser === null ? [] : [
    {
      type: 'item',
      href: `/dashboard`,
      content: intl.formatMessage(messages['header.user.menu.dashboard']),
    },
    {
      type: 'item',
      href: `/profile/${authenticatedUser.username}`,
      content: intl.formatMessage(messages['header.user.menu.profile']),
    },
    {
      type: 'item',
      href: `${config.LMS_BASE_URL}/dashboard`,
      hrefType: 'external',
      content: intl.formatMessage(messages['header.user.menu.lms.dashboard']),
    },
    {
      type: 'item',
      href: `${config.LMS_BASE_URL}/account/settings`,
      hrefType: 'external',
      content: intl.formatMessage(messages['header.user.menu.lms.account.settings']),
    },
    {
      type: 'item',
      href: `${config.LOGOUT_URL}?next=${encodeURIComponent(config.BASE_URL)}`,
      hrefType: 'external',
      content: intl.formatMessage(messages['header.user.menu.logout']),
    },
  ];

  const loggedOutItems = [
    {
      type: 'item',
      href: `${config.LOGIN_URL}?next=${encodeURIComponent(config.BASE_URL)}`,
      hrefType: 'external',
      content: intl.formatMessage(messages['header.user.menu.login']),
    },
    {
      type: 'item',
      href: `${config.LMS_BASE_URL}/register`,
      hrefType: 'external',
      content: intl.formatMessage(messages['header.user.menu.register']),
    },
  ];

  const props = {
    logo: logo,
    logoAltText: config.SITE_NAME,
    siteName: config.SITE_NAME,
    logoDestination: `${config.BASE_URL}/`,
    loggedIn: authenticatedUser !== null,
    username: authenticatedUser !== null ? authenticatedUser.username : null,
    avatar: authenticatedUser !== null ? authenticatedUser.avatar : null,
    mainMenu,
    userMenu,
    loggedOutItems,
  };

  return (
    <React.Fragment>
      <Responsive maxWidth={768}>
        <MobileHeader {...props} />
      </Responsive>
      <Responsive minWidth={769}>
        <DesktopHeader {...props} />
      </Responsive>
    </React.Fragment>
  );
}

Header.propTypes = {
  intl: intlShape.isRequired,
};

Header.defaultProps = {
  homeLink: false,
  coursesLink: false,
  articlesLink: false,
  programsLink: false,
  aboutLink: false
}

export default injectIntl(Header);