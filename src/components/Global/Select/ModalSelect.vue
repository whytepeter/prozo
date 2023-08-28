<template>
  <PModal
    :title="label"
    @close="$emit('close')"
    :isOpen="isOpen"
    type="full"
    :showCloseButton="true"
  >
    <ion-page>
      <ion-header mode="ios" class="ion-no-border bg-white">
        <div class="-mt-2 p-4 pt-0">
          <PInput
            @keyup="handleSearch"
            v-model="searchText"
            label="Search"
            clearInput
          />
        </div>
      </ion-header>
      <ion-content fullscreen>
        <ion-list lines="full" class="ion-margin-bottom pa-0">
          <ion-item
            v-for="option in optionData"
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
      </ion-content>
    </ion-page>
  </PModal>
</template>

<script setup>
import {
  IonPage,
  IonHeader,
  IonContent,
  IonInput,
  IonIcon,
  IonList,
  IonItem,
  IonLabel,
} from "@ionic/vue";

import * as allIcons from "ionicons/icons";
import { addIcons } from "ionicons";
import { computed, onMounted, ref, watch } from "vue";

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: "",
  },

  value: {
    type: String,
    default: "",
  },
  options: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["update", "close"]);

const watchOptions = computed(() => props.options);
const searchText = ref("");
const optionData = ref([]);

onMounted(() => {
  optionData.value = props.options;
  // Register all icons globally
  addIcons(allIcons);
});

watch(watchOptions, () => {
  optionData.value = props.options;
});

function update(value) {
  emit("close");
  emit("update", value);
}

function handleSearch() {
  if (searchText.value.trim() !== "" && props.options) {
    optionData.value = props.options.filter((el) => {
      return el.label.toLowerCase().includes(searchText.value.toLowerCase());
    });
  } else {
    optionData.value = props.options;
  }
}
</script>

<style></style>
