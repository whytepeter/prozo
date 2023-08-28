<template>
  <ion-grid :fixed="true" class="">
    <ion-row class="text-heading flex items-center justify-center gap-2 px-2">
      <ion-col size="auto" v-for="(token, i) in tokenInput" :key="i">
        <div
          :class="getInputStyle(token)"
          class="relative flex h-5 w-5 items-center justify-center rounded-3xl"
        >
          <span class="text-heading font-bold" v-if="!token.style && !error">
            {{ token.value }}</span
          >
        </div>
      </ion-col>
    </ion-row>
    <ion-row v-if="error" class="mt-1 flex items-center justify-center">
      {{ error }}
    </ion-row>

    <ion-row
      v-if="label && !error"
      class="mt-1 flex items-center justify-center"
    >
      <ion-col class="text-center"> {{ label }} </ion-col>
    </ion-row>

    <ion-row class="mt-6 flex items-center justify-center">
      <ion-col
        size="4"
        :class="`my-${spacing}`"
        class="items-between flex cursor-pointer justify-center"
        v-for="(key, i) in keys"
        :key="i"
      >
        <div
          @click="press(key)"
          :class="key.show ? 'bg-dark-50' : ''"
          class="ion-activatable relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-full p-2"
        >
          <div
            v-if="key.key === 'face'"
            class="grid grid-cols-1 items-center justify-center"
          >
            <img v-if="key.show" src="@/assets/icon/faceNull.svg" alt="" />
          </div>
          <div v-else class="grid grid-cols-1 items-center justify-center">
            <ion-icon
              size="large"
              color="medium"
              v-if="key.key === 'clear'"
              :icon="backspaceOutline"
            ></ion-icon>

            <div v-else class="text-2xl text-dark-500">{{ key.key }}</div>
            <div
              v-if="letters && key.letters"
              class="text-xs uppercase text-dark-500"
            >
              {{ key.letters.toString().split(",").join("") }}
            </div>
          </div>
          <ion-ripple-effect
            v-if="key.show"
            type="unbounded"
          ></ion-ripple-effect>
        </div>
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script setup>
import {
  IonGrid,
  IonCol,
  IonRow,
  IonIcon,
  IonRippleEffect,
  onIonViewWillEnter,
} from "@ionic/vue";
import { backspaceOutline } from "ionicons/icons";
import { ref, onMounted, watch, computed } from "vue";
import { Preferences } from "@capacitor/preferences";
import { useRouter } from "vue-router";
import { useDataStore } from "@/stores/data.js";
import { helperFunctions } from "@/composable/helperFunctions";

const store = useDataStore();
const { query, mutate } = store;
const router = useRouter();
const { showToast } = helperFunctions;
const props = defineProps({
  type: {
    type: String,
    default: "default",
  },

  disabled: {
    type: Boolean,
    default: false,
  },

  tokenLength: {
    type: [String, Number],
    default: 6,
  },

  spacing: {
    type: String,
    default: "1",
  },

  color: {
    type: String,
    default: "dark",
  },

  label: {
    type: [String, Boolean],
    default: false,
  },

  clearInput: {
    type: Boolean,
    default: false,
  },

  error: {
    type: [String, Boolean],
    default: false,
  },

  letters: {
    type: Boolean,
    default: false,
  },

  faceId: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["input", "resetError", "setLoading"]);
const isClear = computed(() => props.clearInput);

watch(isClear, () => {
  if (isClear.value) {
    tokenInput.value.forEach((el) => {
      el.value = "";
      el.focus = false;
      el.style = "";
    });
    emit("input", "");
  }
});

watch(props.error, () => {
  if (props.error) {
    tokenInput.value.forEach((el) => {
      el.value = "";
      el.focus = false;
      el.style = "";
    });
    emit("input", "");
  }
});

onMounted(() => {
  for (let i = 1; i <= parseInt(props.tokenLength); i++) {
    tokenInput.value.push({
      id: i,
      value: "",
      focus: false,
      style: "",
    });
  }
  keys.value[9].show = props.faceId;
  console.log(tokenInput.value);
});

const tokenInput = ref([]);

const keys = ref([
  {
    key: 1,
    letters: [""],
    show: true,
  },
  {
    key: 2,
    letters: ["a", "b", "c"],
    show: true,
  },
  {
    key: 3,
    letters: ["d", "e", "f"],
    show: true,
  },
  {
    key: 4,
    letters: ["g", "h", "i"],
    show: true,
  },
  {
    key: 5,
    letters: ["j", "k", "l"],
    show: true,
  },
  {
    key: 6,
    letters: ["m", "n", "o"],
    show: true,
  },
  {
    key: 7,
    letters: ["p", "q", "r"],
    show: true,
  },
  {
    key: 8,
    letters: ["s", "t", "u"],
    show: true,
  },
  {
    key: 9,
    letters: ["v", "w", "y", "z"],
    show: true,
  },
  {
    key: "face",
    letters: null,
    show: true,
  },
  {
    key: 0,
    letters: null,
    show: true,
  },
  {
    key: "clear",
    letters: null,
    show: true,
  },
]);

const blackStyle = ref(` bg-${props.color} w-5 h-5 border-2`);
const timeout = ref(300);
const getInputStyle = (arg) => {
  let style = "";
  if (arg) {
    if (props.error) {
      style = " bg-error border-2 border-error-light";
    } else {
      if (arg.value) {
        style = arg.style;
      } else {
        style = " bg-dark-50 border-2 border-outline";
      }
    }
  }

  return style;
};

// function setFocusStyle = () => {}
const getCurrentField = () => {
  let arr = [];
  tokenInput.value.forEach((el) => {
    if (el.value) {
      arr.push(el);
    }
  });

  return arr[arr.length - 1];
};

async function press(arg) {
  if (props.error) {
    resetError();
  }
  if (arg && arg.show) {
    if (arg.key === "clear") {
      if (getCurrentField()) {
        if (getCurrentField().id > 1) {
          tokenInput.value[getCurrentField().id - 1].focus = false;
          tokenInput.value[getCurrentField().id - 1].focus = true;
          tokenInput.value[getCurrentField().id - 1].style = "";
        }
        tokenInput.value[getCurrentField().id - 1].value = "";
      }
    } else {
      if (tokenInput.value[0].value === "") {
        tokenInput.value[0].value = arg.key.toString();
        tokenInput.value[1].focus = true;

        setTimeout(() => {
          tokenInput.value[0].style = blackStyle.value;
        }, timeout.value);
      } else {
        if (getCurrentField().id < parseInt(props.tokenLength)) {
          tokenInput.value[getCurrentField().id].value = arg.key.toString();
          tokenInput.value[getCurrentField().id - 1].focus = false;
          setTimeout(() => {
            tokenInput.value[getCurrentField().id - 1].style = blackStyle.value;
          }, timeout.value);
        }

        if (getCurrentField().id < parseInt(props.tokenLength) - 1) {
          tokenInput.value[getCurrentField().id].focus = true;
        }

        if (tokenInput.value[getCurrentField().id - 2].value) {
          tokenInput.value[getCurrentField().id - 2].style = blackStyle.value;
        }

        if (tokenInput.value[getCurrentField().id - 2].value) {
          tokenInput.value[getCurrentField().id - 2].style = blackStyle.value;
        }
      }
    }

    // console.log(tokenInput.value);

    let formattedToken = tokenInput.value.map((el) => {
      return el.value;
    });
    formattedToken = formattedToken.toString().split(",").join("");

    emit("input", formattedToken);
  }
}

function resetError(val) {
  tokenInput.value.forEach((el) => {
    el.value = "";
    el.focus = false;
    el.style = "";
  });
  emit("input", "");
  emit("resetError", val);
}
</script>

<style scope>
ion-input.custom {
  display: inline-block;
  --padding-start: 13px;
}
</style>
