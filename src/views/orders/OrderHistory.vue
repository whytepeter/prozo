<template>
  <ion-page>
    <PNav title="Orders History" />
      

    <ion-content :fullscreen="true">
      <div class="ion-padding flex flex-col gap-4">
       Order History
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { IonPage, IonContent,  } from "@ionic/vue";
</script>
