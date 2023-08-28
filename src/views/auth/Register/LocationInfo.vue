<template>
  <ion-page>
    <PNav />
    <ion-content fullscreen>
      <ion-refresher slot="fixed" @ionRefresh="reload($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      <div class="grid grid-cols-1 gap-2 px-4">
        <div>
          <img src="@/assets/icon/location.svg" alt="" />
        </div>
        <h3 class="text-2xl font-semibold text-primary">Where do you stay?</h3>
        <p class="text-sm text-dark-400">
          We need your location so we can show you the service we offer in your
          region
        </p>
      </div>

      <form class="ion-padding grid grid-cols-1 gap-2">
        <PSelect fullscreen :value="args.state" disabled label="Select State" />
        <PSelect
          fullscreen
          :loading="loading"
          :value="args.location_area"
          @update="args.location_area = $event"
          :options="locationAreas"
          label="Location Area"
          :error="errorRules.location"
        />
        <p class="my-2 pl-1 text-sm text-dark-400">
          Can’t find your location?
          <span
            @click="$router.push({ name: 'JoinUs' })"
            class="font-medium text-secondary"
            >Click here</span
          >
        </p>
      </form>
    </ion-content>
    <PFooter>
      <div class="ion-padding mb-4">
        <PButton @click="submit" block type="submit">Next</PButton>
      </div>
    </PFooter>
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
import { computed, onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { Preferences } from "@capacitor/preferences";
import { useDataStore } from "@/stores/data.js";
import { inject } from "vue";

import { helperFunctions } from "@/composable/helperFunctions";

const { processError } = helperFunctions;
const store = useDataStore();
const http = inject("http");
const router = useRouter();

const loading = ref(false);

const locationAreas = computed(() => {
  return (
    store.getlocationAreas &&
    store.getlocationAreas.map((el) => {
      return {
        label: el.name,
        value: el.name,
      };
    })
  );
});

const args = reactive({
  state: "FCT - Abuja",
  location_area: "",
});

const errorRules = reactive({
  location: false,
});

const reload = async (event) => {
  await queryLocation();
  event.target.complete();
};

onIonViewWillEnter(() => {
  reload();
});

const submit = async () => {
  if (args.location_area.trim() !== "") {
    errorRules.location = false;
    await Preferences.set({ key: "location_area", value: args.location_area });

    args.location_area = ""; //clear fields
    router.push({ name: "RegisterPersonal" });
  } else {
    errorRules.location = "Please select a location";
  }
};

const queryLocation = async () => {
  if (!locationAreas.value.length) {
    try {
      loading.value = true;
      const res = await http({
        endpoint: "GetAllLocation",
        httpMethod: "get",
      });

      loading.value = false;

      store.$patch({
        locationAreas: res,
      });
    } catch (error) {
      loading.value = false;
      const message = processError(error);
      console.log(message);
    }
  }
};
</script>
