<template>
  <ion-page>
    <ion-header class="ion-no-border bg-white">
      <PNav />
      <h3 class="px-4 pb-2 text-2xl font-semibold text-primary">Cart</h3>
    </ion-header>

    <ion-content fullscreen class="ion-padding">
      <ion-refresher slot="fixed" @ionRefresh="reload($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>

      <div class="grid w-full grid-cols-1 gap-4">
        <FoodCard cart v-for="(item, i) in 4" :key="i" />
      </div>
    </ion-content>

    <PFooter color="">
      <PDivider noMargin class="" />
      <div class="ion-padding mb-4 grid-cols-1 bg-white">
        <div
          class="items-cente flex justify-between p-1 pb-4 text-sm text-dark-400"
        >
          <span>Total(4 meals)</span>
          <span class="font-medium text-dark-600">
            {{ formatAmount(3500 * 4) }}
          </span>
        </div>

        <PButton block> Got to checkout </PButton>
      </div>
    </PFooter>
  </ion-page>
</template>

<script setup>
import {
  IonPage,
  IonHeader,
  IonContent,
  IonRefresher,
  IonRefresherContent,
  IonRippleEffect,
} from "@ionic/vue";

import FoodCard from "./FoodCard.vue";

import { helperFunctions } from "@/composable/helperFunctions";
const { formatAmount } = helperFunctions;

const reload = async (event) => {
  setTimeout(() => {
    event.target.complete();
  }, 2000);
};
</script>

<style></style>
