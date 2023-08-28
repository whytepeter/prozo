<template>
  <ion-modal :is-open="open" class="loaderModal">
    <div
      class="flex h-screen w-screen items-center justify-center bg-transparent"
    >
      <!-- <div
        style="z-index: 100"
        class="w-20 h-20 rounded-2xl bg-white flex items-center justify-center p-2"
      >
        <ion-spinner name="dots" color="secondary"></ion-spinner>
      </div> -->

      <div
        style="z-index: 100"
        class="relative flex w-20 flex-shrink-0 items-center justify-center"
      >
        <!-- <img
          :src="!yellow ? bg : bg2"
          alt=""
          class="rotate-animation w-full object-cover"
        /> -->
        <div
          class="animate__animated animate__slower animate__flash animate__infinite"
        >
          <img
            :src="loader"
            alt=""
            class="animate__animated animate__pulse animate__slow animate__infinite w-full object-cover"
          />
        </div>
      </div>
    </div>
  </ion-modal>
</template>

<script setup>
import { IonSpinner } from "@ionic/vue";
import { IonModal } from "@ionic/vue";

import bg from "@/assets/icon/loader-bg.svg";
import logo from "@/assets/icon/loader-logo.svg";
import bg2 from "@/assets/icon/loader-bg-y.svg";
import logo2 from "@/assets/icon/loader-logo-y.svg";

import leafG from "@/assets/icon/leaf-g.svg";
import leafW from "@/assets/icon/leaf-w.svg";
import leafY from "@/assets/icon/leaf-y.svg";

import { computed, ref } from "vue";

const props = defineProps({
  color: {
    type: String,
    default: "white",
  },
});

const loader = computed(() => {
  const obj = {
    white: leafW,
    green: leafG,
    yellow: leafY,
  };

  return obj[props.color];
});

const open = ref(true);
</script>

<style scope>
ion-modal.loaderModal {
  --width: fit-content;
  --height: fit-content;
  --background: transparent;
  overflow: auto !important;
}

ion-modal.loaderModal::part(backdrop) {
  opacity: 0.5;
  background: var(--ion-color-primary);
}

.rotate-animation {
  animation: rotate 2s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
