import React from 'react';
import { shallow } from 'enzyme';
import { Cookies } from 'react-cookie';
import withCookies from '../withCookiesPage';

describe('withCookiesPage', () => {
  let Page, PageWithCookies;

  beforeEach(() => {
    Page = () => <div />;
    Page.getInitialProps = () => ({ init: true });
    PageWithCookies = withCookies(Page);
  });

  afterEach(() => {
    delete process.browser;
  });

  describe('browser', () => {
    beforeEach(() => {
      process.browser = true;
    });

    it('should add cookie to page props', async () => {
      const props = await PageWithCookies.getInitialProps({});
      const wrapper = shallow(<PageWithCookies {...props} cookies={new Cookies()} />);
      expect(wrapper.find(Page).props()).toMatchSnapshot();
    });
  });

  describe('server', () => {
    beforeEach(() => {
      process.browser = false;
    });

    it('should add cookie to page props', async () => {
      global.MOCK_IS_NODE = true;
      const props = await PageWithCookies.getInitialProps({
        req: {
          universalCookies: new Cookies('key=value'),
        },
      });
      const wrapper = shallow(<PageWithCookies {...props} />);
      expect(wrapper.find(Page).props()).toMatchSnapshot();
      delete global.MOCK_IS_NODE;
    });
  });
});
