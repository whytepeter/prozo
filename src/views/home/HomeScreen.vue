<template>
  <ion-page>
    <ProfileHeader />

    <ion-content fullscreen>
      <ion-refresher slot="fixed" @ionRefresh="reload($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>

      <div class="ion-padding -mt-2 grid grid-cols-1 gap-4 text-dark-500">
        <!-- <PButton @click="$router.push({ name: 'Login' })">Login</PButton> -->
        <div @click="$router.push({ name: 'FoodService' })" class="foodStyle">
          <span>Food Services</span>
          <div class="absolute -right-6 -top-6 h-[7rem] w-[7rem]">
            <img
              src="@/assets/images/food.png"
              alt=""
              class="w-full object-cover"
            />
          </div>
        </div>

        <div class="grid grid-cols-12 gap-3 text-xs">
          <div class="cleaningStyle">
            <div class="absolute -top-4 right-0 h-20 w-20">
              <img
                src="@/assets/images/cleaning.png"
                alt=""
                class="w-full object-cover"
              />
            </div>
            <span>Cleaning</span>
          </div>

          <div class="col-span-7 grid grid-cols-2 gap-3">
            <div class="cardStyle border-accent bg-accent-light">
              <div class="absolute right-0 top-1 h-14 w-14">
                <img
                  src="@/assets/images/laundry.png"
                  alt=""
                  class="w-full object-cover"
                />
              </div>
              <span>Laundry</span>
            </div>

            <div class="cardStyle border-info bg-info-light">
              <div class="absolute right-0 top-1 h-14 w-14">
                <img
                  src="@/assets/images/fumigation.png"
                  alt=""
                  class="w-full object-cover"
                />
              </div>
              <span>Fumigation</span>
            </div>
          </div>
        </div>

        <div @click="$router.push({ name: 'Subscription' })" class="subStyle">
          <span class="ml-16">Start a subscriptions</span>
          <div class="absolute -bottom-6 -left-5 h-24 w-24">
            <img
              src="@/assets/images/subscription.png"
              alt=""
              class="w-full object-cover"
            />
          </div>
        </div>
      </div>
      <PDivider />

      <TodayService />
    </ion-content>
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

import ProfileHeader from "./ProfileHeader.vue";
import TodayService from "./TodayService.vue";

import { Preferences } from "@capacitor/preferences";
import { useDataStore } from "@/stores/data.js";
import { useRouter } from "vue-router";
import { computed } from "vue";

const store = useDataStore();
const router = useRouter();

const user = computed(() => store.getUser);
const reload = async (event) => {
  setTimeout(() => {
    event.target.complete();
  }, 2000);
};

onIonViewWillEnter(async () => {
  if (user.value && !user.value.isPinSet) {
    await Preferences.set({ key: "fromHome", value: "true" });
    router.push({ name: "ChangePin" });
  }
});
</script>

<style scope lang="scss">
.foodStyle {
  @apply relative flex h-[90px] items-center overflow-hidden rounded-xl border border-primary bg-primary-light p-4 text-primary;
}

.cleaningStyle {
  @apply relative col-span-5 flex h-[90px] flex-col justify-end overflow-hidden rounded-xl border border-tertiary bg-tertiary-light px-3 py-2;
}

.cardStyle {
  @apply relative  flex h-full h-full w-full w-full flex-col justify-end overflow-hidden whitespace-nowrap rounded-xl border px-2 py-2;
}

.subStyle {
  @apply relative overflow-hidden rounded-xl bg-primary px-4 py-7 text-white;
}
</style>
