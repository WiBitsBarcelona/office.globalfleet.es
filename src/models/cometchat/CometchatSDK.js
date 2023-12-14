//Firebase
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, deleteToken, onMessage } from "firebase/messaging";
//Cometchat
import { CometChat } from "@cometchat/chat-sdk-javascript";
import { useAuthenticationStore } from "@/stores/auth/authentications";



const useAuthentication = useAuthenticationStore();




const firebaseConfig = {
    apiKey: "AIzaSyAnqeT7eqxzObiyOLJ_aGgVIf_5CDSVmQU",
    authDomain: "globalfleet-cometchat.firebaseapp.com",
    projectId: "globalfleet-cometchat",
    storageBucket: "globalfleet-cometchat.appspot.com",
    messagingSenderId: "767180935601",
    appId: "1:767180935601:web:add4c6e5364aa7c40fad90",
    measurementId: "G-9YTMREBTS7"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const messaging = getMessaging(firebase);

const APP_ID = "231046aa8ee568e3";
const REGION = "eu";
const AUTH_KEY = "f588a52d5487c195325e84aee5b610d0647a43bf";

const APP_SETTING = new CometChat.AppSettingsBuilder().subscribePresenceForAllUsers().setRegion(REGION).build();
let FCM_TOKEN = '';

let UID = 'emp_67'; //GEstor de trafico






/******************
 * Firebase 
 ******************/

const login = async() => {


    //TODO implementar esto:
    //console.log(useAuthentication.getUser);

    try {
      // CC init
      await CometChat.init(APP_ID, APP_SETTING);
  
  
      // User login
      const loginResponse = await CometChat.login(UID, AUTH_KEY);
      console.log('1. User login complete', loginResponse);
  
      CometChat.getLoggedinUser().then(user => console.log(user.name));
  
  
      //Fetch the FCM Token
      getToken(messaging, { vapidKey: 'BJubSjGb5alNAd9ebq7JWHKHVd5ui52dFcQjpQ-FEJMkaQ9thIv0d9qb_867gf1iDXniQf-Wfn3ksLcI1OrZnRk' }).then((currentToken) => {
        if (currentToken) {
          // Send the token to your server and update the UI if necessary
          console.log("TOKEN is: " + currentToken);
          FCM_TOKEN = currentToken;
  
        } else {
          // Show permission request UI
          console.log('No registration token available. Request permission to generate one.');
          FCM_TOKEN = '';
          // ...
        }
      }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
        FCM_TOKEN = '';
        // ...
      });
      console.log('2. Received FCM Token', FCM_TOKEN);
  
  
  
      // Register the FCM Token
      await CometChat.registerTokenForPushNotification(FCM_TOKEN);
      console.log('3. Registered FCM Token');
  
  
    } catch (error) {
      console.error(error);
    }
  
  }
  




const cometchatLogin = async() => {

    await login();

}




const cometchatLogout = async () => {

    console.log("Logout");

    try {
        // CC init
        await CometChat.init(APP_ID, APP_SETTING);

        // Delete the token
        await deleteToken(messaging);

        // Logout the user
        await CometChat.logout();
        console.log('5. Logged out');

    } catch (error) {
        console.error(error);
    }
    



}






export { cometchatLogin, cometchatLogout };