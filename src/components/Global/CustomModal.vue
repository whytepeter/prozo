<template>
  <ion-modal
    v-if="type == 'sheet'"
    :is-open="isOpen"
    :initial-breakpoint="initialBreakpoint"
    @ionModalDidDismiss="$emit('close')"
    :class="[
      persistence ? 'persistence' : '',
      noBackDrop ? 'noBackDrop' : '',
      height ? 'autoHeight' : '',
      'sheet',
    ]"
    :can-dismiss="canDismiss"
  >
    <!-- :breakpoints="breakPoints" -->
    <div :class="[height ? height : '', 'w-full']">
      <PNav
        borderless
        :title="title"
        :showBackButton="false"
        v-if="!noHeader"
        class="my-2"
      >
        <ion-buttons
          v-if="showCloseButton"
          :slot="closeButtonDirection === 'left' ? 'start' : 'end'"
        >
          <ion-button>
            <div
              @click="$emit('close')"
              style=""
              :class="`${closeButtonDark ? 'bg-dark' : 'bg-light'} `"
              class="flex h-8 w-8 items-center justify-center rounded-full p-1"
            >
              <ion-icon
                :class="closeButtonDark ? ' text-white' : ' text-dark-400'"
                class="text-2xl"
                slot="icon-only"
                :icon="close"
              ></ion-icon>
            </div>
          </ion-button>
        </ion-buttons>
      </PNav>
      <ion-content :class="[spacing ? 'ion-padding' : '', 'relative']">
        <div
          v-if="showCloseButton && absolute"
          @click="$emit('close')"
          style=""
          :class="`${closeButtonDark ? 'bg-dark' : 'bg-light'} `"
          class="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full p-1"
        >
          <ion-icon
            :class="closeButtonDark ? ' text-white' : ' text-dark-400'"
            class="text-2xl"
            slot="icon-only"
            :icon="close"
          ></ion-icon>
        </div>
        <slot />
      </ion-content>
    </div>
  </ion-modal>
  <ion-modal
    v-else
    :is-open="isOpen"
    :class="`${persistence ? 'persistence' : ''} ${
      noBackDrop ? 'noBackDrop' : ''
    }${type == 'full' ? 'full' : 'custom'}`"
    @ionModalDidDismiss="$emit('close')"
  >
    <PNav
      :title="title"
      borderless
      :color="color"
      :showBackButton="false"
      v-if="!noHeader"
      class="my-2"
    >
      <ion-buttons
        v-if="showCloseButton"
        :slot="closeButtonDirection === 'left' ? 'start' : 'end'"
      >
        <ion-button>
          <div
            @click="$emit('close')"
            style=""
            :class="`${closeButtonDark ? 'bg-dark' : 'bg-light'} `"
            class="flex h-8 w-8 items-center justify-center rounded-full p-1"
          >
            <ion-icon
              :class="closeButtonDark ? ' text-white' : ' text-dark-400'"
              class="text-2xl"
              slot="icon-only"
              :icon="close"
            ></ion-icon>
          </div>
        </ion-button>
      </ion-buttons>
    </PNav>
    <ion-content :class="[spacing ? 'ion-padding' : '', 'relative']">
      <div
        v-if="showCloseButton && absolute"
        @click="$emit('close')"
        style=""
        :class="[
          closeButtonDark ? 'bg-dark' : 'bg-light',
          isIos ? 'top-14' : 'top-3',
        ]"
        class="absolute right-3 z-20 flex h-8 w-8 items-center justify-center rounded-full p-1"
      >
        <ion-icon
          :class="closeButtonDark ? ' text-white' : ' text-dark-400'"
          class="text-2xl"
          slot="icon-only"
          :icon="close"
        ></ion-icon>
      </div>
      <slot />
    </ion-content>
  </ion-modal>
</template>

<script setup>
import {
  IonModal,
  IonIcon,
  IonContent,
  IonButtons,
  IonButton,
} from "@ionic/vue";
import { close } from "ionicons/icons";

import { Capacitor } from "@capacitor/core";
import { computed } from "vue";

defineProps({
  spacing: {
    type: Boolean,
    default: true,
  },
  showNavBar: {
    type: Boolean,
    default: true,
  },
  isOpen: {
    type: Boolean,
    default: false,
  },
  persistence: {
    type: Boolean,
    default: false,
  },
  noBackDrop: {
    type: Boolean,
    default: false,
  },
  canDismiss: {
    type: Boolean,
    default: true,
  },
  showCloseButton: {
    type: Boolean,
    default: false,
  },
  absolute: {
    type: Boolean,
    default: false,
  },
  height: {
    type: [String, Boolean],
    default: false,
  },
  closeButtonDark: {
    type: Boolean,
    default: false,
  },
  noHeader: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "",
  },
  closeButtonDirection: {
    type: String,
    default: "right",
  },
  color: {
    type: String,
    default: "transparent",
  },
  type: {
    type: String,
    default: "modal",
  },

  initialBreakpoint: {
    type: Number,
    default: 0.75,
  },
  backdropDismiss: {
    type: Boolean,
    default: true,
  },
  backdropBreakpoint: {
    type: [Number, String],
    default: 0.5,
  },
  breakPoints: {
    type: Array,
    default: () => [0, 0.25, 0.5, 0.75],
  },
});

defineEmits(["close"]);

const isIos = computed(() => {
  return Capacitor.getPlatform() === "ios";
});
</script>

<style scope>
ion-modal.custom {
  --width: fit-content;
  --min-width: 300px;
  --max-width: 90%;
  --height: fit-content;

  --border-radius: 24px;
  --box-shadow: 0 28px 48px rgba(0, 0, 0, 0.4);
  overflow: auto !important;
}

ion-modal.full {
  overflow: auto !important;
}

ion-modal.autoHeight {
  --height: auto;
}

ion-modal.md.sheet {
  --border-radius: 17px 17px 0 0 !important;
  overflow: auto;
}

ion-modal.noBackDrop::part(backdrop) {
  display: none;
}

ion-modal.persistence::part(backdrop) {
  pointer-events: none !important;
}

.bg-dark {
  background-color: #0000006b;
}

.bg-light {
  background-color: #ffffff6b;
}
</style>
