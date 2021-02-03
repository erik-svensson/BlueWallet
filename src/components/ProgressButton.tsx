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
  height?: number;
  width?: number;
  borderRadius?: number;
}

const noIntervalID = -1;

export const ProgressButton: FC<Props> = ({
  timeoutMilis,
  stepIntervalMilis,
  onComplete,
  title,
  inProgressTitle,
  height = 43,
  width = 86,
  borderRadius = 32.5,
}: Props) => {
  const [inProgress, setInProgress] = useState(false);
  const [progress, setProgress] = useState(0);
  const [intervalID, setIntervalID] = useState(noIntervalID);

  useEffect(() => {
    return () => {
      clearInterval(intervalID);
    };
  }, [intervalID]);

  const onPress = () => {
    setInProgress(true);

    const _intervalID = setInterval(() => {
      setIntervalID(Number(_intervalID));

      setProgress(prevProgress => {
        if (prevProgress < timeoutMilis) {
          return prevProgress + stepIntervalMilis;
        } else {
          clearInterval(_intervalID);
          setIntervalID(noIntervalID);

          setInProgress(isInProgress => {
            if (isInProgress) {
              onComplete();
            }

            return false;
          });

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

  const dynamicStyles = { width, height, borderRadius };

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.progressButtonContainer, dynamicStyles]}>
        {inProgress ? (
          <View style={styles.stack}>
            <View style={styles.stackItem}>
              <View style={[styles.button, styles.greyBackground, dynamicStyles]}></View>
            </View>
            <View style={styles.stackItem}>
              <View style={[styles.button, dynamicStyles]}>
                <ProgressBar
                  borderWidth={0}
                  color={palette.secondary}
                  progress={progress / timeoutMilis}
                  width={null}
                  height={height}
                  borderRadius={borderRadius}
                />
              </View>
            </View>
            <View style={styles.stackItem}>
              <TouchableOpacity onPress={undo}>
                <View style={[styles.button, dynamicStyles]}>
                  <Text style={styles.titleStyle}>{inProgressTitle}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.stack}>
            <LinearGradient
              colors={[palette.gradientSecondaryFirst, palette.gradientSecondarySecond]}
              style={[styles.button, dynamicStyles]}
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
  },
  stackItem: {
    position: 'absolute',
  },
  button: {
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
