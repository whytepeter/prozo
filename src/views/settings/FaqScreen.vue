<template>
  <ion-page>
    <PNav title="" />
    <ion-content fullscreen>
      <ion-refresher slot="fixed" @ionRefresh="reload($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      <h3 class="px-4 text-2xl font-semibold text-primary">FAQs</h3>
      <ion-grid>
        <ion-row v-if="faqs">
          <ion-col
            size="12"
            class="border-outline border-t p-0 first:border-t-0"
            v-for="item in faqs"
            :key="item.id"
          >
            <div
              @click="toggleQuestion(item)"
              class="ion-activatable relative flex items-center justify-between overflow-hidden p-4 py-5 text-sm"
            >
              <div class="grid auto-cols-auto grid-flow-col items-center gap-4">
                <span class="font-medium text-dark-500">
                  {{ item.title }}
                </span>
              </div>
              <ion-icon
                class="text-xl"
                :icon="
                  openQuestion == item.title ? chevronDown : chevronForward
                "
                color="medium"
              ></ion-icon>
              <ion-ripple-effect
                type="unbounded"
                class="text-dark-100"
              ></ion-ripple-effect>
            </div>
            <div
              class="border-outline border-b px-4 pb-4 pt-2 text-sm font-light text-dark-500"
              v-if="openQuestion == item.title"
              v-html="item.text"
            ></div>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup>
import {
  IonPage,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonRefresher,
  IonRefresherContent,
  onIonViewWillEnter,
} from "@ionic/vue";
import { chevronForward, chevronDown } from "ionicons/icons";

import { computed, ref } from "vue";
import { inject } from "vue";
import { useDataStore } from "@/stores/data.js";

const store = useDataStore();
const http = inject("http");

const openQuestion = ref(null);

const faqs = computed(() => store.getFaq);

const toggleQuestion = (arg) => {
  openQuestion.value = openQuestion.value === arg.title ? null : arg.title;
};

const reload = async (event) => {
  await queryFaq();
  event.target.complete();
};

onIonViewWillEnter(() => {
  queryFaq();
});

const queryFaq = async () => {
  try {
    const res = await http({
      endpoint: "GetFaq",
      httpMethod: "get",
    });

    console.log(res);
    store.$patch({
      faq: res,
    });
  } catch (error) {}
};
</script>
