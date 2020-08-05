import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { sendTrackEvent } from '@edx/frontend-platform/analytics';

// Local Components
import { Menu, MenuTrigger, MenuContent } from './Menu';
// import Avatar from '../../../assets/avatar.webp';
import Avatar from './Avatar';
import { LinkedLogo, Logo } from './Logo';
// import MyLinkedLogo from '../../../assets/MyLinkedLogo.png';
// import MyLogo from '../../../assets/MyLogo.png';

// i18n
import messages from '../../../data/messages/header';

// Assets
import { CaretIcon } from './Icons';

class DesktopHeader extends React.Component {
  constructor(props) {
    // eslint-disable-line no-useless-constructor
    super(props);
  }

  renderMainMenu() {
    const { mainMenu } = this.props;

    // Nodes are accepted as a prop
    if (!Array.isArray(mainMenu)) return mainMenu;

    return mainMenu.map((menuItem) => {
      const { type, href, active, hrefType, content, submenuContent } = menuItem;

      if (type === 'item') {
        if (hrefType === 'external') {
          return (
            <a key={`${type}-${content}`} className={active ? "nav-link active-link" : "nav-link"} href={href}>
              {content}
            </a>
          );
        }
        return (
          <Link
            key={`${type}-${content}`}
            className={active ? "nav-link active-link" : "nav-link"}
            to={href}
            onClick={sendTrackEvent('Link', {
              action: 'clicked',
              to: href,
              from: window.location.href,
            })}
          >
            {content}
          </Link>
        );
      }

      return (
        <Menu
          key={`${type}-${content}`}
          tag="div"
          className="nav-item"
          respondToPointerEvents
        >
          <MenuTrigger
            tag="a"
            className="nav-link d-inline-flex align-items-center"
            href={href}
          >
            {content} <CaretIcon role="img" aria-hidden focusable="false" />
          </MenuTrigger>
          <MenuContent className="pin-left pin-right shadow py-2">
            {submenuContent}
          </MenuContent>
        </Menu>
      );
    });
  }

  renderUserMenu() {
    const { userMenu, avatar, username, intl } = this.props;

    return (
      <Menu transitionClassName="menu-dropdown" transitionTimeout={250}>
        <MenuTrigger
          tag="button"
          aria-label={intl.formatMessage(
            messages['header.label.account.menu.for'],
            { username }
          )}
          className="btn btn-light d-inline-flex align-items-center pl-2 pr-3"
        >
          <Avatar size="1.5em" src={avatar} alt="" className="mr-2" />
          {username} <CaretIcon role="img" aria-hidden focusable="false" />
        </MenuTrigger>
        <MenuContent className="mb-0 dropdown-menu show dropdown-menu-right pin-right shadow py-2">
          {userMenu.map(({ type, href, hrefType, content }) =>
            hrefType === 'external' ? (
              <a
                className={`dropdown-${type}`}
                key={`${type}-${content}`}
                href={href}
              >
                {content}
              </a>
            ) : (
                <Link
                  className={`dropdown-${type}`}
                  key={`${type}-${content}`}
                  to={href}
                  onClick={sendTrackEvent('Link', {
                    action: 'clicked',
                    to: href,
                    from: window.location.href,
                  })}
                >
                  {content}
                </Link>
              )
          )}
        </MenuContent>
      </Menu>
    );
  }

  renderLoggedOutItems() {
    const { loggedOutItems } = this.props;

    return loggedOutItems.map((item, i, arr) =>
      item.hrefType === 'external' ? (
        <a
          key={`${item.type}-${item.content}`}
          className={
            i < arr.length - 1
              ? 'btn mr-2 btn-link'
              : 'btn mr-2 btn-outline-primary'
          }
          href={item.href}
        >
          {item.content}
        </a>
      ) : (
          <Link
            key={`${item.type}-${item.content}`}
            className={
              i < arr.length - 1
                ? 'btn mr-2 btn-link'
                : 'btn mr-2 btn-outline-primary'
            }
            to={item.href}
            onClick={sendTrackEvent('Link', {
              action: 'clicked',
              to: item.href,
              from: window.location.href,
            })}
          >
            {item.content}
          </Link>
        )
    );
  }

  render() {
    const { logo, logoAltText, logoDestination, loggedIn, intl } = this.props;
    const logoProps = { src: logo, alt: logoAltText, href: logoDestination };

    return (
      <header className="site-header-desktop">
        <div className="container-fluid">
          <div className="nav-container position-relative d-flex align-items-center">
            {logoDestination === null ? (
              <Logo className="logo" src={logo} alt={logoAltText} />
            ) : (
                <LinkedLogo className="logo" {...logoProps} />
              )}
            <nav
              aria-label={intl.formatMessage(messages['header.label.main.nav'])}
              className="nav main-nav"
            >
              {this.renderMainMenu()}
            </nav>
            <nav
              aria-label={intl.formatMessage(
                messages['header.label.secondary.nav']
              )}
              className="nav secondary-menu-container align-items-center ml-auto"
            >
              {loggedIn ? this.renderUserMenu() : this.renderLoggedOutItems()}
            </nav>
          </div>
        </div>
      </header>
    );
  }
}

DesktopHeader.propTypes = {
  mainMenu: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
  userMenu: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.oneOf(['item', 'menu']),
      href: PropTypes.string,
      content: PropTypes.string,
    })
  ),
  loggedOutItems: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.oneOf(['item', 'menu']),
      href: PropTypes.string,
      content: PropTypes.string,
    })
  ),
  logo: PropTypes.string,
  logoAltText: PropTypes.string,
  logoDestination: PropTypes.string,
  avatar: PropTypes.string,
  username: PropTypes.string,
  loggedIn: PropTypes.bool,

  // i18n
  intl: intlShape.isRequired,
};

DesktopHeader.defaultProps = {
  mainMenu: [],
  userMenu: [],
  loggedOutItems: [],
  logo: null,
  logoAltText: null,
  logoDestination: null,
  avatar: null,
  username: null,
  loggedIn: false,
};

export default injectIntl(DesktopHeader);
