import React from 'react';
import createConfigureStore from '../createConfigureStore';
import withStore from '../withStore';
import { shallow } from 'enzyme';

describe('withStore', () => {
  let Page, PageWithStore;

  beforeEach(() => {
    Page = () => <div />;
    Page.getInitialProps = () => ({ init: true });
    PageWithStore = withStore(createConfigureStore())(Page);
  });

  afterEach(() => {
    delete process.browser;
  });

  describe('browser', () => {
    beforeEach(() => {
      process.browser = true;
    });

    it('should add store to page props', async () => {
      const props = await PageWithStore.getInitialProps({});
      const wrapper = shallow(<PageWithStore {...props} store={{ soya: true }} />);
      const propNames = Object.keys(wrapper.find(Page).props());
      expect(propNames).toContain('init');
      expect(propNames).toContain('store');
    });
  });

  describe('server', () => {
    beforeEach(() => {
      process.browser = false;
    });

    it('should add store to page props', async () => {
      delete global.window;
      const props = await PageWithStore.getInitialProps({});
      const wrapper = shallow(<PageWithStore {...props} />);
      const propNames = Object.keys(wrapper.find(Page).props());
      expect(propNames).toContain('init');
      expect(propNames).toContain('store');
    });
  });
});
