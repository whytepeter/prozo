<template>
  <ion-page>
    <PNav />
    <ion-content fullscreen>
      <div class="px-4 grid grid-cols-1 gap-2">
        <div>
          <img src="@/assets/icon/location-off.svg" alt="" />
        </div>
        <h3 class="text-2xl font-semibold text-primary">
          Can’t find your location?
        </h3>
        <p class="text-dark-400 text-sm">
          We’re currently active in Abuja Nigeria. Tells us your location and
          you’ll be the first to know when we touch down in your city
        </p>
      </div>

      <form class="grid grid-cols-1 gap-2 ion-padding">
        <PInput
          v-model="args.name"
          label="Full Name"
          type="text"
          inputmode="text"
          :error="errorRules.name"
        />
        <PInput
          v-model="args.email"
          label="Email Address"
          type="email"
          inputmode="email"
          :error="errorRules.email"
        />
        <PInput
          v-model="args.phone_number"
          label="Phone Number "
          type="tel"
          inputmode="numeric"
          :error="errorRules.phone_number"
        />
        <PSelect
          fullscreen
          :value="args.state"
          @update="args.state = $event"
          :options="filtereStates"
          label="Select State"
          :error="errorRules.state"
        />
      </form>
    </ion-content>

    <PFooter>
      <div class="ion-padding mb-4">
        <PButton @click="submit" block :loading="loading" type="submit"
          >Get Notified</PButton
        >
      </div>
    </PFooter>
  </ion-page>
</template>

<script setup>
import { IonPage, IonContent } from "@ionic/vue";
import { computed, reactive } from "vue";
import { useRouter } from "vue-router";
import { Preferences } from "@capacitor/preferences";
import { useDataStore } from "@/stores/data.js";
import { helperFunctions } from "@/composable/helperFunctions";
import { inject } from "vue";
import states from "@/service/states.js";

const store = useDataStore();
const http = inject("http");
const router = useRouter();

const loading = computed(() => store.getLoading);
const args = reactive({
  name: "",
  email: "",
  phone_number: "",
  state: "",
});

const errorRules = reactive({
  name: false,
  last_name: false,
  email: false,
  phone_number: false,
  state: false,
});

const filtereStates = computed(() => {
  return states.map((el) => {
    return {
      label: el,
      value: el,
    };
  });
});

function validate() {
  let checkNumber =
    isNaN(args.phone_number.trim()) ||
    (processNumber(args.phone_number) &&
      processNumber(args.phone_number).length !== 13);

  if (args.name.trim() === "") {
    errorRules.name = "Please fill in your full name";
    return false;
  } else if (args.email.trim() === "") {
    errorRules.email = "Please fill in your email address";
    return false;
  } else if (!validateEmail(args.email)) {
    errorRules.email = "Email is badly formated";
    return false;
  } else if (args.phone_number.trim() === "") {
    errorRules.phone_number = "Please fill in your phone number";
    return false;
  } else if (checkNumber !== false) {
    errorRules.phone_number = "Phone number badly formatted";
    return false;
  } else if (args.state.trim() === "") {
    errorRules.state = "Please select your state";
    return false;
  } else {
    //Reset Error
    Object.keys(errorRules).forEach((key) => {
      errorRules[key] = false;
    });

    return true;
  }
}

function clearFields() {
  args.name = "";
  args.email = "";
  args.phone_number = "";
  args.state = "";
}

const submit = async () => {
  if (validate()) {
    console.log(args);
    clearFields();
  }
};
</script>
