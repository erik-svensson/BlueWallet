import React, { FC, useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import ProgressBar from 'react-native-progress/Bar';

import { LinearGradient } from 'app/components';
import { typography, palette } from 'app/styles';

interface Props {
  timeoutMilis: number;
  stepIntervalMilis: number;
  onComplete: () => any;
  title: string;
  inProgressTitle: string;
}

const _styles = {
  height: 18,
  width: 53,
  radius: 9,
};

const noIntervalID = -1;

export const ProgressButton: FC<Props> = ({
  timeoutMilis,
  stepIntervalMilis,
  onComplete,
  title,
  inProgressTitle,
}: Props) => {
  const [inProgress, setInProgress] = useState(false);
  const [progress, setProgress] = useState(0);
  const [intervalID, setIntervalID] = useState(noIntervalID);

  useEffect(() => {
    return () => {
      clearInterval(intervalID);
    };
  });

  const onPress = () => {
    setInProgress(true);

    const _intervalID = setInterval(() => {
      setIntervalID((_intervalID as unknown) as number);
      console.log('?');
      setProgress(prevProgress => {
        console.log(prevProgress);
        if (prevProgress < timeoutMilis) {
          return prevProgress + stepIntervalMilis;
        } else {
          clearInterval(intervalID);
          setInProgress(false);
          onComplete();

          return 0;
        }
      });
    }, 100);
  };

  const undo = () => {
    clearInterval(intervalID);
    setIntervalID(noIntervalID);
    setInProgress(false);
    setProgress(0);
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.progressButtonContainer}>
        {inProgress ? (
          <View style={styles.stack}>
            <View style={styles.stackItem}>
              <View style={[styles.button, styles.greyBackground]}></View>
            </View>
            <View style={styles.stackItem}>
              <View style={styles.button}>
                <ProgressBar
                  borderWidth={0}
                  color={palette.secondary}
                  progress={progress / timeoutMilis}
                  width={null}
                  height={_styles.height}
                  borderRadius={_styles.radius}
                />
              </View>
            </View>
            <View style={styles.stackItem}>
              <TouchableOpacity onPress={undo}>
                <View style={styles.button}>
                  <Text style={styles.titleStyle}>{inProgressTitle}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.stack}>
            <LinearGradient
              colors={[palette.gradientSecondaryFirst, palette.gradientSecondarySecond]}
              style={styles.button}
            >
              <Text style={styles.titleStyle}>{title}</Text>
            </LinearGradient>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  stack: {
    position: 'relative',
  },
  greyBackground: {
    backgroundColor: palette.grey,
  },
  progressButtonContainer: {
    position: 'relative',
    height: _styles.height,
    width: _styles.width,
    borderRadius: _styles.radius,
  },
  stackItem: {
    position: 'absolute',
  },
  button: {
    height: _styles.height,
    width: _styles.width,
    borderRadius: _styles.radius,
    display: 'flex',
    justifyContent: 'center',
  },
  titleStyle: {
    alignSelf: 'center',
    ...typography.button,
    fontSize: 12,
    color: palette.white,
  },
});
