<template>
  <ion-page>
    <ion-header class="ion-no-border bg-white">
      <PNav />
      <h3 class="px-4 pb-2 text-2xl font-semibold text-primary">
        Bills & Payment
      </h3>
    </ion-header>
    <ion-content fullscreen>
      <ion-refresher slot="fixed" @ionRefresh="reload($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>

      <div class="ion-padding grid grid-cols-2 gap-3">
        <div
          v-for="item in items"
          :key="item.title"
          class="flex flex-col gap-1 rounded-lg border border-secondary p-3 text-xs text-dark-500"
        >
          <span class="text-dark-400">{{ item.title }}</span>
          <span class="text-sm font-medium">
            {{ item.value }}
          </span>
        </div>
      </div>

      <PDivider />

      <div
        @click="$router.push({ name: 'AutoBilling' })"
        class="ion-padding flex items-center justify-between gap-2 text-dark-500"
      >
        <div class="flex flex-col gap-1">
          <span class="font-medium">Auto-Billing</span>
          <span class="text-sm text-dark-400">
            Automate the billing process
          </span>
        </div>

        <ion-toggle
          class="pointer-events-none"
          v-model="autoBillingStatus"
          mode="ios"
          slot="end"
          color="secondary"
        ></ion-toggle>
      </div>

      <PDivider />

      <!-- <div class="ion-padding grid grid-cols-1 gap-3 text-dark-500">
        <div class="flex items-center justify-between">
          Cards
          <span
            class="flex cursor-pointer items-center gap-2 text-sm text-secondary"
          >
            <i class="pi pi-plus"></i>
            Add New Card
          </span>
        </div>
        <span class="text-dark-400 text-sm -mt-1">
            You have no cards
        </span>
        <CreditCard />
      </div>
      <PDivider /> -->

      <div class="ion-padding">
        <BillingTransactions />
      </div>
    </ion-content>

    <PLoader v-if="loading" />
  </ion-page>
</template>

<script setup>
import {
  IonPage,
  IonHeader,
  IonContent,
  IonToggle,
  IonRefresher,
  IonRefresherContent,
  onIonViewWillEnter,
} from "@ionic/vue";

import BillingTransactions from "./BillingTransactions.vue";

import { computed, inject, ref } from "vue";
import { useDataStore } from "@/stores/data.js";
import { helperFunctions } from "@/composable/helperFunctions";

const store = useDataStore();
const http = inject("http");
const { showToast, formatAmount, processError } = helperFunctions;

const loading = ref(false);
const autoBillingStatus = computed(() => store.getAutoBillingStatus);

const items = computed(() => {
  return [
    {
      title: "Next Billing Amount",
      value: "N/A",
    },
    {
      title: "Next Billing Date",
      value: "N/A",
    },
  ];
});

const reload = async (event) => {
  await queryAutoBillingStatus();
  await queryMywallet();
  await queryCards();
  event.target.complete();
};

onIonViewWillEnter(async () => {
  try {
    loading.value = true;
    await queryAutoBillingStatus();
    queryMywallet();
    queryCards();
    loading.value = false;
  } catch (error) {
    loading.value = false;
  }
});

const queryAutoBillingStatus = async () => {
  try {
    const res = await http({
      endpoint: "AutoBillingStatus",
      httpMethod: "get",
    });

    console.log(res);

    store.$patch({
      autoBillingStatus: res.isAutoBillingActivated,
    });
  } catch (error) {
    const message = processError(error);
    console.log(message);
  }
};

const queryMywallet = async () => {
  try {
    const res = await http({
      endpoint: "MyWallet",
      httpMethod: "get",
    });
    console.log(res);

    store.$patch({
      wallet: res,
    });
  } catch (error) {
    const message = processError(error);
    console.log(message);
  }
};

const queryCards = async () => {
  try {
    // loading.value = true;
    const res = await http({
      endpoint: "GetCards",
      httpMethod: "get",
    });

    // loading.value = false;
    console.log(res);
    store.$patch({
      cards: res.items,
    });
  } catch (error) {
    // loading.value = false;
    const message = processError(error);
    console.log(message);
  }
};
</script>
