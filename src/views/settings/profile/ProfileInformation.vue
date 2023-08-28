<template>
  <ion-page>
    <ion-header class="ion-no-border bg-tertiary-light">
      <PNav color="tertiary-light" />
      <h3 class="px-4 pb-2 text-2xl font-semibold text-primary">My Profile</h3>
    </ion-header>

    <ion-content fullscreen color="ptertiary">
      <ion-refresher slot="fixed" @ionRefresh="reload($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      <div class="grid grid-cols-1 gap-3 bg-tertiary-light px-4">
        <div
          class="flex flex-col items-center gap-2 pb-6 pt-2 text-center text-xl font-semibold text-primary"
        >
          <div
            class="flex h-24 w-24 flex-shrink-0 items-center items-center justify-center rounded-full border-2 border-tertiary bg-primary p-2 text-2xl font-semibold text-tertiary"
          >
            {{ initials(user && user) }}
          </div>
          <span
            >{{ user && user.first_name }} {{ user && user.last_name }}</span
          >

          <PButton @click="editModal = true" size="small" fill="outline"
            >Edit Profile</PButton
          >
        </div>
      </div>

      <div class="grid grid-cols-1 gap-1 bg-white py-4" v-if="user">
        <div
          class="last:border-o flex justify-between gap-4 border-b border-dark-50 p-4"
          v-for="(user, i) in displayData"
          :key="i"
        >
          <span class="text-xs text-dark-400">{{ user.title }}</span>
          <span
            :class="[
              user.value ? 'text-dark-500' : 'text-dark-300',
              'text-right text-sm ',
            ]"
            >{{ user.value ? user.value : "N/A" }}</span
          >
        </div>
      </div>
      <div v-else class="text-center text-xs text-dark-400">
        Pull to refresh
      </div>
    </ion-content>

    <EditProfile :user="user" :isOpen="editModal" @close="editModal = false" />
  </ion-page>
</template>

<script setup>
import {
  IonPage,
  IonHeader,
  IonContent,
  IonButtons,
  IonButton,
  IonRefresher,
  IonRefresherContent,
} from "@ionic/vue";
import { computed, ref } from "vue";
import { useDataStore } from "@/stores/data.js";
import { helperFunctions } from "@/composable/helperFunctions";
import { inject } from "vue";

import EditProfile from "./EditProfile.vue";

const http = inject("http");
const { initials, showToast, processError } = helperFunctions;
const store = useDataStore();
const editModal = ref(false);

const user = computed(() => store.getUser);
const displayData = computed(() => {
  return [
    {
      title: "Email",
      value: user.value.email,
    },
    {
      title: "Phone Number",
      value: user.value.phone_number,
    },
    {
      title: "Address",
      value: user.value.location.address,
    },
    {
      title: "Location Area",
      value: user.value.location.location_area,
    },
    {
      title: "Land Mark",
      value: user.value.location.landmark,
    },
    {
      title: "Gender",
      value: user.value.gender,
    },
    {
      title: "Date of Birth",
      value: user.value.dob,
    },
  ];
});

const reload = async (event) => {
  await getUser();
  event.target.complete();
};

const getUser = async () => {
  try {
    const res = await http({
      endpoint: "GetUser",
      httpMethod: "get",
    });
    console.log(res);
    store.$patch({
      user: res,
    });

    getUserLocationDetails(res);
  } catch (error) {
    const message = processError(error);
    showToast("error", message);
    console.log(message);
  }
};

const getUserLocationDetails = async (user) => {
  try {
    const res = await http({
      endpoint: "GetUserLocation",
      httpMethod: "get",
    });
    user.location = res;
    store.$patch({
      user,
    });

    console.log(user);
  } catch (error) {
    console.log(error);
  }
};
</script>
