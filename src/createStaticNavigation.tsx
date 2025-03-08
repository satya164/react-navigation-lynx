import * as React from '@lynx-js/react';
import {
  type NavigationContainerRef,
  type ParamListBase,
  type StaticNavigation,
  createComponentForStaticNavigation,
} from '@react-navigation/core';

import { NavigationContainer } from './NavigationContainer';

type Props = Omit<React.ComponentProps<typeof NavigationContainer>, 'children'>;

/**
 * Create a navigation component from a static navigation config.
 * The returned component is a wrapper around `NavigationContainer`.
 *
 * @param tree Static navigation config.
 * @returns Navigation component to use in your app.
 */
export function createStaticNavigation(
  tree: // biome-ignore lint/suspicious/noExplicitAny: type is inferred
  StaticNavigation<any, any, any>,
) {
  const Component = createComponentForStaticNavigation(tree, 'RootNavigator');

  function Navigation(
    props: Props,
    ref: React.Ref<NavigationContainerRef<ParamListBase>>,
  ) {
    return (
      <NavigationContainer {...props} ref={ref}>
        <Component />
      </NavigationContainer>
    );
  }

  return React.forwardRef(Navigation);
}
