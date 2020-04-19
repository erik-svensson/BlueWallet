import { StyleProp, ViewStyle } from 'react-native';
import { ButtonProps } from 'react-native-elements';

import { images } from 'app/assets';
import { Route } from 'app/consts';
import { NavigationService } from 'app/services';

export enum MessageType {
  success,
  error,
  processingState,
}

interface Message {
  title: string;
  description: string;
  type: MessageType;
  buttonProps?: ButtonProps;
  asyncTask?: () => void;
}

export const CreateMessage = (message: Message) => {
  const processingImageStyle = {
    height: 180,
    width: 161,
    marginVertical: 36,
  };

  const getImageSource = () => {
    switch (message.type) {
      case MessageType.success:
        return images.success;
      case MessageType.error:
        return images.errorState;
      case MessageType.processingState:
        return images.processingState;
    }
  };

  return NavigationService.navigate(Route.Message, {
    title: message.title,
    description: message.description,
    source: getImageSource(),
    imageStyle: message.type === MessageType.processingState ? processingImageStyle : null,
    buttonProps: message.buttonProps,
    asyncTask: message.asyncTask,
  });
};
