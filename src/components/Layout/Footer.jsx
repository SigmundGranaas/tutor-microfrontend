import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { sendTrackEvent } from '@edx/frontend-platform/analytics';
import messages from '../../data/messages/footer';
import FooterLogo from '../../assets/ntnu_alt_versjon_uten_slagord.png';
import LanguageSelector from './LanguageSelector';
import './Footer.css'

const EVENT_NAMES = {
  FOOTER_LINK: 'https://www.ntnu.no/drive/ntnu-beta',
};

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.externalLinkClickHandler = this.externalLinkClickHandler.bind(this);
  }

  getLocalePrefix(locale) {
    const twoLetterPrefix = locale.substring(0, 2).toLowerCase();
    if (twoLetterPrefix === 'en') {
      return '';
    }
    return `/${twoLetterPrefix}`;
  }

  externalLinkClickHandler(event) {
    const label = event.currentTarget.getAttribute('href');
    const eventName = EVENT_NAMES.FOOTER_LINK;
    const properties = {
      category: 'outbound_link',
      label,
    };
    sendTrackEvent(eventName, properties);
  }

  render() {
    const {
      supportedLanguages,
      onLanguageSelected,
      logo,
      intl,
    } = this.props;
    const showLanguageSelector = supportedLanguages.length > 0 && onLanguageSelected;

    return (
      <footer
        role="contentinfo"
        aria-label={intl.formatMessage(messages['footer.logo.ariaLabel'])}
        className="footer d-flex border-top py-3 px-4"
      >
        <div className="container d-flex">
          <a
            className="d-block mb-3"
            href="https://www.ntnu.no/drive/ntnu-beta"
            target="blank"
            aria-label={intl.formatMessage(messages['footer.logo.ariaLabel'])}
          >
            <img
              style={{ maxWidth: 150, maxHeight: 100 }}
              src={logo || FooterLogo}
              alt={intl.formatMessage(messages['footer.logo.altText'])}
            />
          </a>
          <div className="flex-grow-1" />
          {showLanguageSelector &&
            <LanguageSelector
              options={supportedLanguages}
              onSubmit={onLanguageSelected}
            />
          }
        </div>
      </footer>
    );
  }
}

Footer.propTypes = {
  intl: intlShape.isRequired,
  logo: PropTypes.string,
  onLanguageSelected: PropTypes.func,
  supportedLanguages: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })),
};

Footer.defaultProps = {
  logo: undefined,
  onLanguageSelected: undefined,
  supportedLanguages: [],
};

export default injectIntl(Footer);