<template>
  <PModal
    @close="$emit('close')"
    :isOpen="isOpen"
    type="full"
    :showCloseButton="true"
  >
    <ion-page>
      <ion-content fullscreen class="">
        <div class="grid grid-cols-1 px-4">
          <div>
            <img src="@/assets/icon/editProfileIcon.svg" alt="" />
          </div>
          <h3 class="text-2xl font-semibold text-primary">Edit Profile</h3>
        </div>

        <form
          @submit.prevent="submit"
          v-if="user"
          class="ion-padding grid grid-cols-1 pb-40"
        >
          <PInput
            v-model="user.first_name"
            label="First Name"
            type="text"
            :disabled="loading"
            inputmode="text"
            :error="errorRules.first_name"
          />
          <PInput
            v-model="user.last_name"
            label="Last Name"
            type="text"
            :disabled="loading"
            inputmode="text"
            :error="errorRules.last_name"
          />
          <PInput
            v-model="user.phone_number"
            label="Phone Number "
            type="tel"
            :disabled="loading"
            inputmode="numeric"
            :error="errorRules.phone_number"
          />
          <PTextarea
            v-model="user.location.address"
            label="Address"
            :disabled="loading"
            :error="errorRules.address"
          />
          <PSelect
            fullscreen
            :value="user.location.location_area"
            @update="user.location.location_area = $event"
            :options="locationAreas"
            label="Location Area"
            :disabled="loading"
            :error="errorRules.location_area"
          />
          <PInput
            v-model="user.location.landmark"
            label="Land Mark "
            :error="errorRules.landmark"
          />
          <PSelect
            autoHeight
            :value="user.gender"
            :disabled="loading"
            @update="user.gender = $event"
            :options="[
              {
                label: 'Male',
                value: 'Male',
              },
              {
                label: 'Female',
                value: 'Female',
              },
            ]"
            label="Gender"
            :error="errorRules.gender"
          />
          <!-- v-if="!showDate" -->
          <!-- @click="showDate = true" -->
          <PInput
            v-model="user.dob"
            label="Date Of Birth "
            type="date"
            max="2010-12-31"
            :disabled="loading"
            :error="errorRules.dob"
          />

          <PButton :loading="loading" type="submit" class="mt-2" block
            >Save</PButton
          >
        </form>
      </ion-content>
      <PLoader v-if="loading" />
    </ion-page>
    <PLoader v-if="loading" color="yellow" />
  </PModal>
</template>

<script setup>
import {
  IonPage,
  IonContent,
  IonButtons,
  IonButton,
  IonDatetime,
} from "@ionic/vue";
import states from "@/service/states.js";
import { useDataStore } from "@/stores/data.js";
import { helperFunctions } from "@/composable/helperFunctions";
import { computed, onMounted, reactive, ref } from "vue";
import { inject } from "vue";

const http = inject("http");
const store = useDataStore();
const { validateEmail, processNumber, formatDate, showToast, processError } =
  helperFunctions;

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["close"]);

const user = ref({});

const locationAreas = computed(() => {
  return (
    store.getlocationAreas &&
    store.getlocationAreas.map((el) => {
      return {
        label: el.name,
        value: el.name,
      };
    })
  );
});

const mainData = computed(() => store.getUser);
const locationData = computed(() => mainData.value && mainData.value.location);

delete mainData.location;
user.value = { ...mainData.value };
user.value.location = { ...locationData.value };

const loading = ref(false);

const errorRules = reactive({
  first_name: false,
  last_name: false,
  email: false,
  address: false,
  phone_number: false,
  location_area: false,
  landmark: false,
});

// user.value = { ...props.user };
console.log(user.value);

onMounted(() => {
  user.value = { ...mainData.value };
  user.value.location = { ...locationData.value };
});

function validate() {
  // let checkNumber =
  //   isNaN(args.phone_number.trim()) ||
  //   (processNumber(args.phone_number) &&
  //     processNumber(args.phone_number).length !== 14);

  if (user.value.first_name.trim() === "") {
    errorRules.first_name = "Please fill in your first name";
    return false;
  } else if (user.value.last_name.trim() === "") {
    errorRules.last_name = "Please fill in your last name";
    return false;
  } else if (user.value.email.trim() === "") {
    errorRules.email = "Please fill in your email address";
    return false;
  } else if (!validateEmail(user.value.email)) {
    errorRules.email = "Email is badly formated";
    return false;
  } else if (user.value.phone_number.trim() === "") {
    errorRules.phone_number = "Please fill in your phone number";
    return false;
  } else if (
    user.value.location.address &&
    user.value.location.address.trim() === ""
  ) {
    errorRules.address = "Please fill in your address";
    return false;
  } else if (
    user.value.location.location_area &&
    user.value.location.location_area.trim() === ""
  ) {
    errorRules.location_area = "Please fill in your location area";
    return false;
  } else {
    //Reset Error

    Object.keys(errorRules).forEach((key) => {
      errorRules[key] = false;
    });

    return true;
  }
}

const submit = async () => {
  if (validate()) {
    loading.value = true;

    const payload = {
      first_name: user.value.first_name,
      last_name: user.value.last_name,
      phone_number: user.value.phone_number,
      gender: user.value.gender,
      dob: user.value.dob,
      address: user.value.location.address,
      landmark: user.value.location.landmark,
      location_area: user.value.location.location_area,
    };

    console.log(payload);

    try {
      const res = await http({
        endpoint: "UpdateAccount",
        httpMethod: "patch",
        body: payload,
      });

      console.log(res);
      await getUser();
      loading.value = false;
      emit("close");
      showToast("success", "Profile updated successfully");
    } catch (error) {
      loading.value = false;
      const message = processError(error);
      console.log(message);
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
