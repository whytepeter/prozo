<template>
  <ion-page>
    <PNav />
    <ion-content fullscreen>
      <div class="px-4 grid grid-cols-1 gap-2">
        <h3 class="text-2xl font-semibold text-primary">Create New Password</h3>
      </div>

      <form @submit.prevent="submit" class="grid grid-cols-1 gap-2 ion-padding">
        <PInput
          v-model="args.password"
          label="Password"
          type="password"
          inputmode="password"
          :error="errorRules.password"
        />
        <PInput
          v-model="args.confirmPassword"
          label="Confirm Password"
          type="password"
          inputmode="password"
          :error="errorRules.confirmPassword"
        />
      </form>
    </ion-content>

    <PFooter>
      <div class="ion-padding mb-4">
        <PButton
          block
          @click="submit"
          class="mt-4"
          :loading="loading"
          type="submit"
          >Change Password</PButton
        >
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
const { showToast } = helperFunctions;

const loading = computed(() => store.getLoading);
const args = reactive({
  password: "",
  confirmPassword: "",
  email: "",
});

const errorRules = reactive({
  password: false,
  confirmPassword: false,
});

const setEmail = async () => {
  const { value } = await Preferences.get({ key: "userEmail" });
  args.email = value;
  console.log(args.email);
};
setEmail();

onIonViewWillEnter(() => {
  setEmail();
});

function validate() {
  if (args.password.trim() == "") {
    errorRules.password = "Please enter a password";
    return false;
  } else if (args.password !== args.confirmPassword) {
    errorRules.confirmPassword = "Password doesn't match";
    return false;
  } else {
    errorRules.password = false;
    errorRules.confirmPassword = false;

    return true;
  }
}

const submit = async () => {
  if (validate()) {
    console.log(args);
    try {
      const res = await http({
        endpoint: "ResetPassword",
        httpMethod: "post",
        body: args,
      });

      console.log(res);

      router.push({ name: "Login" });
      showToast("success", "Pin reset successful");
    } catch (error) {
      const message = error.response.data.message;
      console.log(message);
      showToast("error", message);
    }
  }
};
</script>
