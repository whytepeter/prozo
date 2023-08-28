<template>
  <ion-page>
    <PNav />
    <ion-content fullscreen>
      <div class="grid grid-cols-1 gap-2 px-4">
        <h3 class="text-2xl font-semibold text-primary">
          We’ve sent you an OTP.
        </h3>
        <p class="text-sm text-dark-400">
          Kindly input the OTP sent to the email or phone number you provided.
        </p>
      </div>
      <div class="grid grid-cols-1 gap-6">
        <POtp
          @change="verifyOtp"
          :error="errorRules.otp"
          class="mx-auto w-10/12"
        />
        <div
          class="flex items-center justify-center gap-2 text-sm text-dark-600"
        >
          <div
            class="flex h-9 w-9 items-center justify-center rounded-xl bg-dark-50 text-lg"
          >
            {{ minutes }}
          </div>
          :
          <div
            class="flex h-9 w-9 items-center justify-center rounded-xl bg-dark-50 text-lg"
          >
            {{ seconds }}
          </div>
        </div>
      </div>
    </ion-content>
    <PFooter>
      <div class="ion-padding mb-4">
        <PButton
          :loading="resendLoading"
          @click="resendOTP"
          :disabled="disabledBtn"
          fill="outline"
          block
          >Resend OTP</PButton
        >
      </div>
    </PFooter>

    <PLoader v-if="loading" />
  </ion-page>
</template>

<script setup>
import { IonPage, IonContent, onIonViewWillEnter } from "@ionic/vue";
import { onMounted, onUnmounted, reactive, ref } from "vue";
import { Preferences } from "@capacitor/preferences";
import { useRouter } from "vue-router";
import { inject } from "vue";

const http = inject("http");
const router = useRouter();

const email = ref("");
const errorRules = reactive({
  otp: false,
});
const resendLoading = ref(false);
const loading = ref(false);

const minutes = ref(2);
const seconds = ref("00");
const timer = ref(120);
const disabledBtn = ref(false);

const setEmail = async () => {
  const { value } = await Preferences.get({ key: "userEmail" });
  email.value = value;
  console.log(email.value);
};
setEmail();

onIonViewWillEnter(() => {
  setEmail();
});

onMounted(() => {
  startTimer();
});

onUnmounted(() => {
  errorRules.otp = false;
});

function startTimer() {
  disabledBtn.value = true;
  const interval = setInterval(function () {
    minutes.value = parseInt(timer.value / 60, 10);
    seconds.value = parseInt(timer.value % 60, 10);

    minutes.value = minutes.value < 10 ? "0" + minutes.value : minutes.value;
    seconds.value = seconds.value < 10 ? "0" + seconds.value : seconds.value;

    if (--timer.value < 0) {
      timer.value = 120;
      disabledBtn.value = false;
      clearInterval(interval);
    }
  }, 1000);
}

const verifyOtp = async (code) => {
  console.log(code);
  if (code.length == 6) {
    errorRules.otp = false;
    loading.value = true;
    try {
      const res = await http({
        endpoint: "VerifyOtp",
        httpMethod: "post",
        body: {
          userEmailOrPhone: email.value,
          code,
        },
      });

      loading.value = false;
      console.log(res);
      router.push({ name: "ResetPassword" });
    } catch (error) {
      loading.value = false;
      const message = error.response.data.message;
      errorRules.otp = message;
      console.log(message);
      showToast("error", message);
    }
  }
};

const resendOTP = async () => {
  try {
    const res = await http({
      endpoint: "SendOtp",
      httpMethod: "post",
      body: {
        userEmailOrPhone: email.value,
      },
    });

    console.log(res);
    startTimer();
    showToast("success", "OTP code sent, please check your mail");
  } catch (error) {
    const message = error.response.data.message;
    console.log(message);
    showToast("error", message);
  }
};
</script>
