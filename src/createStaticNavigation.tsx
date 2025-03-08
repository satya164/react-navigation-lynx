import {
  createComponentForStaticNavigation,
  type NavigationContainerRef,
  type ParamListBase,
  type StaticNavigation
} from '@react-navigation/core';
import * as React from 'react';

import { NavigationContainer } from './NavigationContainer';

type Props = Omit<
  React.ComponentProps<typeof NavigationContainer>,
  'children'
>;

/**
 * Create a navigation component from a static navigation config.
 * The returned component is a wrapper around `NavigationContainer`.
 *
 * @param tree Static navigation config.
 * @returns Navigation component to use in your app.
 */
export function createStaticNavigation(tree: StaticNavigation<any, any, any>) {
  const Component = createComponentForStaticNavigation(tree, 'RootNavigator');

  function Navigation(
    props: Props,
    ref: React.Ref<NavigationContainerRef<ParamListBase>>
  ) {

    return (
      <NavigationContainer {...props} ref={ref}>
        <Component />
      </NavigationContainer>
    );
  }

  return React.forwardRef(Navigation);
}
