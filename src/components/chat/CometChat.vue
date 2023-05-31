<script setup>
import { CometChat } from "@cometchat-pro/chat";
import { ref } from "vue";

// Hooks
import { useAuthenticationStore } from "@/stores/auth/authentications";
import useChat from "@/composables/chat";

const appId = "231046aa8ee568e3";
const region = "eu";

const appSettings = new CometChat.AppSettingsBuilder()
  .subscribePresenceForAllUsers()
  .setRegion(region)
  .autoEstablishSocketConnection(true)
  .build();

CometChat.init(appId, appSettings).then(() => {
  console.log("chat iniciat correctament");

  const UID = "emp_5";
  const authKey = "f588a52d5487c195325e84aee5b610d0647a43bf";
  const name = "Gestor trafico";

  const user = new CometChat.User(UID);
  user.setName(name);

  CometChat.createUser(user, authKey).then(
    (user) => {
      CometChat.login(UID, authKey).then(
        (user) => {
          console.log("Loggued successful:", { user });
        },
        (error) => {
          console.log("Login failed with exception:", { error });
        }
      );
    },
    (error) => {
      console.log("error", error);
      if (error.code === "ERR_UID_ALREADY_EXISTS") {
        CometChat.login(UID, authKey).then(
          (user) => {
            console.log("Loggued successful:", { user });
          },
          (error) => {
            console.log("Login failed with exception:", { error });
          }
        );
      }
    }
  );

  let listenerID = "UNIQUE_LISTENER_ID";

  CometChat.addMessageListener(
    listenerID,
    new CometChat.MessageListener({
      onTextMessageReceived: (textMessage) => {
        console.log("Text message received successfully", textMessage);
      },
      onMediaMessageReceived: (mediaMessage) => {
        console.log("Media message received successfully", mediaMessage);
      },
      onCustomMessageReceived: (customMessage) => {
        console.log("Custom message received successfully", customMessage);
      },
    })
  );
});

</script>
