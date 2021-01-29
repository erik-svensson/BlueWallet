import { Route, AddNotificationEmailParams } from 'app/consts';
import { CreateMessage, MessageType } from 'app/helpers/MessageCreator';
import { NavigationService } from 'app/services';

const i18n = require('../../loc');

export const getOnboardingAddEmailParams = (): AddNotificationEmailParams => ({
  onSkipSuccess: () => {
    CreateMessage({
      title: i18n.contactCreate.successTitle,
      description: i18n.onboarding.successCompletedDescription,
      type: MessageType.success,
      buttonProps: {
        title: i18n.onboarding.successCompletedButton,
        onPress: () => {
          NavigationService.navigate(Route.MainTabStackNavigator, { screen: Route.Dashboard });
        },
      },
    });
  },
  isBackArrow: false,
  title: i18n.onboarding.onboarding,
  description: i18n.onboarding.addNotificationEmailDescription,
  onSuccess: () => {
    CreateMessage({
      title: i18n.contactCreate.successTitle,
      description: i18n.notifications.emailAddedSuccessMessage,
      type: MessageType.success,
      buttonProps: {
        title: i18n.onboarding.successCompletedButton,
        onPress: () => {
          NavigationService.navigate(Route.MainTabStackNavigator, { screen: Route.Dashboard });
        },
      },
    });
  },
});

export const getAppUpdateAddEmailParams = (): AddNotificationEmailParams => ({
  onSkipSuccess: () => {
    NavigationService.navigate(Route.MainTabStackNavigator, { screen: Route.Dashboard });
  },
  isBackArrow: false,
  title: i18n.notifications.notifications,
  description: i18n.onboarding.addNotificationEmailDescription,
  onSuccess: () => {
    CreateMessage({
      title: i18n.contactCreate.successTitle,
      description: i18n.notifications.emailAddedSuccessMessage,
      type: MessageType.success,
      buttonProps: {
        title: i18n.onboarding.successCompletedButton,
        onPress: () => {
          NavigationService.navigate(Route.MainTabStackNavigator, { screen: Route.Dashboard });
        },
      },
    });
  },
});
