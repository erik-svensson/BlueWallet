import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { Toast as ToastComponent } from 'app/components/Toast';
import { selectors, actions } from 'app/state/toastMessages';

export const ToastManager = () => {
  const toastMessages = useSelector(selectors.toastMessages);
  const dispatch = useDispatch();

  return (
    <View style={styles.outerContainer}>
      {toastMessages.map(toast => (
        <ToastComponent key={toast.id} toast={toast} onClose={() => dispatch(actions.hideToastMessage(toast))} />
      ))}
    </View>
  );
};

export default ToastManager;

const styles = StyleSheet.create({
  outerContainer: {
    position: 'absolute',
    top: 30,
    left: 0,
    right: 0,
  },
});
