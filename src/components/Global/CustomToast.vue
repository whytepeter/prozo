<template>
  <ion-toast
    :position="toast.position"
    :is-open="toast.isOpen"
    :message="toast.message"
    :duration="toast.duration"
    @didDismiss="setToast"
    :icon="toastStyle.icon"
    class="custom-toast"
  ></ion-toast>
</template>

<script setup>
import { IonToast, IonButton } from "@ionic/vue";
import {
  checkmarkDoneCircle,
  ellipsisHorizontalCircle,
  informationCircle,
  sad,
} from "ionicons/icons";
import { computed } from "vue";
import { useDataStore } from "@/stores/data.js";

const store = useDataStore();

const toast = computed(() => store.getToast);

const setToast = () => {
  store.setToast({ isOpen: false });
};

const toastStyle = computed(() => {
  const obj = {
    success: {
      bg: `var(--ion-color-success)`,
      text: `white`,
      icon: checkmarkDoneCircle,
    },
    error: { bg: `var(--ion-color-danger)`, text: `white`, icon: sad },
    info: {
      bg: `var(--ion-color-info)`,
      text: `white`,
      icon: informationCircle,
    },
    warning: {
      bg: `var(--ion-color-warning)`,
      text: `var(--ion-color-primary)`,
      icon: ellipsisHorizontalCircle,
    },
  };
  return obj[toast.value.type];
});
</script>

<style>
ion-toast.custom-toast {
  --background: v-bind(toastStyle.bg);
  --color: v-bind(toastStyle.text);
  --box-shadow: 0px 0px 10px 0 rgba(0, 0, 0, 0.132);
}

ion-toast.custom-toast::part(message) {
  /* font-style: italic; */
  font-size: 14px;
}

ion-toast.custom-toast::part(button) {
  border-left: 1px solid v-bind(toastStyle.text);
  color: v-bind(toastStyle.text);
  font-size: 15px;
}
</style>
