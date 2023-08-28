<template>
  <ion-page>
    <PNav title="Subscription" :showBackButton="false" />
    <ion-content fullscreen>
      <div class="ion-padding flex flex-col gap-4">Subscription Page</div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { IonPage, IonContent } from "@ionic/vue";
import { computed } from "vue";
</script>
