<template>
  <ion-page>
    <ion-header class="ion-no-border bg-white">
      <PNav />
      <h3 class="px-4 pb-2 text-2xl font-semibold text-primary">
        Referral & Bonus
      </h3>
    </ion-header>
    <ion-content fullscreen class="">
      <ion-refresher slot="fixed" @ionRefresh="reload($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      <div class="ion-padding relative grid grid-cols-1 gap-4 pt-0">
        <div class="">
          <p class="text-sm text-dark-400">
            Share your referral code and get
            <span class="font-semibold">₦500</span> when whoever you refer signs
            up and makes an order
          </p>
        </div>

        <div class="relative mt-6 flex items-center gap-4 text-primary">
          <div
            class="flex w-fit items-center gap-2 rounded-full border-2 border-secondary bg-primary-light px-4 py-2 text-base font-medium"
          >
            {{ user && user.ref_code }}

            <img
              @click="copyText(user && user.ref_code)"
              src="@/assets/icon/copy-p.svg"
              alt=""
            />
          </div>
          <i @click="shareCode" class="pi pi-share-alt text-xl font-bold"></i>

          <span class="absolute -right-16 -top-10">
            <img :src="referralIcon" alt="" />
          </span>
        </div>
      </div>

      <PDivider class="mt-20" />

      <div
        class="ion-padding flex flex-col gap-1 py-2 text-center text-dark-300"
      >
        <span class="text-xs">Total Earnings</span>
        <span class="text-2xl font-semibold text-primary">
          {{ formatAmount(earnings ? earnings : 0) }}
        </span>
      </div>

      <PDivider />

      <div class="px-4 pt-3 text-dark-500">
        <h4 class="mb-3 text-lg">My Referrals</h4>
        <div
          v-if="referrals && referrals.length"
          class="grid grid-cols-1 gap-4"
        >
          <div v-for="(item, i) in visibleData" :key="i">
            <p class="mb-4 text-sm text-dark-400">
              {{ weeks[item.day] }}, {{ months[item.month] }} {{ item.date }},
              {{ item.year }}
            </p>

            <div class="grid grid-cols-1 gap-4 text-sm">
              <div
                v-for="refs in item.data"
                :key="refs.id"
                class="flex items-center gap-3 border-b border-dark-50 pb-4 last:border-0"
              >
                <div
                  class="flex h-14 w-14 flex-shrink-0 items-center items-center justify-center rounded-full border-2 border-tertiary-light bg-primary p-2 font-medium text-tertiary"
                >
                  {{ initials(refs.user) }}
                </div>

                <div class="flex w-full justify-between gap-4">
                  <div class="grid grid-cols-1 text-left">
                    <span class="text-lg"
                      >{{ refs.user.first_name }}
                      {{ refs.user.last_name }}</span
                    >
                    <span class="text-xs uppercase text-dark-400">
                      {{ refs.time }}
                    </span>
                  </div>
                  <div class="grid grid-cols-1 justify-items-end text-left">
                    <span class="text-[16px] font-medium">{{
                      formatAmount(refs.amount)
                    }}</span>
                    <span
                      :class="[
                        refs.completed ? 'text-secondary' : 'text-warning',
                        'text-xs ',
                      ]"
                      >{{ refs.completed ? "Completed" : "Pending" }}</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <PEmpty
          v-else
          :icon="EmptyUser"
          caption="You don’t have any referrals at the moment"
        />
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

import referralIcon from "@/assets/icon/refIcon.svg";
import EmptyUser from "@/assets/icon/emptyUser.svg";

import { useDataStore } from "@/stores/data.js";
import { computed, inject, ref, watch } from "vue";
import { helperFunctions } from "@/composable/helperFunctions";

const {
  copyText,
  formatAmount,
  initials,
  formatDate,
  shareText,
  processError,
  transformData,
} = helperFunctions;

const store = useDataStore();
const http = inject("http");

const loading = ref(false);

const user = computed(() => store.getUser);
const earnings = computed(() => store.getReferralEarnings);
const visibleData = ref([]);
const referrals = computed(() => store.getReferrals);

visibleData.value = transformData(referrals.value);

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

const shareCode = () => {
  shareText({
    text: `Make your life 10x better! Sign up with my referral code ${
      user.value && user.value.ref_code
    } & enjoy 5% off your first order today!`,
    url: `https://admin-main-dev.onrender.com/auth/register?ref=${
      user.value && user.value.ref_code
    }`,
  });
};

const reload = async (event) => {
  await queryReferrals();
  await queryReferralEarnings();
  event.target.complete();
};

onIonViewWillEnter(async () => {
  loading.value = true;
  await queryReferrals();
  await queryReferralEarnings();
  loading.value = false;
  visibleData.value = transformData(referrals.value);
});

watch(referrals, () => {
  visibleData.value = transformData(referrals.value);
});

const queryReferrals = async () => {
  try {
    const res = await http({
      endpoint: "GetReferrals",
      httpMethod: "get",
      // additionalParams: {
      //   page: 1,
      // },
    });

    console.log(res);
    store.$patch({
      referrals: res.items,
    });
  } catch (error) {
    const message = processError(error);
    console.log(message);
  }
};
const queryReferralEarnings = async () => {
  try {
    const res = await http({
      endpoint: "GetReferralEarnings",
      httpMethod: "get",
    });

    console.log(res);

    store.$patch({
      referralEarnings: res,
    });
  } catch (error) {
    const message = processError(error);
    console.log(message);
  }
};
</script>
