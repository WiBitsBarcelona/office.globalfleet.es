<template>
  <router-view />
</template>

<script setup>
  import { useI18n } from "vue-i18n";



  //Firebase



  import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";


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
const app = initializeApp(firebaseConfig);




const messaging = getMessaging(app);


onMessage(messaging, (payload) => {
  console.log('Message received. ', payload);
  // ...
});

getToken(messaging, { vapidKey: 'BJubSjGb5alNAd9ebq7JWHKHVd5ui52dFcQjpQ-FEJMkaQ9thIv0d9qb_867gf1iDXniQf-Wfn3ksLcI1OrZnRk' }).then((currentToken) => {
  if (currentToken) {
    // Send the token to your server and update the UI if necessary
    console.log("TOKEN is: " + currentToken);
    
  } else {
    // Show permission request UI
    console.log('No registration token available. Request permission to generate one.');
    // ...
  }
}).catch((err) => {
  console.log('An error occurred while retrieving token. ', err);
  // ...
});



  //End firebase








  const i18n = useI18n();
  i18n.locale.value = localStorage.getItem('locale');


  

</script>
