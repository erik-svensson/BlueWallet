import { NavigationContainerRef, NavigationAction, NavigationState } from '@react-navigation/native';
import { createRef } from 'react';

export const navigationRef = createRef<NavigationContainerRef>();

export default class NavigationService {
  goBack() {
    navigationRef.current?.goBack();
  }
  navigate(routeName: string, params?: Record<string, any>) {
    navigationRef.current?.navigate(routeName, params);
  }
  dispatch<State extends NavigationState = NavigationState>(
    action: NavigationAction | ((state: State) => NavigationAction),
  ) {
    navigationRef.current?.dispatch(action as any);
  }
}
