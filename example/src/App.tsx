import {
  createStaticNavigation,
  createStackNavigator,
} from "react-navigation-lynx";

const ScreenA = () => {
  return (
    <view style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <text>Screen A</text>
    </view>
  );
};

const ScreenB = () => {
  return (
    <view style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <text>Screen B</text>
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
