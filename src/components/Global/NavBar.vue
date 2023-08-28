<template>
  <ion-header
    v-if="empty"
    :loading="loading"
    :class="color == 'white' ? 'bg-white' : ''"
    class="Navbar ion-no-border"
  >
    <ion-toolbar
      :color="color ? color : undefined"
      :class="color == 'transparent' ? 'transparent' : ''"
      class="Navbar -mt-6"
    >
      <ion-buttons slot="start" v-if="showBackButton">
        <ion-back-button
          :color="dark ? 'white' : 'primary'"
          class="Navbar text-sm text-primary"
          :text="backButtonText"
          :icon="allIcons['arrowBack']"
        ></ion-back-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>

  <ion-header v-else mode="md" :class="['ion-no-border', `bg-${color}`]">
    <ion-toolbar :color="color">
      <ion-buttons slot="start" v-if="showBackButton">
        <ion-back-button
          @click="handleBackButton"
          :color="dark ? 'light' : 'primary'"
          class="Navbar text-sm"
          :text="backButtonText"
          :icon="allIcons['arrowBack']"
        ></ion-back-button>
      </ion-buttons>
      <slot />
      <ion-title
        :class="[
          dark ? `text-white` : 'text-primary',
          showBackButton ? 'pl-0' : '',
        ]"
        class="capitalize font-medium"
      >
        {{ title }}
      </ion-title>
    </ion-toolbar>
    <ion-progress-bar v-if="loading" type="indeterminate"></ion-progress-bar>
  </ion-header>
</template>

<script setup>
import {
  IonHeader,
  IonToolbar,
  IonBackButton,
  IonButtons,
  IonTitle,
  IonProgressBar,
} from "@ionic/vue";
import * as allIcons from "ionicons/icons";
import { addIcons } from "ionicons";
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps({
  type: {
    type: String,
    default: "header",
  },
  showBackButton: {
    type: Boolean,
    default: true,
  },

  loading: {
    type: Boolean,
    default: false,
  },
  empty: {
    type: Boolean,
    default: false,
  },
  translucent: {
    type: Boolean,
    default: false,
  },
  collapse: {
    type: Boolean,
    default: false,
  },
  borderless: {
    type: Boolean,
    default: true,
  },

  color: {
    type: String,
    default: "white",
  },

  backButtonText: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    default: "",
  },
  dark: {
    type: Boolean,
    default: false,
  },
  onClick: {
    type: [Function, Boolean],
    default: false,
  },
});

onMounted(() => {
  // Register all icons globally
  addIcons(allIcons);
});

const handleBackButton = () => {
  if (props.onClick) {
    props.onClick();
  } else {
    router.go(-1);
  }
};
</script>

<style scoped>
ion-header.Navbar {
  box-shadow: none !important;
}
ion-toolbar.Navbar .transparent {
  --background: transparent;
}

/* ion-title.Navbar {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 0px;
  width: 120%;
  height: 100%;
  text-align: center;
} */

/* .ios ion-back-button.Navbar {
  margin-left: 6px !important;
} */
</style>
