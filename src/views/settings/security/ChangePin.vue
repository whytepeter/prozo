<template>
  <ion-page>
    <PNav :onClick="handleBackButton"> </PNav>
    <ion-content :fullscreen="true">
      <div>
        <img src="@/assets/icon/keyIcon.svg" alt="" class="mx-auto" />
      </div>
      <div class="ion-padding mb-2 flex flex-col gap-4">
        <h3 class="text-center text-2xl font-semibold text-primary">
          {{ title }}
        </h3>
        <PInputpin
          :error="errorMessage"
          @resetError="errorMessage = false"
          @input="submit"
          :clearInput="clearInput"
        />
      </div>
    </ion-content>
    <PFooter class="bg-white" v-if="step == 'old'">
      <hr />
      <p class="mt-6 pb-8 text-center text-sm text-dark-400">
        Can't remember pin?
        <span @click="handleResetPin" class="font-medium text-secondary"
          >Reset</span
        >
      </p>
    </PFooter>

    <PLoader v-if="loading" />
  </ion-page>
</template>

<script setup>
import { IonPage, IonContent, onIonViewWillEnter } from "@ionic/vue";
import { computed, reactive, ref } from "vue";
import { helperFunctions } from "@/composable/helperFunctions";
import { useDataStore } from "@/stores/data.js";
import { Preferences } from "@capacitor/preferences";
import { inject } from "vue";
import { useRouter } from "vue-router";

const store = useDataStore();
const router = useRouter();
const http = inject("http");
const { showToast, processError } = helperFunctions;

const step = ref("old");

const loading = ref(false);
const clearInput = ref(false);
const errorMessage = ref(false);

const user = computed(() => store.getUser);

const comingFrom = ref("");
const title = ref("");
const args = reactive({
  oldPin: "",
  pin: "",
  confirmPin: "",
});

const setFrom = async () => {
  const { value } = await Preferences.get({ key: "fromHome" });
  comingFrom.value = JSON.parse(value);
};

setFrom();

onIonViewWillEnter(async () => {
  await setFrom();
  if (comingFrom.value) {
    title.value = "Create Your Pin";
  } else {
    title.value =
      user.value && user.value.isPinSet ? "Enter Old Pin" : "Enter Pin";
  }
  step.value = user.value && user.value.isPinSet ? "old" : "new";
});

const submit = async (pin) => {
  clearInput.value = false;
  if (pin.length == 6) {
    errorMessage.value = false;
    if (step.value == "old") {
      verifyPin(pin);
      return false;
    } else if (step.value == "new") {
      title.value = "Confirm Pin";
      args.pin = pin;
      clearInput.value = true;
      step.value = "confirm";
      return false;
    } else if (step.value == "confirm" && args.pin !== pin) {
      errorMessage.value = "Pin doesn't match";
      return false;
    } else {
      updatePin(pin);
    }
  }
};

const handleBackButton = () => {
  if (step.value === "old") {
    router.go(-1);
  } else if (step.value == "new") {
    step.value = "old";
    title.value = "Enter Old Pin";
  } else if (step.value == "confirm") {
    step.value = "new";
    title.value = "Enter New Pin";
  }
};

const updatePin = async (pin) => {
  clearInput.value = false;
  loading.value = true;

  const payload = {
    oldPin: args.oldPin,
    pin: args.pin,
  };

  if (user.value && !user.value.isPinSet) {
    delete payload.oldPin;
  }

  try {
    await http({
      endpoint: "UpdatePin",
      httpMethod: "patch",
      body: payload,
    });

    loading.value = false;
    showToast("success", "Pin updated successful");

    clearInput.value = false;
    getUser();
    if (comingFrom.value == "true") {
      await Preferences.set({ key: "fromHome", value: "false" });
      router.push({ name: "Home" });
    } else {
      router.push({ name: "AccountSettings" });
    }
  } catch (error) {
    loading.value = false;
    const message = JSON.stringify(error.response.data.message[0]);
    errorMessage.value = message;
  }
};

const verifyPin = async (pin) => {
  try {
    loading.value = true;
    const res = await http({
      endpoint: "VerifyPin",
      httpMethod: "post",
      body: {
        pin,
      },
    });

    console.log(res);
    loading.value = false;

    if (res.isPinValid) {
      title.value = "Enter New Pin";
      args.oldPin = pin;
      step.value = "new";
      clearInput.value = true;
    } else {
      errorMessage.value = "Pin is incorrect";
    }
  } catch (error) {
    errorMessage.value = "Pin is incorrect";
    loading.value = false;
    const message = processError(error);
    errorMessage.value = message;
  }
};

const handleResetPin = async () => {
  try {
    loading.value = true;
    const res = await http({
      endpoint: "SendOtp",
      httpMethod: "post",
      body: {
        userEmailOrPhone: user.value.email,
      },
    });
    loading.value = false;

    router.push({ name: "ResetPin" });
  } catch (error) {
    loading.value = false;
    const message = error.response.data.message;
    console.log(message);
    showToast("error", message);
  }
};

const getUser = async () => {
  try {
    const res = await http({
      endpoint: "GetUser",
      httpMethod: "get",
    });
    console.log(res);
    store.$patch({
      user: res,
    });

    getUserLocationDetails(res);
  } catch (error) {
    const message = processError(error);
    showToast("error", message);
    console.log(message);
  }
};

const getUserLocationDetails = async (user) => {
  try {
    const res = await http({
      endpoint: "GetUserLocation",
      httpMethod: "get",
      body: args,
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
