import React, { useEffect } from 'react';
import { Text, View, StyleSheet, StyleProp, ViewStyle, BackHandler, StatusBar } from 'react-native';
import { ButtonProps } from 'react-native-elements';

import { Button, Image, FastImageSource } from 'app/components';
import { typography, palette, ifIphoneX } from 'app/styles';

export interface MessageProps {
  title: string;
  source: FastImageSource;
  description: string;
  buttonProps?: ButtonProps;
  imageStyle?: StyleProp<ViewStyle>;
  asyncTask?: () => void;
}

export const MessageScreen = ({ navigation, route }) => {
  const { title, source, description, buttonProps, imageStyle, asyncTask } = route.params;

  useEffect(() => {
    const onBackPress = () => true;
    BackHandler.addEventListener('hardwareBackPress', onBackPress);

    if (asyncTask) {
      const asynchrousTask = async () => {
        await asyncTask();
      };

      asynchrousTask();
    }

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    };
  }, [asyncTask]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.title}>{title}</Text>
      <Image source={source} style={[styles.image, imageStyle]} resizeMode="contain" />
      <Text style={styles.description}>{description}</Text>
      {buttonProps && <Button {...buttonProps} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    paddingBottom: ifIphoneX(54, 20),
  },
  title: { ...typography.headline4, marginTop: '30%' },
  image: {
    height: 172,
    width: '100%',
    marginTop: 40,
    marginBottom: 40,
  },
  description: {
    ...typography.caption,
    color: palette.textGrey,
    textAlign: 'center',
    lineHeight: 19,
    flexGrow: 1,
  },
});
