import {
  type DefaultNavigatorOptions,
  type NavigationProp,
  type NavigatorTypeBagBase,
  type ParamListBase,
  type StackActionHelpers,
  type StackNavigationState,
  StackRouter,
  type StackRouterOptions,
  type StaticConfig,
  type TypedNavigator,
  createNavigatorFactory,
  useNavigationBuilder,
} from '@react-navigation/core';
import styles from './styles.module.css';

type StackNavigationProp<
  ParamList extends ParamListBase,
  RouteName extends keyof ParamList = keyof ParamList,
  NavigatorID extends string | undefined = undefined,
> = NavigationProp<
  ParamList,
  RouteName,
  NavigatorID,
  StackNavigationState<ParamList>,
  StackNavigationOptions,
  StackNavigationEventMap
> &
  StackActionHelpers<ParamList>;

// biome-ignore lint/complexity/noBannedTypes: TODO
type StackNavigationConfig = {};

type StackNavigationOptions = {
  title?: string;
};

type StackNavigationEventMap = {
  tabPress: {
    data: { isAlreadyFocused: boolean };
    canPreventDefault: true;
  };
};

// The props accepted by the component is a combination of 3 things
type Props = DefaultNavigatorOptions<
  ParamListBase,
  string | undefined,
  StackNavigationState<ParamListBase>,
  StackNavigationOptions,
  StackNavigationEventMap,
  StackNavigationProp<ParamListBase>
> &
  StackRouterOptions &
  StackNavigationConfig;

function StackNavigator({
  id,
  initialRouteName,
  children,
  layout,
  screenListeners,
  screenOptions,
  screenLayout,
}: Props) {
  const { state, descriptors, NavigationContent } = useNavigationBuilder<
    StackNavigationState<ParamListBase>,
    StackRouterOptions,
    StackActionHelpers<ParamListBase>,
    StackNavigationOptions,
    StackNavigationEventMap
  >(StackRouter, {
    id,
    initialRouteName,
    children,
    layout,
    screenListeners,
    screenOptions,
    screenLayout,
  });

  return (
    <NavigationContent>
      <view class={styles.container}>
        {state.routes.map((route) => {
          return (
            <view key={route.key} class={styles.screen}>
              {descriptors[route.key].render()}
            </view>
          );
        })}
      </view>
    </NavigationContent>
  );
}

export function createStackNavigator<
  const ParamList extends ParamListBase,
  const NavigatorID extends string | undefined = undefined,
  const TypeBag extends NavigatorTypeBagBase = {
    ParamList: ParamList;
    NavigatorID: NavigatorID;
    State: StackNavigationState<ParamList>;
    ScreenOptions: StackNavigationOptions;
    EventMap: StackNavigationEventMap;
    NavigationList: {
      [RouteName in keyof ParamList]: StackNavigationProp<
        ParamList,
        RouteName,
        NavigatorID
      >;
    };
    Navigator: typeof StackNavigator;
  },
  const Config extends StaticConfig<TypeBag> = StaticConfig<TypeBag>,
>(config?: Config): TypedNavigator<TypeBag, Config> {
  return createNavigatorFactory(StackNavigator)(config);
}
