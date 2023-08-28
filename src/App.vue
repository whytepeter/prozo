<template>
  <ion-app>
    <ion-router-outlet />
    <PToast />
  </ion-app>
</template>

<script setup>
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/keyboard";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/zoom";
import "@ionic/vue/css/ionic-swiper.css";

import { IonApp, IonRouterOutlet } from "@ionic/vue";

import { useDataStore } from "@/stores/data.js";
import { Network } from "@capacitor/network";

const store = useDataStore();

Network.addListener("networkStatusChange", (status) => {
  console.log("Network status changed", status);
  showWarning(status.connected);
});

const showWarning = (status) => {
  console.log(status);
  console.log(store.getToast);
  if (!status) {
    store.setToast({
      isOpen: true,
      type: "warning",
      position: "top",
      message: "It looks like you're offline",
      duration: 100000,
    });
  } else {
    store.setToast({
      isOpen: false,
      type: "warning",
      duration: 3000,
    });

    setTimeout(() => {
      store.setToast({
        isOpen: true,
        type: "success",
        position: "top",
        message: "You are back online",
        duration: 3000,
      });
    }, 1000);
  }
};
</script>

<style>
* {
  font-family: "Poppins", sans-serif;
}
</style>
