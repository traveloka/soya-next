import React from "react";
import createConfigureStore from "../../createConfigureStore";
import withStore from "../../withStore";

import type { SoyaNextPage } from "../../../types";
import type { WithStoreInjectedProps } from "../../withStore";

interface TestPageProps extends WithStoreInjectedProps {
  init?: boolean;
}

export default function setupWithStoreTest() {
  const Page: SoyaNextPage<TestPageProps> = props => (
    <>
      {props.store ? (
        <div data-testid={"props-store"}>
          {JSON.stringify(props.store, null, 2)}
        </div>
      ) : null}
      {props.init ? (
        <div data-testid={"props-init"}>
          {JSON.stringify(props.init, null, 2)}
        </div>
      ) : null}
    </>
  );
  Page.getInitialProps = () => ({ init: true } as any);

  return {
    Page,
    PageWithStore: withStore(createConfigureStore())(Page),
  };
}
