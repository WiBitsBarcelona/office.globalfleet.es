<template>
  <div>
    <!-- Chat -->
    <div v-if="isViewLoaded" id="app" class="flex gap-6 mt-5">
      <ChatView />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import ChatView from "../../components/chat/ChatView.vue";
import { useAuthenticationStore } from "@/stores/auth/authentications";
import Swal from "sweetalert2";
import { useRouter } from 'vue-router';

export default {
  components: {
    ChatView,
  },
  setup() {
    const isViewLoaded = ref(false);
    const router = useRouter();

    onMounted(() => {
      // Comprobamos si el usuario tiene permisos de chat
      if (localStorage.getItem("token") && useAuthenticationStore().user.employee) {
        // Simulación de un retraso en la carga de la vista
        setTimeout(() => {
          isViewLoaded.value = true;
        }, 1000);
      } else {
        Swal.fire({
          icon: "warning",
          title: "Error",
          text: 'El Chat no esta Activado para este Usuario, hable con el Administrador',
          showConfirmButton: true,
        }).then((result) => {
          if (result.isConfirmed) {
            router.back();
          }
        });
      }
    });

    return {
      isViewLoaded,
    };
  },
};
</script>
