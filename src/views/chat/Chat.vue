<template>
  <div>
    <!-- Chat -->
    <div v-if="isViewLoaded" id="app" class="flex gap-6 mt-5">
        <ChatView />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import ChatView from '../../components/chat/ChatView.vue';

export default {
  components: {
    ChatView
  },
  setup() {
    const isViewLoaded = ref(false);

    onMounted(() => {
      // Simulación de un retraso en la carga de la vista
      setTimeout(() => {
        isViewLoaded.value = true;
      }, 1000);
    });

    return {
      isViewLoaded
    };
  }
};
</script>
