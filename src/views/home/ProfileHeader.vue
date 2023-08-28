<template>
  <ion-header class="ion-no-border bg-white pt-2">
    <ion-toolbar color="white" class="mt-2 p-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <!-- @click="$router.push({ name: 'UserProfile' })" -->
          <!-- <ion-avatar
            v-if="user.profileUrl"
            class="rounded-full border-2 border-primary w-14 h-14 overflow-hidden"
          >
            <ion-img class="h-full"></ion-img>
          </ion-avatar>
          <div
            v-else
            class="p-2 w-12 h-12 flex-shrink-0 border-2 border-tertiary-light text-lg bg-primary text-white rounded-full flex items-center items-center justify-center"
          >
            <img :src="userIcon" alt="" />
          </div> -->
          <div class="w-52 truncate text-lg font-medium text-dark-500">
            <span class="text-dark-300"> Hello, </span>
            <span class="text-primary"> {{ user && user.first_name }}</span>
          </div>
        </div>

        <div class="flex items-center gap-1">
          <span class="ion-activatable relative overflow-hidden p-2">
            <img src="@/assets/icon/gift.svg" alt="" />
            <ion-ripple-effect
              class="text-dark-200"
              type="unbounded"
            ></ion-ripple-effect>
          </span>

          <span
            @click="$router.push({ name: 'Notification' })"
            class="ion-activatable relative overflow-hidden p-2"
          >
            <img src="@/assets/icon/bell.svg" alt="" />
            <div
              class="absolute right-2 top-2 rounded-full border-2 border-white bg-secondary p-1"
            ></div>
            <ion-ripple-effect
              class="text-dark-200"
              type="unbounded"
            ></ion-ripple-effect>
          </span>
        </div>
      </div>
    </ion-toolbar>
  </ion-header>
</template>

<script setup>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonAvatar,
  IonRippleEffect,
} from "@ionic/vue";

import userIcon from "@/assets/icon/userIcon.svg";
import { computed, ref } from "vue";
import { useDataStore } from "@/stores/data.js";

const store = useDataStore();

const user = computed(() => store.getUser);
console.log(user.value);
</script>

<style></style>
