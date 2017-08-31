import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { compose } from 'redux';
import { format, resolve } from 'url';
import { withRouter } from 'next/router';
import withLocale from '../i18n/withLocaleComponent';
import { localeShape } from '../constants/PropTypes';
import { toPath } from '../utils/locale';

class LocaleLink extends React.Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    defaultLocale: PropTypes.string.isRequired,
    locale: localeShape.isRequired,
    router: PropTypes.object,
  };

  render() {
    const {
      children,
      defaultLocale,
      locale,
      router,
      ...props
    } = this.props;
    let { as, href } = props;
    delete props.siteLocales;

    const { language, country } = locale;
    const localeSegment = toPath(locale, defaultLocale);

    href = href ? format(href) : '';
    as = as ? format(as) : '';
    const sep = href.indexOf('?') === -1 ? '?' : '&';

    return (
      <Link
        {...props}
        as={localeSegment + resolve(router.pathname, as || href)}
        href={`${resolve(router.pathname, href)}${sep}locale=${language}-${country}`}
      >
        {children}
      </Link>
    );
  }
}

export default compose(
  withLocale,
  withRouter,
)(LocaleLink);
