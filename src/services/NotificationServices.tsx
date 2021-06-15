import messaging from '@react-native-firebase/messaging';
import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { setFCMToken } from 'app/state/appSettings/actions';

const NotificationsServices = () => {
  const dispatch = useDispatch();

  const getFcmToken = useCallback(async () => {
    const fcmToken = await messaging().getToken();

    if (fcmToken) {
      dispatch(setFCMToken(fcmToken));
    }
  }, [dispatch]);

  const requestUserPermission = useCallback(async () => {
    const authStatus = await messaging().requestPermission({ sound: true, badge: true });
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      getFcmToken();
    }
  }, [getFcmToken]);

  useEffect(() => {
    requestUserPermission();
  }, [requestUserPermission]);

  return null;
};

export default NotificationsServices;
