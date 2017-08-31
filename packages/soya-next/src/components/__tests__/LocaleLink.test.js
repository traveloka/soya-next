import React from 'react';
import { shallow } from 'enzyme';
import LocaleLink from '../LocaleLink';

describe('<LocaleLink />', () => {
  const context = {
    locale: {
      country: 'id',
      language: 'id',
    },
    defaultLocale: 'id-id',
    siteLocales: [
      'id-id',
      'en-id',
    ],
    router: {
      pathname: '/',
    },
  };

  it('should render <Link /> to navigate from default locale', () => {
    const wrapper = shallow((
      <LocaleLink href='/about'>
        <a>Tentang</a>
      </LocaleLink>
    ), { context });
    expect(wrapper.dive().dive()).toMatchSnapshot();
  });

  it('should render <Link /> to navigate from non-default locale', () => {
    const wrapper = shallow((
      <LocaleLink href='/about'>
        <a>About</a>
      </LocaleLink>
    ), {
      context: {
        ...context,
        locale: {
          language: 'en',
          country: 'id',
        },
      },
    });
    expect(wrapper.dive().dive()).toMatchSnapshot();
  });

  it('should render <Link /> to navigate to custom route', () => {
    const wrapper = shallow((
      <LocaleLink as='p/hello-world' href='/post?title=Hello World'>
        <a>Hello World</a>
      </LocaleLink>
    ), { context });
    expect(wrapper.dive().dive()).toMatchSnapshot();
  });

  it('should render <Link /> to navigate to another locale', () => {
    const wrapper = shallow((
      <LocaleLink locale='en-id'>
        <a>English (Indonesia)</a>
      </LocaleLink>
    ), { context });
    expect(wrapper.dive().dive()).toMatchSnapshot();
  });

  it('should accept locale string', () => {
    const wrapper = shallow((
      <LocaleLink locale='th-th' href='/about'>
        <a>เกี่ยวกับ</a>
      </LocaleLink>
    ), { context });
    expect(wrapper.dive().dive()).toMatchSnapshot();
  });

  it('should accept locale object', () => {
    const wrapper = shallow((
      <LocaleLink locale={{ language: 'en', country: 'sg' }} href='/about'>
        <a>About</a>
      </LocaleLink>
    ), { context });
    expect(wrapper.dive().dive()).toMatchSnapshot();
  });
});
