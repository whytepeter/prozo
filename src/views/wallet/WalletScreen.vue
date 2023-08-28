<template>
  <ion-page>
    <PNav title="Wallet" :showBackButton="false" />
    <ion-content :fullscreen="true">
      <ion-refresher slot="fixed" @ionRefresh="reload($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      <div class="ion-padding grid grid-cols-1 gap-6">
        <WalletCard />

        <PInfo
          @click="$router.push({ name: 'RedeemGiftcards' })"
          :icon="giftCardIcon"
          title="Redeem Gift Card"
          text="Unlock exclusive benefits through gift cards"
        />

        <Transactions />
      </div>
    </ion-content>
    <PLoader v-if="loading" />
  </ion-page>
</template>

<script setup>
import {
  IonPage,
  IonContent,
  IonRefresher,
  IonRefresherContent,
  onIonViewWillEnter,
} from "@ionic/vue";

import giftCardIcon from "@/assets/icon/giftcard-y.svg";
import WalletCard from "./WalletCard.vue";
import Transactions from "./Transactions.vue";

import { inject, ref } from "vue";
import { useDataStore } from "@/stores/data.js";
import { helperFunctions } from "@/composable/helperFunctions";

const { processError } = helperFunctions;
const store = useDataStore();
const http = inject("http");
const loading = ref(false);

const reload = async (event) => {
  await queryBalance();
  await queryTransactions();
  event.target.complete();
};

onIonViewWillEnter(async () => {
  loading.value = true;
  queryBalance();
  await queryTransactions();
  queryCards();
  loading.value = false;
});

const queryBalance = async () => {
  try {
    const res = await http({
      endpoint: "GetWallet",
      httpMethod: "get",
    });

    console.log(res);
    store.setWalletBalance(res);
  } catch (error) {}
};

const queryCards = async () => {
  try {
    const res = await http({
      endpoint: "GetCards",
      httpMethod: "get",
    });

    console.log(res);
    store.$patch({
      cards: res.items,
    });
  } catch (error) {
    const message = processError(error);
    console.log(message);
  }
};
const queryTransactions = async () => {
  loading.value = true;
  try {
    const res = await http({
      endpoint: "GetTransactions",
      httpMethod: "get",
    });

    loading.value = false;
    console.log(res);

    store.$patch({
      transactions: res.items,
    });
  } catch (error) {
    loading.value = false;
    const message = processError(error);
    console.log(message);
  }
};
</script>
