<template>
  <ion-button
    :expand="block ? 'block' : undefined"
    :color="color"
    :disabled="disbaled"
    :shape="shape"
    :size="size"
    :fill="fill"
    :target="target"
    :readonly="loading"
    :download="download"
    :href="href"
    :type="type"
    :routerDirection="routerDirection"
    @ion-blur="ionBlur"
    @ion-focus="ionFocus"
    class="custom mb-2"
    :strong="strong"
  >
    <!-- :class="bold ? 'font-bold' : ''" -->
    <ion-icon
      v-if="appendIcon && !loading"
      slot="start"
      :color="iconColor ? iconColor : undefined"
      :icon="allIcons[appendIcon]"
    ></ion-icon>
    <ion-icon
      v-if="prependIcon && !loading"
      slot="end"
      :color="iconColor ? iconColor : undefined"
      :icon="allIcons[prependIcon]"
    ></ion-icon>
    <ion-icon
      v-if="iconOnly && !loading"
      slot="icon-only"
      :color="iconColor ? iconColor : undefined"
      :icon="allIcons[iconOnly]"
    ></ion-icon>
    <slot v-if="!loading" />

    <ion-spinner v-if="loading" :color="loaderColor" name="dots"></ion-spinner>
  </ion-button>
</template>

<script setup>
import { IonButton, IonIcon, IonSpinner } from "@ionic/vue";
import * as allIcons from "ionicons/icons";
import { addIcons } from "ionicons";
import { onMounted, computed } from "vue";

const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },

  iconColor: {
    type: [Boolean, String],
    default: false,
  },
  fill: {
    type: String,
    default: "solid",
  },
  target: {
    type: String,
    default: undefined,
  },
  type: {
    type: String,
    default: "button",
  },
  shape: {
    type: String,
    default: undefined,
  },
  routerDirection: {
    type: String,
    default: "forward",
  },
  download: {
    type: String,
    default: undefined,
  },
  href: {
    type: String,
    default: undefined,
  },
  strong: {
    type: Boolean,
    default: undefined,
  },
  iconOnly: {
    type: [String, Boolean],
    default: false,
  },
  appendIcon: {
    type: [String, Boolean],
    default: false,
  },
  prependIcon: {
    type: [String, Boolean],
    default: false,
  },
  size: {
    type: String,
    default: "default",
  },
  color: {
    type: String,
    default: "primary",
  },
  block: {
    type: Boolean,
    default: false,
  },
  disbaled: {
    type: Boolean,
    default: false,
  },
  ionBlur: Function,
  ionFocus: Function,
});

onMounted(() => {
  // Register all icons globally
  addIcons(allIcons);
});

const buttonPadding = computed(() => {
  if (props.size == "default") {
    return `24px`;
  } else if (props.size == "medium") {
    return "18px";
  } else {
    return "15px";
  }
});

const loaderColor = computed(() => {
  return props.fill == "solid" ? "light" : props.color;
});
</script>
<style scoped>
ion-button.custom {
  --box-shadow: none;
  --padding-top: v-bind(buttonPadding);
  --padding-bottom: v-bind(buttonPadding);
  --padding-start: 15px;
  --padding-end: 15px;
  --border-width: 1px;
  --border-radius: 9px;
  text-transform: none !important;
}
</style>
