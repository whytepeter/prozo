<template>
  <ion-page>
    <PNav />
    <ion-content fullscreen>
      <div class="grid grid-cols-1 gap-2 px-4">
        <h3 class="text-2xl font-semibold text-primary">
          Join the <span class="text-secondary">Prozo</span>
        </h3>
        <p class="text-sm text-dark-400">
          Not new to Prozo?
          <span
            @click="$router.push({ name: 'Login' })"
            class="font-medium text-secondary"
            >Log in</span
          >
        </p>
      </div>

      <form class="ion-padding grid grid-cols-1 gap-2 pb-6">
        <PInput
          v-model="args.first_name"
          label="First Name"
          type="text"
          inputmode="text"
          :error="errorRules.first_name"
        />
        <PInput
          v-model="args.last_name"
          label="Last Name"
          type="text"
          inputmode="text"
          :error="errorRules.last_name"
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
        <PInput
          v-model="args.password"
          label="Password"
          type="password"
          inputmode="password"
          :error="errorRules.password"
        />
        <PInput
          v-model="args.ref_code"
          label="Referral code (Optional) "
          type="text"
          inputmode="text"
        />
      </form>
    </ion-content>
    <PFooter>
      <div class="ion-padding mb-4">
        <PButton @click="submit" block :loading="loading" type="submit"
          >Create Account</PButton
        >
        <p class="mt-6 text-center text-xs text-dark-400">
          By creating an account, you agree to Prozo
          <span class="font-medium text-secondary">Terms and Conditions</span>
        </p>
      </div>
    </PFooter>
  </ion-page>
</template>

<script setup>
import { IonPage, IonContent, onIonViewWillEnter } from "@ionic/vue";
import { computed, reactive } from "vue";
import { useRouter } from "vue-router";
import { Preferences } from "@capacitor/preferences";
import { useDataStore } from "@/stores/data.js";
import { helperFunctions } from "@/composable/helperFunctions";
import { inject } from "vue";

const store = useDataStore();
const http = inject("http");
const router = useRouter();
const { validateEmail, processNumber, validatePassword, showToast } =
  helperFunctions;

const loading = computed(() => store.getLoading);
const args = reactive({
  first_name: "",
  last_name: "",
  email: "",
  phone_number: "",
  password: "",
  location_area: "",
  ref_code: "",
  type: "user",
});

const errorRules = reactive({
  first_name: false,
  last_name: false,
  email: false,
  phone_number: false,
  password: false,
});

const setLocationArea = async () => {
  const { value } = await Preferences.get({ key: "location_area" });
  args.location_area = value;
  console.log(args);
};
setLocationArea();

onIonViewWillEnter(() => {
  setLocationArea();
});

function validate() {
  let checkNumber =
    isNaN(args.phone_number.trim()) ||
    (processNumber(args.phone_number) &&
      processNumber(args.phone_number).length !== 14);

  if (args.first_name.trim() === "") {
    errorRules.first_name = "Please fill in your first name";
    return false;
  } else if (args.last_name.trim() === "") {
    errorRules.last_name = "Please fill in your last name";
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
  } else if (args.password.trim() === "") {
    errorRules.password = "Please fill in your password";
    return false;
  } else if (!validatePassword(args.password)) {
    errorRules.password =
      "Password must have at least one uppercase letter, one symbol, one number, and one lowercase letter.";
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
  args.first_name = "";
  args.last_name = "";
  args.email = "";
  args.phone_number = "";
  args.password = "";
  args.location_area = "";
  args.ref_code = "";
}

const submit = async () => {
  if (validate()) {
    console.log(args);

    const payload = { ...args };
    payload.phone_number = processNumber(args.phone_number);

    try {
      const res = await http({
        endpoint: "Register",
        httpMethod: "post",
        body: payload,
      });

      console.log(res);
      await Preferences.set({
        key: "firstTimer",
        value: "false",
      });
      await Preferences.set({ key: "token", value: res.token });

      store.$patch({
        isLoggedIn: true,
        user: res.user,
      });
      clearFields();
      showToast("success", "Registration successfull");
      router.push({ name: "Home" });

      getUserLocationDetails(res.user);
    } catch (error) {
      const message = error.response.data.message;
      console.log(message[0]);
      showToast("error", message[0]);
    }
  }
};

const getUserLocationDetails = async (user) => {
  try {
    const res = await http({
      endpoint: "GetUserLocation",
      httpMethod: "get",
    });
    user.location = res;
    store.$patch({
      user,
    });

    console.log(user);
  } catch (error) {
    console.log(error);
  }
};
</script>
