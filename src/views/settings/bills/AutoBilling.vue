<template>
  <ion-page>
    <PNav />
    <ion-content fullscreen>
      <ion-refresher slot="fixed" @ionRefresh="reload($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>

      <div class="grid grid-cols-1 gap-4">
        <div class="grid grid-cols-1 gap-3 px-4">
          <div class="flex items-center justify-between gap-4">
            <h3 class="text-2xl font-semibold text-primary">Auto Billing</h3>
            <div class="" @click="handleToggle">
              <ion-toggle
                v-model="autoBillingStatus"
                class="pointer-events-none"
                mode="ios"
                slot="end"
                color="secondary"
              ></ion-toggle>
            </div>
          </div>
          <p class="text-sm text-dark-400">
            Never miss a payment or subscription renewal again - let us handle
            it with our convenient automatic billing option
          </p>
        </div>

        <div
          v-if="autoBillingStatus"
          class="ion-padding grid grid-cols-1 gap-2"
        >
          <div v-if="method">
            <CreditCard :method="method.method" :card="method" outlined />
          </div>
          <div>
            <span
              @click="autoBillingModal = true"
              class="cursor-pointer text-sm text-secondary"
              >Change payment method</span
            >
          </div>
        </div>
        <div v-else>
          <PEmpty :icon="autoBill" title="Auto Billing not set" />
          <PButton
            @click="autoBillingModal = true"
            :loading="loading"
            block
            class="mx-4"
            >Set Auto Billing</PButton
          >
        </div>
      </div>
    </ion-content>

    <SetAutoBilling
      :isOpen="autoBillingModal"
      @close="autoBillingModal = false"
    />

    <PAlert
      type="info"
      :isOpen="showConfirm"
      @close="showConfirm = false"
      title="Off Auto Billing"
      caption="You are about to turn off auto billing"
    >
      <div class="grid grid-cols-2 gap-2">
        <PButton @click="showConfirm = false" block> Cancel</PButton>
        <PButton
          :loading="confirmLoading"
          fill="outline"
          @click="offAutoBilling"
          block
        >
          Yes</PButton
        >
      </div>
    </PAlert>

    <PLoader v-if="loading" />
  </ion-page>
</template>

<script setup>
import {
  IonPage,
  IonContent,
  IonToggle,
  IonRefresher,
  IonRefresherContent,
} from "@ionic/vue";

import walletIcon from "@/assets/icon/walletIcon.svg";
import autoBill from "@/assets/icon/autoBill.svg";

import CreditCard from "@/components/CreditCard.vue";
import SetAutoBilling from "./SetAutoBilling.vue";

import { computed, inject, ref } from "vue";
import { useDataStore } from "@/stores/data.js";
import { helperFunctions } from "@/composable/helperFunctions";

const store = useDataStore();
const http = inject("http");
const { showToast, formatAmount, processError } = helperFunctions;

const showConfirm = ref(false);
const confirmLoading = ref(false);
const autoBillingModal = ref(false);
const loading = ref(false);

const autoBillingStatus = computed(() => store.getAutoBillingStatus);

const method = computed(() => {
  const cards = [...store.getCards];
  const wallet = { ...store.getWallet };

  wallet.method = "wallet";
  cards.forEach((el) => {
    el.method = "card";
  });

  const options = [...[wallet], ...cards];
  return options.find((el) => el.use_for_auto_renew == true);

  console.log("options", options);
});

console.log("dafadfadad", method.value);

const reload = async (event) => {
  await queryAutoBillingStatus();
  await queryMywallet();
  await queryCards();
  event.target.complete();
};

const handleToggle = () => {
  if (autoBillingStatus.value) {
    showConfirm.value = true;
  } else {
    autoBillingModal.value = true;
  }
};

const offAutoBilling = async () => {
  try {
    confirmLoading.value = true;
    const res = await http({
      endpoint: "UpdateAutoBilling",
      httpMethod: "patch",
      body: { channel: null },
    });

    console.log(res);

    confirmLoading.value = false;
    showConfirm.value = false;
    loading.value = true;
    await queryAutoBillingStatus();
    showToast("success", "Auto Billing successfully updated");

    loading.value = false;
    await queryMywallet();
    await queryCards();
  } catch (error) {
    loading.value = false;
    const message = processError(error);
    console.log(message);
    showToast("error", message);
  }
};

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
