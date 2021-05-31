import messaging from '@react-native-firebase/messaging';
import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { setIsToast, setFCMToken } from 'app/state/appSettings/actions';
import { addToastMessage } from 'app/state/toastMessages/actions';
import { loadWallets } from 'app/state/wallets/actions';

const NotificationsServices = () => {
  const dispatch = useDispatch();

  const getFcmToken = useCallback(async () => {
    const fcmToken = await messaging().getToken();

    if (fcmToken) {
      dispatch(setFCMToken(fcmToken));
      console.log('Your Firebase Token is:', fcmToken);
    } else {
      console.log('Failed', 'No token received');
    }
  }, [dispatch]);

  const requestUserPermission = useCallback(async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      getFcmToken();
      console.log('Authorization status:', authStatus);
    }
  }, [getFcmToken]);

  useEffect(() => {
    requestUserPermission();
  }, [requestUserPermission]);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      if (remoteMessage.messageId) {
        console.log('>>>>>>', remoteMessage);
        dispatch(loadWallets());
        setTimeout(() => {
          dispatch(setIsToast(true));
          dispatch(
            addToastMessage({
              title: remoteMessage.notification?.title || '',
              description: remoteMessage.notification?.body || '',
              id: remoteMessage.data?.tx,
              status: remoteMessage.data?.failed,
            }),
          );
        }, 10000);
      }
    });

    return unsubscribe;
  }, [dispatch]);

  return null;
};

export default NotificationsServices;
