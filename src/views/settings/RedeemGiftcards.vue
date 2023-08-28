<template>
  <ion-page>
    <ion-header class="ion-no-border bg-white">
      <PNav />
      <h3 class="px-4 pb-2 text-2xl font-semibold text-primary">
        Redeem Giftcards
      </h3>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-refresher slot="fixed" @ionRefresh="reload($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      <div class="ion-padding grid grid-cols-1 gap-4 pt-0">
        <div class="">
          <p class="mt-1 text-sm text-dark-400">
            When you redeem a discount code, it is automatically applied to your
            next subscription
          </p>
        </div>

        <PInput :error="errorMessage" v-model="code" label="Enter Code" />
        <PButton :loading="redeemLoading" block @click="handleRedeem"
          >Redeem</PButton
        >

        <div class="mt-4 grid grid-cols-1 gap-2 text-dark-500">
          <h4 class="text-lg text-dark-500">Redemption History</h4>
          <div
            v-if="redeemedCards && redeemedCards.length"
            class="grid grid-cols-1 gap-4"
          >
            <div v-for="(item, i) in visibleData" :key="i">
              <p class="mb-4 text-sm text-dark-400">
                {{ weeks[item.day] }}, {{ months[item.month] }} {{ item.date }},
                {{ item.year }}
              </p>

              <div class="grid grid-cols-1 gap-4 text-sm">
                <div
                  class="flex items-center gap-3 border-b border-dark-50 pb-4 last:border-0"
                  v-for="card in item.data"
                  :key="card.id"
                >
                  <div class="w-12">
                    <img
                      src="@/assets/icon/giftcardIcon.svg"
                      alt=""
                      class="w-full object-cover"
                    />
                  </div>
                  <div class="flex w-full justify-between gap-4">
                    <div class="grid grid-cols-1">
                      <span class="text-base">{{ card.giftCard.code }}</span>
                      <span class="text-xs uppercase text-dark-400"
                        >{{ card.time }}
                      </span>
                    </div>
                    <div
                      class="text-left text-[16px] font-medium text-secondary"
                    >
                      {{ formatAmount(card.giftCard.amount) }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <PEmpty
            v-else
            caption="You don’t have any redeem gift cards at the moment"
          />
        </div>
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
  IonRefresher,
  IonRefresherContent,
  onIonViewWillEnter,
} from "@ionic/vue";

import { helperFunctions } from "@/composable/helperFunctions";
import { useDataStore } from "@/stores/data.js";
import { computed, ref, watch } from "vue";
import { inject } from "vue";

const http = inject("http");
const store = useDataStore();
const { showToast, processError, formatAmount, transformData } =
  helperFunctions;

const loading = ref(false);
const redeemLoading = ref(false);
const code = ref("");
const errorMessage = ref(false);

const visibleData = ref([]);
const redeemedCards = computed(() => store.getRedeemedCards);
visibleData.value = transformData(redeemedCards.value);

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let weeks = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const reload = async (event) => {
  await queryRedeemCards();
  event.target.complete();
};

watch(redeemedCards, () => {
  visibleData.value = transformData(redeemedCards.value);
  console.log(visibleData.value);
});

onIonViewWillEnter(async () => {
  loading.value = true;
  await queryRedeemCards();
  loading.value = false;
  visibleData.value = transformData(redeemedCards.value);
});

const handleRedeem = async () => {
  if (code.value.trim() !== "") {
    redeemLoading.value = true;
    loading.value = true;
    try {
      const res = await http({
        endpoint: "RedeemGiftcards",
        httpMethod: "post",
        body: {
          code: code.value,
        },
      });

      await queryRedeemCards();

      redeemLoading.value = false;
      loading.value = false;

      code.value = "";
      showToast("success", "Gift card redeem");
      console.log(res);
    } catch (error) {
      redeemLoading.value = false;
      loading.value = false;
      const message = processError(error);
      console.log(message);
      errorMessage.value = message;
    }
  } else {
    errorMessage.value = "Please enter code";
  }
};

const queryRedeemCards = async () => {
  try {
    const res = await http({
      endpoint: "GetRedeemedCards",
      httpMethod: "get",
    });

    console.log(res);

    store.$patch({
      redeemedCards: res.items,
    });
  } catch (error) {
    const message = processError(error);
    console.log(message);
  }
};
</script>
