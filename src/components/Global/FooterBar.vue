<template>
  <ion-footer :class="['ion-no-border', `bg-${color}`]">
    <ion-toolbar :color="color">
      <slot />
    </ion-toolbar>
  </ion-footer>
</template>

<script setup>
import { IonFooter, IonToolbar } from "@ionic/vue";

defineProps({
  color: {
    type: String,
    default: "white",
  },
});
</script>

<style></style>
