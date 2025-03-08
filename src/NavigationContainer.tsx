import {
  BaseNavigationContainer,
  type NavigationContainerProps,
  type NavigationContainerRef,
  type ParamListBase,
} from '@react-navigation/core';
import * as React from '@lynx-js/react';

type Props = NavigationContainerProps & {
  fallback?: React.ReactNode;
};

/**
 * Container component which holds the navigation state designed for React Native apps.
 * This should be rendered at the root wrapping the whole app.
 *
 * @param props.initialState Initial state object for the navigation tree. When deep link handling is enabled, this will override deep links when specified. Make sure that you don't specify an `initialState` when there's a deep link (`Linking.getInitialURL()`).
 * @param props.onReady Callback which is called after the navigation tree mounts.
 * @param props.onStateChange Callback which is called with the latest navigation state when it changes.
 * @param props.onUnhandledAction Callback which is called when an action is not handled.
 * @param props.fallback Fallback component to render until we have finished getting initial state when linking is enabled. Defaults to `null`.
 * @param props.children Child elements to render the content.
 * @param props.ref Ref object which refers to the navigation object containing helper methods.
 */
function NavigationContainerInner(
  props: Props,
  ref?: React.Ref<NavigationContainerRef<ParamListBase> | null>
) {
  const refContainer =
    React.useRef<NavigationContainerRef<ParamListBase>>(null);

  React.useImperativeHandle(ref, () => refContainer.current);

  return <BaseNavigationContainer {...props} ref={refContainer} />;
}

export const NavigationContainer = React.forwardRef(
  NavigationContainerInner
) as <RootParamList extends {} = ReactNavigation.RootParamList>(
  props: Props & {
    ref?: React.Ref<NavigationContainerRef<RootParamList>>;
  }
) => React.ReactElement;
