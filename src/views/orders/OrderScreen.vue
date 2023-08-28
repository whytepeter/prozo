<template>
  <ion-page>
    <PNav title="Orders" :showBackButton="false">
      <ion-buttons slot="end">
        <div class="mb-4">
          <PButton fill="clear" color="secondary"> Order History </PButton>
        </div>
      </ion-buttons>
    </PNav>
    <ion-content :fullscreen="true">
      <div class="ion-padding flex flex-col gap-4 py-3 text-lg text-dark-500">
        Upcoming Orders
      </div>

      <PDivider />

      <div class="ion-padding grid grid-cols-1 gap-2 text-sm text-dark-500">
        Wednesday, Mar 29,2023

        <div
          class="rounded-lg border border-secondary bg-primary-light p-3"
        ></div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { IonPage, IonContent, IonButtons } from "@ionic/vue";
</script>
