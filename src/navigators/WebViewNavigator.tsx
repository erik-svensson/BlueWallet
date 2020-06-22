import { createStackNavigator } from 'react-navigation';

import { Route } from 'app/consts';
import { WebViewScreen } from 'app/screens';

export const WebViewNavigator = createStackNavigator(
  {
    [Route.WebView]: WebViewScreen,
  },
  {
    headerMode: 'screen',
  },
);
