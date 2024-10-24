import {Platform} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import onDisplayNotification from './displayNotification';

export const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  console.log('Authorization status(authStatus):', authStatus);
  return (
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL
  );
};

export const getFCMToken = async callback => {
  messaging()
    .getToken()
    .then(fcmToken => {
      // console.log('FCM Token -> ', fcmToken);
      //initPushHandler();
      callback(fcmToken);
    });
};

export const initPushHandler = async () => {
  console.log('initPushHandler');
  messaging()
    .getInitialNotification()
    .then(async remoteMessage => {
      if (remoteMessage) {
        console.log(
          'getInitialNotification:' +
            'Notification caused app to open from quit state',
        );
        console.log(remoteMessage);
      }
    });

  messaging().onNotificationOpenedApp(async remoteMessage => {
    if (remoteMessage) {
      console.log(
        'onNotificationOpenedApp: ' +
          'Notification caused app to open from background state',
      );
      console.log(remoteMessage);
    }
  });

  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });

  messaging().onMessage(async remoteMessage => {
    // alert('A new FCM message arrived! ' + remoteMessage.notification.body);
    const message = JSON.stringify(remoteMessage);
    console.log('A new FCM message arrived!', message);
    onDisplayNotification(remoteMessage);

    // if(Platform.OS === 'android'){
    // PushNotification.localNotification({
    //     /* iOS and Android properties */
    //     id: 0, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
    //     title: remoteMessage?.notification?.title, // (optional)
    //     message: remoteMessage?.notification?.body, // (required)
    //     // picture: "https://www.example.tld/picture.jpg", // (optional) Display an picture with the notification, alias of `bigPictureUrl` for Android. default: undefined
    //     userInfo: {}, // (optional) default: {} (using null throws a JSON value '<null>' error)
    //     playSound: false, // (optional) default: true
    //     soundName: "default", // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
    //     number: 10, // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
    //     repeatType: "day", // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.
    //   });
    // }
  });

  //   messaging()
  //     .subscribeToTopic(TOPIC)
  //     .then(() => {
  //       console.log(`Topic: ${TOPIC} Suscribed`);
  //     });
};
