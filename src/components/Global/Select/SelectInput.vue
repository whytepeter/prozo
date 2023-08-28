<template>
  <div class="relative">
    <ion-input
      ref="input"
      fill="solid"
      mode="ios"
      label-placement="floating"
      :label="label"
      color="primary"
      type="text"
      :name="name"
      readonly
      :spellcheck="spellcheck"
      :helper-text="error ? error : hint"
      :disabled="disabled"
      :value="value"
      @click="
        () => {
          !disabled ? (showItems = true) : undefined;
        }
      "
      @focus="
        () => {
          !disabled ? (showItems = true) : undefined;
        }
      "
      class="select text-sm text-dark-600"
    ></ion-input>
    <ion-progress-bar
      v-if="loading"
      color="secondary"
      type="indeterminate"
      class="-mt-2"
    ></ion-progress-bar>

    <div
      class="absolute right-0 top-7 z-50 cursor-pointer bg-white pl-1 pt-[2.5px]"
    >
      <ion-icon
        style="margin-top: -1px"
        class="text-lg"
        color="medium"
        :icon="allIcons[showItems ? 'chevronUp' : 'chevronDown']"
      ></ion-icon>
    </div>

    <div v-if="!fullscreen" class="absolute z-50 w-full rounded">
      <ion-list
        lines="full"
        v-if="showItems"
        :class="[autoHeight ? 'h-auto' : `overflow-scroll ${height}`]"
        class="optionsBox ion-margin-bottom pb-0 shadow-md"
      >
        <ion-item
          v-for="option in options"
          :key="option.value"
          class=""
          @click="update(option)"
        >
          <ion-icon
            v-if="value === option.label || value === option.value"
            :icon="allIcons['checkmarkCircle']"
            color="success"
            slot="end"
          ></ion-icon>
          <ion-label
            class="p-1 capitalize"
            :color="value === option.label ? 'success' : undefined"
            >{{ option.label }}</ion-label
          >
        </ion-item>
      </ion-list>
    </div>

    <ModalSelect
      v-else
      :value="value"
      :label="label"
      :options="optionData"
      @update="update"
      :isOpen="showItems"
      @close="showItems = false"
    />

    <div
      style="z-index: 10"
      v-if="!fullscreen"
      @click="showItems = false"
      :class="!showItems ? 'pointer-events-none' : ''"
      class="fixed inset-0 h-screen"
    ></div>
  </div>
</template>

<script setup>
import {
  IonPage,
  IonContent,
  IonInput,
  IonIcon,
  IonList,
  IonItem,
  IonLabel,
  IonProgressBar,
} from "@ionic/vue";

import * as allIcons from "ionicons/icons";
import { addIcons } from "ionicons";
import { computed, onMounted, ref, watch } from "vue";

import ModalSelect from "./ModalSelect.vue";

const props = defineProps({
  value: {
    type: [String, Number],
    default: "",
  },
  height: {
    type: String,
    default: "h-64",
  },
  fullscreen: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  autoHeight: {
    type: Boolean,
    default: false,
  },
  label: {
    type: [String, Boolean],
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  search: {
    type: Boolean,
    default: true,
  },

  placeholder: String,
  options: {
    type: Array,
    default() {
      return [];
    },
  },
  color: {
    type: [String, Boolean],
    default: "primary",
  },
  error: {
    type: [String, Boolean, Number],
    default: false,
  },
  hint: {
    type: [String, Boolean],
    default: " ",
  },
});

const emit = defineEmits(["update"]);
const showItems = ref(false);

const watchOptions = computed(() => props.options);
const optionData = ref([]);

onMounted(() => {
  // Register all icons globally
  addIcons(allIcons);
  optionData.value = props.options;
});

watch(watchOptions, () => {
  optionData.value = props.options;
});

const hintColor = computed(() => {
  if (props.error) {
    return `var(--ion-color-danger)`;
  } else {
    `var(--ion-color-medium-tint)`;
  }
});

function update(value) {
  showItems.value = false;
  emit("update", value.value);
}
</script>

<style>
ion-input.select {
}

ion-input.select .helper-text {
  color: v-bind(hintColor) !important;
}
ion-input.select.has-focus .label-text {
  color: var(--ion-color-primary) !important;
}
</style>
