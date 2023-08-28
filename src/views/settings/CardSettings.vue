<template>
  <ion-page>
    <PNav title="" />
    <ion-content fullscreen>
      <ion-refresher slot="fixed" @ionRefresh="reload($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      <div class="ion-padding grid grid-cols-1 gap-2 py-0">
        <h3 class="text-2xl font-semibold text-primary">Card Settings</h3>
        <p v-if="cards && cards.length" class="text-sm text-dark-400">
          Manage Cards
        </p>
      </div>
      <div
        v-if="cards && cards.length"
        class="ion-padding w-full text-dark-500"
      >
        <swiper
          :modules="modules"
          :autoplay="false"
          :zoom="true"
          :space-between="20"
          :slidesPerView="cards && cards.length > 1 ? 1.1 : 1"
          @swiper="setSwiperInstance"
          class=""
        >
          <swiper-slide class="" v-for="(card, i) in cards" :key="i">
            <CreditCard :card="card" />
          </swiper-slide>
        </swiper>
      </div>
      <div v-else class="py-6">
        <PEmpty
          :icon="cardIcon"
          caption="You don’t have any cards at the moment"
        />
      </div>
      <!-- <PDivider /> -->
    </ion-content>
    <PLoader v-if="loading" />
    <PFooter>
      <div class="ion-padding mb-4">
        <PButton @click="addCard" :loading="loading" block>
          <span class="flex items-center gap-2 capitalize">
            <i class="pi pi-plus"></i>
            Add a new debit card
          </span>
        </PButton>
      </div>
    </PFooter>
  </ion-page>
</template>

<script setup>
import {
  IonPage,
  IonContent,
  IonToggle,
  IonRefresher,
  IonRefresherContent,
  onIonViewWillEnter,
} from "@ionic/vue";

import cardIcon from "@/assets/icon/creditCard.svg";
import CreditCard from "@/components/CreditCard.vue";

import { Autoplay, Keyboard, Pagination, Navigation, Scrollbar } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";

import { computed, inject, ref } from "vue";
import { helperFunctions } from "@/composable/helperFunctions";
import { useDataStore } from "@/stores/data.js";

const store = useDataStore();
const http = inject("http");

const { showToast, formatAmount, openBrowser, processError } = helperFunctions;

const modules = [Autoplay, Keyboard, Navigation, Scrollbar];
const slides = ref();
const setSwiperInstance = (swiper) => {
  slides.value = swiper;
};

const loading = ref(false);

const cards = computed(() => store.getCards);
console.log("Cards", cards.value);

const reload = async (event) => {
  await queryCards();
  event.target.complete();
};

onIonViewWillEnter(() => {
  queryCards();
});

const addCard = async () => {
  try {
    loading.value = true;
    const res = await http({
      endpoint: "AddCard",
      httpMethod: "get",
      // additionalParams: {
      //   page: 1,
      // },
    });
    loading.value = false;

    openBrowser(res.data.authorization_url, "popover", queryCards);

    console.log(res);
  } catch (error) {
    loading.value = false;
    const message = processError(error);
    console.log(message);
  }
};

const queryCards = async () => {
  try {
    loading.value = true;
    const res = await http({
      endpoint: "GetCards",
      httpMethod: "get",
    });

    loading.value = false;
    console.log(res);
    store.$patch({
      cards: res.items,
    });
  } catch (error) {
    loading.value = false;
    const message = processError(error);
    console.log(message);
  }
};
</script>
