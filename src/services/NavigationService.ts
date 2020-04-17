import { MessageProps } from 'screens/MessageScreen';
import { EditTextProps } from 'screens/EditTextScreen';
import { NavigationContainerComponent, NavigationActions, StackActions } from 'react-navigation';

type MessageScreenProps = Partial<MessageProps>;
type EditTextScreenProps = Partial<EditTextProps>;
type ScreenProps = MessageScreenProps | EditTextScreenProps;

export default class NavigationService {
  navigator?: NavigationContainerComponent;

  setTopLevelNavigator = (navigatorRef: NavigationContainerComponent) => {
    this.navigator = navigatorRef;
  };

  navigate = (routeName: string, params?: ScreenProps) => {
    this.navigator!.dispatch(
      NavigationActions.navigate({
        routeName,
        params,
      }),
    );
  };

  navigateWithReset = (routeName: string, params?: ScreenProps) => {
    const navigateAction = StackActions.reset({
      index: 0,
      key: null,
      actions: [
        NavigationActions.navigate({
          routeName,
          params,
        }),
      ],
    });
    this.navigator!.dispatch(navigateAction);
  };
}
