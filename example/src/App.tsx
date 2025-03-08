import {
  type StaticParamList,
  createStackNavigator,
  createStaticNavigation,
  useNavigation,
} from 'react-navigation-lynx';

const ScreenA = () => {
  const navigation = useNavigation();

  return (
    <view
      style={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}
    >
      <text bindtap={() => navigation.navigate('ScreenB')}>Screen A</text>
    </view>
  );
};

const ScreenB = () => {
  const navigation = useNavigation();

  return (
    <view
      style={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}
    >
      <text>Screen B</text>
      <text bindtap={() => navigation.goBack()}>Go back to Screen A</text>
    </view>
  );
};

const RootStack = createStackNavigator({
  screens: {
    ScreenA: ScreenA,
    ScreenB: ScreenB,
  },
});

const Navigation = createStaticNavigation(RootStack);

export function App() {
  return <Navigation />;
}

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
