<template>
  <ion-page>
    <PNav />
    <ion-content fullscreen>
      <div class="grid grid-cols-1 gap-2 px-4">
        <h3 class="text-2xl font-semibold text-primary">Login</h3>
        <p class="text-sm text-dark-400">
          Don't have an account?
          <span
            @click="$router.push({ name: 'Register' })"
            class="font-medium text-secondary"
            >Register</span
          >
        </p>
      </div>

      <form class="ion-padding grid grid-cols-1 gap-2">
        <PInput
          v-model="args.email"
          label="Email Address"
          type="email"
          inputmode="email"
          :error="errorRules.email"
        />
        <PInput
          v-model="args.password"
          label="Password"
          type="password"
          inputmode="password"
          :error="errorRules.password"
        />

        <PButton
          @click="$router.push({ name: 'ForgotPassword' })"
          fill="clear"
          color="secondary"
          class="-ml-4 -mt-2 w-fit px-0"
        >
          <span class="w-full text-left text-sm"> Forgot your password? </span>
        </PButton>
      </form>
    </ion-content>

    <PFooter>
      <div class="ion-padding mb-4">
        <PButton @click="submit" block :loading="loading" type="submit"
          >Login</PButton
        >
      </div>
    </PFooter>
  </ion-page>
</template>

<script setup>
import { IonPage, IonContent } from "@ionic/vue";
import { computed, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { Preferences } from "@capacitor/preferences";
import { useDataStore } from "@/stores/data.js";
import { helperFunctions } from "@/composable/helperFunctions";
import { inject } from "vue";

const store = useDataStore();
const http = inject("http");
const router = useRouter();
const { validateEmail, showToast, processError } = helperFunctions;

const loading = ref(false);
const args = reactive({
  email: "",
  password: "",
  type: "user",
});

const errorN = ref("");

const errorRules = reactive({
  email: false,
  password: false,
});

function validate() {
  if (args.email.trim() == "") {
    errorRules.email = "Please fill in your email or phone number";
    return false;
  } else if (!validateEmail(args.email)) {
    errorRules.email = "Email is badly formated";
    return false;
  } else if (args.password.trim() == "") {
    errorRules.password = "Please enter a password";
    return false;
  } else {
    errorRules.email = false;
    errorRules.password = false;

    return true;
  }
}

const submit = async () => {
  if (validate()) {
    console.log(args);
    try {
      loading.value = true;
      const res = await http({
        endpoint: "Login",
        httpMethod: "post",
        body: args,
      });

      console.log(res);
      await Preferences.set({ key: "token", value: res.token });
      Preferences.set({ key: "firstTimer", value: "false" });

      store.$patch({
        user: res.user,
        isLoggedIn: true,
      });

      loading.value = false;

      args.email = "";
      args.password = "";

      router.push({ name: "Home" });
      getUserLocationDetails(res.user);
      queryLocation();
      // showToast("Login Successful");
      showToast("success", "Login Successful");
    } catch (error) {
      loading.value = false;
      errorN.value = JSON.stringify(error);
      const message = processError(error);
      errorNN.value = message;
      showToast("error", message);

      console.log(message);
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

const queryLocation = async () => {
  try {
    const res = await http({
      endpoint: "GetAllLocation",
      httpMethod: "get",
    });

    store.$patch({
      locationAreas: res,
    });

    console.log(res);
  } catch (error) {
    const message = processError(error);
    console.log(message);
  }
};
</script>
