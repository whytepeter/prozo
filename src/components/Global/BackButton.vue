<template>
  <ion-buttons slot="start" @click="onClick">
    <ion-back-button
      :color="color"
      class="Navbar text-sm"
      :icon="arrowBack"
    ></ion-back-button>
  </ion-buttons>
</template>

<script setup>
import {
  IonHeader,
  IonToolbar,
  IonBackButton,
  IonButtons,
  IonTitle,
  IonProgressBar,
} from "@ionic/vue";

import { arrowBack } from "ionicons/icons";

defineProps({
  color: {
    type: String,
    default: "primary",
  },
});
defineEmits(["onClick"]);
</script>

<style></style>
