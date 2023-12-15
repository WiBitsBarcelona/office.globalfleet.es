//Firebase
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, deleteToken, onMessage } from "firebase/messaging";
//Cometchat
import { CometChat } from "@cometchat/chat-sdk-javascript";
import { useAuthenticationStore } from "@/stores/auth/authentications";



const useAuthentication = useAuthenticationStore();





let firebaseConfig;

// Initialize Firebase
let firebase;
let messaging;

let vapidKeyDB;


let APP_ID;
let REGION;
let AUTH_KEY;

let APP_SETTING;
let FCM_TOKEN = '';

let UID; //GEstor de trafico




const loadData = async(user) => {

    //console.log(user);
    
    // firebaseConfig = {
    //     apiKey: "AIzaSyAnqeT7eqxzObiyOLJ_aGgVIf_5CDSVmQU",
    //     authDomain: "globalfleet-cometchat.firebaseapp.com",
    //     projectId: "globalfleet-cometchat",
    //     storageBucket: "globalfleet-cometchat.appspot.com",
    //     messagingSenderId: "767180935601",
    //     appId: "1:767180935601:web:add4c6e5364aa7c40fad90",
    //     measurementId: "G-9YTMREBTS7"
    // };
    // vapidKeyDB = 'BJubSjGb5alNAd9ebq7JWHKHVd5ui52dFcQjpQ-FEJMkaQ9thIv0d9qb_867gf1iDXniQf-Wfn3ksLcI1OrZnRk';
    // APP_ID = "231046aa8ee568e3";
    // REGION = "eu";
    // AUTH_KEY = "f588a52d5487c195325e84aee5b610d0647a43bf";
    // UID = 'emp_67';

    firebaseConfig = {
        apiKey: user.employee.company.firebase.api_key,
        authDomain: user.employee.company.firebase.auth_domain,
        projectId: user.employee.company.firebase.project_id,
        storageBucket: user.employee.company.firebase.storage_bucket,
        messagingSenderId: user.employee.company.firebase.messaging_sender_id,
        appId: user.employee.company.firebase.app_id,
        measurementId: user.employee.company.firebase.measurement_id
    };

    vapidKeyDB = user.employee.company.firebase.vapid_key;


    firebase = initializeApp(firebaseConfig);
    messaging = getMessaging(firebase);


    APP_ID = user.employee.company.cometchat.app_id;
    REGION = user.employee.company.cometchat.region;
    AUTH_KEY = user.employee.company.cometchat.auth_key;

    APP_SETTING = new CometChat.AppSettingsBuilder().subscribePresenceForAllUsers().setRegion(REGION).build();


    UID = user.employee.cometchat_uid;




}








/******************
 * Firebase 
 ******************/

const login = async() => {


    //TODO implementar esto:
    await loadData(useAuthentication.getUser);



    try {
      // CC init
      await CometChat.init(APP_ID, APP_SETTING);
  
  
      // User login
      const loginResponse = await CometChat.login(UID, AUTH_KEY);
      console.log('1. User login complete', loginResponse);
  
      await CometChat.getLoggedinUser().then(user => console.log(user.name));
  
  
      //Fetch the FCM Token
      await getToken(messaging, { vapidKey: vapidKeyDB }).then((currentToken) => {
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

    console.log("User: ", useAuthentication.getUser);

    await loadData(useAuthentication.getUser);

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