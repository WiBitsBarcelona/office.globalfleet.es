<template>
  <div>
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
    />
    <!-- Chat -->
    <div v-if="isViewLoaded" id="app" class="flex gap-6 mt-5">
        <ChatView />
    </div>
  </div>
</template>

<script>
import ChatView from '../../components/chat/ChatView.vue';

export default {
  components: {
    ChatView
  },
  data() {
    return {
      isViewLoaded: false
    };
  },
  mounted() {
    // Simulación de un retraso en la carga de la vista
    setTimeout(() => {
      this.isViewLoaded = true;
    }, 1000);
  }
};
</script>
