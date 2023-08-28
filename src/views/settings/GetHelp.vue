<template>
  <ion-page>
    <PNav title="" />
    <ion-content fullscreen>
      <div class="pb-4">
        <h3 class="px-4 text-2xl font-semibold text-primary">Get Help</h3>
        <div
          v-for="(link, i) in links"
          :key="i"
          class="ion-activatable border-outline relative flex items-center justify-between overflow-hidden border-b p-4 last:border-none"
        >
          <div class="flex items-center gap-4">
            <div
              class="bg-background flex h-9 w-9 items-center justify-center rounded-full"
            >
              <img :src="link.icon" />
            </div>

            <span class="text-dark-500">
              {{ link.title }}
            </span>
          </div>
          <ion-icon
            class="text-xl"
            :icon="chevronForward"
            color="medium"
          ></ion-icon>
          <ion-ripple-effect
            type="unbounded"
            class="text-dark-100"
          ></ion-ripple-effect>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { IonPage, IonContent, IonRippleEffect } from "@ionic/vue";
import { chevronForward } from "ionicons/icons";

import chatIcon from "@/assets/icon/chatIcon.svg";
import twitterIcon from "@/assets/icon/twitter.svg";
import callIcon from "@/assets/icon/callIcon.svg";
import mailIcon from "@/assets/icon/mailIcon.svg";

import { computed } from "vue";

const links = computed(() => {
  return [
    {
      title: "Live Chat",
      icon: chatIcon,
    },
    {
      title: "Email Us",
      icon: mailIcon,
    },
    {
      title: "Call Us",
      icon: callIcon,
    },
    {
      title: "Twitter",
      icon: twitterIcon,
    },
  ];
});
</script>

<style></style>
