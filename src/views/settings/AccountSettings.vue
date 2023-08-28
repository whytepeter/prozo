<template>
  <ion-page>
    <ion-header class="ion-no-border bg-white pt-4">
      <ion-toolbar color="white" class="mt-2 p-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div
              class="flex h-16 w-16 flex-shrink-0 items-center items-center justify-center rounded-full border-2 border-tertiary-light bg-primary p-2 font-semibold text-tertiary"
            >
              {{ initials(user && user) }}
            </div>
            <div class="w-52 truncate text-lg font-medium text-dark-500">
              <div class="flex items-center gap-1 text-primary">
                {{ user && user.first_name }} {{ user && user.last_name }}
                <img
                  v-if="user && user.verified"
                  src="@/assets/icon/verified.svg"
                  alt=""
                  class="w-5"
                />
              </div>
              <div class="flex items-center gap-2">
                <span
                  class="mt-1 w-fit rounded-full border-[1.5px] border-tertiary-light px-2 py-[1.5px] text-sm text-dark-400"
                >
                  {{ user && user.ref_code }}
                </span>
                <span class="" @click="copyText(user && user.ref_code)">
                  <img src="@/assets/icon/copy-t.svg" alt="" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" color="tertiary">
      <ion-grid class="-mt-2 bg-white p-0 text-dark-600">
        <ion-row
          v-for="(section, i) in sections"
          :key="i"
          class="mt-4 first:mt-0"
        >
          <ion-col size="12" class="mb-4 p-0">
            <PDivider />
          </ion-col>
          <ion-col size="12" class="mb-1 p-0 px-4">
            {{ section.title }}
          </ion-col>
          <ion-col
            size="12"
            class="p-0"
            v-for="(link, i) in section.links"
            :key="`link-${i}`"
          >
            <div
              @click="clickLink(link)"
              class="ion-activatable relative flex items-center justify-between overflow-hidden px-4 py-3"
            >
              <div class="flex items-center gap-2">
                <div
                  class="bg-background flex h-9 w-9 items-center justify-center rounded-full"
                >
                  <img :src="link.icon" />
                </div>
                <div class="flex flex-col font-light text-dark-600">
                  <span>{{ link.name }}</span>
                  <span class="text-xs text-dark-400">{{
                    link.description
                  }}</span>
                </div>
              </div>
              <div v-if="link.toggle" class="pointer-events-none">
                <ion-toggle
                  mode="ios"
                  v-model="notification"
                  v-if="link.name === 'Push Notification'"
                  slot="end"
                  color="secondary"
                ></ion-toggle>
              </div>
              <ion-icon
                v-else
                class="text-xl"
                :icon="chevronForward"
                color="medium"
              ></ion-icon>
              <ion-ripple-effect
                type="unbounded"
                class="text-dark-100"
              ></ion-ripple-effect>
            </div>
          </ion-col>
        </ion-row>

        <ion-row class="p-0">
          <ion-col @click="logoutModal = true" size="12" class="p-0">
            <div
              class="ion-activatable relative flex items-center justify-between overflow-hidden px-4 py-3"
            >
              <div class="flex items-center gap-2">
                <div
                  class="bg-background flex h-9 w-9 items-center justify-center rounded-full"
                >
                  <img :src="logoutIcon" />
                </div>
                <span class="text-error"> Logout </span>
              </div>
              <ion-ripple-effect
                type="unbounded"
                class="text-red-100"
              ></ion-ripple-effect>
            </div>
          </ion-col>

          <ion-col
            size="12"
            class="ion-padding mt-4 bg-tertiary text-xs text-primary"
          >
            <div class="flex items-center gap-3">
              <div class="h-10 w-10">
                <img src="@/assets/icon/logo.svg" alt="" class="w-full" />
              </div>
              <div class="flex flex-col leading-3">
                <strong class="text-sm">Prozo</strong>
                <span>Version 1.0</span>
              </div>
            </div>
          </ion-col>
        </ion-row>
      </ion-grid>

      <PAlert
        type="sad"
        :isOpen="logoutModal"
        @close="logoutModal = false"
        title="Logout"
        caption="Oh snap you're leaving"
      >
        <div class="grid grid-cols-1 gap-3">
          <PButton @click="logoutModal = false" block> Cancel</PButton>
          <PButton fill="outline" @click="handleLogout" block>
            Yes, Log me out</PButton
          >
        </div>
      </PAlert>
    </ion-content>

    <PLoader v-if="loading" />
  </ion-page>
</template>

<script setup>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonToggle,
  IonIcon,
  onIonViewWillEnter,
} from "@ionic/vue";
import { chevronForward } from "ionicons/icons";
import userIcon from "@/assets/icon/userIcon.svg";
import profileIcon from "@/assets/icon/profileIcon.svg";
import billIcon from "@/assets/icon/billIcon.svg";
import cardIcon from "@/assets/icon/cardIcon.svg";
import referralIcon from "@/assets/icon/referralIcon.svg";
import redeemIcon from "@/assets/icon/redeemIcon.svg";
import securityIcon from "@/assets/icon/securityIcon.svg";
import pinIcon from "@/assets/icon/pinIcon.svg";
import biometricIcon from "@/assets/icon/biometricIcon.svg";
import notificationIcon from "@/assets/icon/notificationIcon.svg";
import faqIcon from "@/assets/icon/faqIcon.svg";
import chatIcon from "@/assets/icon/chatIcon.svg";
import legalIcon from "@/assets/icon/legalIcon.svg";
import rateIcon from "@/assets/icon/rateIcon.svg";
import logoutIcon from "@/assets/icon/logoutIcon.svg";

import { computed, ref, inject } from "vue";
import { useDataStore } from "@/stores/data.js";
import { useRouter } from "vue-router";
import { Preferences } from "@capacitor/preferences";
import logout from "@/service/logout.js";

import { helperFunctions } from "@/composable/helperFunctions";

const { initials, copyText, showToast, processError } = helperFunctions;
const store = useDataStore();
const http = inject("http");
const router = useRouter();

const logoutModal = ref(false);
const loading = ref(false);

const user = computed(() => store.getUser);
const notification = computed(() => {
  const settings = store.getSettings;
  return settings && settings.push_notification;
});

const sections = computed(() => {
  return [
    {
      title: "Account Settings",
      links: [
        {
          name: "Profile Information",
          description: "Change your account information",
          icon: profileIcon,
          routeName: "ProfileInformation",
          path: null,
          show: true,
        },
        {
          name: "Bills and Payments",
          description: "Manange auto bills and payments",
          icon: billIcon,
          routeName: "BillsAndPayment",
          path: null,
          show: true,
        },
        {
          name: "Card Settings",
          description: "Add your credit & debit cards",
          icon: cardIcon,
          routeName: "Cards",
          path: null,
          show: true,
        },
        {
          name: "Referrals",
          description: "Invite your friends, and get a bonus",
          icon: referralIcon,
          routeName: "Referrals",
          path: null,
          show: true,
        },
        {
          name: "Redeem Giftcards",
          description: "Redeem your giftcards and discount code",
          icon: redeemIcon,
          routeName: "RedeemGiftcards",
          path: null,
          show: true,
        },
      ],
    },
    {
      title: "Security",
      links: [
        {
          name: "Change Password",
          icon: securityIcon,
          routeName: "ChangePassword",
          path: null,
          show: true,
        },
        {
          name: `${
            user.value && user.value.isPinSet ? "Change Pin" : "Create Pin"
          }`,
          icon: pinIcon,
          routeName: "ChangePin",
          path: null,
          show: true,
        },
        {
          name: "Push Notification",
          icon: notificationIcon,
          routeName: null,
          path: null,
          toggle: true,
          show: true,
        },
      ],
    },
    {
      title: "More",
      links: [
        {
          name: "FAQs",
          description: "Frequently asked questions",
          icon: faqIcon,
          routeName: "Faq",
          path: null,
          show: true,
        },
        {
          name: "Get Help",
          description: "Have an issue? Speak to our team",
          icon: chatIcon,
          routeName: "GetHelp",
          path: null,
          show: true,
        },
        {
          name: "Legal",
          description: "Our terms and privacy policy",
          icon: legalIcon,
          routeName: "Legal",
          path: null,
          show: true,
        },
        {
          name: "Rate Us",
          description: "Rate us on playstore, appstore",
          icon: rateIcon,
          routeName: null,
          path: null,
          show: true,
        },
      ],
    },
  ];
});

onIonViewWillEnter(() => {
  querySettings();
});

const updateNotification = async () => {
  try {
    loading.value = true;
    await http({
      endpoint: "UpdateSettings",
      httpMethod: "patch",
      body: {
        push_notification: !notification.value,
      },
    });

    await querySettings();
    loading.value = false;
  } catch (error) {
    loading.value = false;
    const message = processError(error);
    console.log(message);
    showToast(message);
  }
};

const clickLink = (arg) => {
  if (arg.routeName) {
    router.push({ name: arg.routeName });
  } else if (arg.path) {
    router.push(arg.path);
  } else if (arg.name == "Push Notification") {
    updateNotification();
  } else if (!arg.toggle) {
    if (selected.value === arg.name) {
      selected.value = null;
    } else {
      selected.value = arg.name;
    }
  }
};

const handleLogout = () => {
  logoutModal.value = false;
  logout();
};

const querySettings = async () => {
  try {
    const res = await http({
      endpoint: "GetUserSettings",
      httpMethod: "get",
    });

    console.log(res);
    store.$patch({
      settings: res,
    });
  } catch (error) {
    const message = processError(error);
    console.log(message);
  }
};
</script>
