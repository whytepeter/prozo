<template>
  <ion-page>
    <PNav />
    <ion-content fullscreen>
      <div class="grid grid-cols-1 gap-2 px-4">
        <h3 class="text-2xl font-semibold text-primary">Forgot Pin</h3>
        <p class="text-sm text-dark-400">
          Kindly enter the email or phone number associated with your account.
          We'll use this information to send you an OTP.
        </p>
      </div>

      <form class="ion-padding grid grid-cols-1 gap-4">
        <PInput
          v-model="email"
          label="Email Address"
          type="email"
          inputmode="email"
          :error="errorRules.email"
        />
      </form>
    </ion-content>

    <PFooter>
      <div class="ion-padding mb-4">
        <PButton @click="submit" block :loading="loading" type="submit"
          >Send OTP</PButton
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
const { showToast } = helperFunctions;

const loading = computed(() => store.getLoading);
const email = ref("");
const errorRules = reactive({
  email: false,
});

const submit = async () => {
  if (email.value.trim() !== "") {
    errorRules.email = false;

    try {
      const res = await http({
        endpoint: "CheckEmail",
        httpMethod: "post",
        body: {
          email: email.value,
          type: "user",
        },
      });
      console.log(res);

      if (res.exist) {
        await sentOtp();
      } else {
        errorRules.email = "user doesn't exist";
      }
    } catch (error) {
      console.log(error.message);
    }
  } else {
    errorRules.email = "Please fill in your email";
    return false;
  }
};

const sentOtp = async () => {
  try {
    const res = await http({
      endpoint: "SendOtp",
      httpMethod: "post",
      body: {
        userEmailOrPhone: email.value,
      },
    });

    console.log(res);
    await Preferences.set({ key: "userEmail", value: email.value });

    router.push({ name: "VerifyOtp" });
  } catch (error) {
    const message = error.response.data.message;
    console.log(message);
    showToast("error", message);
  }
};
</script>
