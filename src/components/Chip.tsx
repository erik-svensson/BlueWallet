import React from 'react';
import { StyleSheet, View, StyleProp, TextStyle, ViewStyle } from 'react-native';

import { icons } from 'app/assets';
import { Image } from 'app/components';
import { palette, typography } from 'app/styles';

import { Text } from './Text';

interface Props {
  label: string;
  textStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  removable?: boolean;
  testID?: string;
}

export class Chip extends React.PureComponent<Props> {
  render() {
    return (
      <View style={[styles.container, this.props.containerStyle]}>
        <Text style={[styles.label, this.props.textStyle]} testID={this.props.testID}>
          {this.props.label}
        </Text>
        {this.props.removable ? <Image source={icons.blackCross} style={styles.icon} /> : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    backgroundColor: palette.backgroundDarker,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    ...typography.headline5,
    lineHeight: 32,
    textAlign: 'center',
  },
  icon: {
    height: 22,
    width: 22,
  },
});
