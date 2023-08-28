<template>
  <ion-modal
    :is-open="isOpen"
    :class="[persistence ? 'persistence' : '', 'info']"
    @ionModalDidDismiss="$emit('close')"
  >
    <div class="ion-padding text-center flex flex-col gap-2 items-center">
      <div
        v-if="!noIcon"
        class="p-2 rounded-full grid grid-flow-col auto-cols-auto items-center justify-center"
      >
        <img :src="handleIcon" alt="" class="w-full object-cover" />
      </div>
      <h3 class="text-primary font-semibold text-xl">{{ title }}</h3>
      <p class="text-dark-500">{{ caption }}</p>
    </div>
    <div class="pb-8 px-4">
      <slot />
    </div>
  </ion-modal>
</template>

<script setup>
import { IonModal } from "@ionic/vue";
import successIcon from "@/assets/icon/successIcon.svg";
import sadIcon from "@/assets/icon/sadIcon.svg";
import errorIcon from "@/assets/icon/errorIcon.svg";
import infoIcon from "@/assets/icon/oopsIcon.svg";

import { computed } from "vue";

const props = defineProps({
  title: {
    type: String,
    default: "Success",
  },

  persistence: {
    type: Boolean,
    default: true,
  },

  caption: {
    type: String,
    default: "Success Message",
  },

  type: {
    type: String,
    default: "success",
  },

  isOpen: {
    type: Boolean,
    default: false,
  },
  noIcon: {
    type: Boolean,
    default: false,
  },

  initialBreakpoint: {
    type: Number,
    default: 0.45,
  },
  breakPoints: {
    type: Array,
    default: () => [0, 0.25, 0.45],
  },
});

defineEmits(["close"]);

const handleIcon = computed(() => {
  const obj = {
    success: successIcon,
    error: errorIcon,
    sad: sadIcon,
    info: infoIcon,
  };
  return obj[props.type];
});
</script>

<style>
ion-modal.info {
  --width: fit-content;
  --min-width: 350px;
  --max-width: 90%;
  --height: fit-content;

  --border-radius: 24px;
  --box-shadow: 0 28px 48px rgba(0, 0, 0, 0.4);
  overflow: auto !important;
}

ion-modal.persistence::part(backdrop) {
  pointer-events: none !important;
}
</style>
