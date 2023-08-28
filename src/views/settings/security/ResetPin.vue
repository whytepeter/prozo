<template>
  <ion-page>
    <PNav />
    <POtpbox v-if="showOtp" @complete="showOtp = false" />
    <ion-content v-else>
      <div>
        <img src="@/assets/icon/keyIcon.svg" alt="" class="mx-auto" />
      </div>
      <div class="ion-padding mb-2 flex flex-col gap-4">
        <h3 class="text-center text-2xl font-semibold text-primary">
          {{ step === "new" ? "Enter New Pin" : "Confirm Pin" }}
        </h3>
        <PInputpin
          :error="errorMessage"
          @resetError="errorMessage = false"
          @input="submit"
          :clearInput="clearInput"
        />
      </div>
    </ion-content>

    <PLoader v-if="loading" />
  </ion-page>
</template>

<script setup>
import { IonPage, IonContent, onIonViewWillEnter } from "@ionic/vue";
import { ref, reactive, inject, computed } from "vue";
import { helperFunctions } from "@/composable/helperFunctions";
import { useDataStore } from "@/stores/data.js";
import { useRouter } from "vue-router";

const store = useDataStore();
const router = useRouter();
const http = inject("http");
const { showToast, processError } = helperFunctions;

const showOtp = ref(true);
const loading = ref(false);
const clearInput = ref(false);
const errorMessage = ref(false);

const step = ref("new");

const args = reactive({
  pin: "",
  confirmPin: "",
});

const user = computed(() => store.getUser);

const submit = async (pin) => {
  clearInput.value = false;

  if (pin.length == 6) {
    errorMessage.value = false;
    if (step.value == "new") {
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

const updatePin = async (pin) => {
  if (pin.length == 6) {
    clearInput.value = false;
    loading.value = true;

    const payload = {
      userId: user.value.id,
      pin: args.pin,
      confimPin: pin,
    };

    try {
      await http({
        endpoint: "ForgotPinUpdate",
        httpMethod: "patch",
        body: payload,
      });

      loading.value = false;

      showToast("success", "Pin updated successful");

      clearInput.value = false;
      showOtp.value = false;
      step.value = "new";
      getUser();

      router.push({ name: "AccountSettings" });
    } catch (error) {
      loading.value = false;
      const message = JSON.stringify(error.response.data.message[0]);
      errorMessage.value = message;
    }
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

<style></style>
