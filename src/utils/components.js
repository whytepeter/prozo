import CustomButton from "@/components/Global/CustomButton.vue";
import CustomAlert from "@/components/Global/CustomAlert.vue";
import TextInput from "@/components/Global/TextInput.vue";
import TextArea from "@/components/Global/TextArea.vue";
import SelectInput from "@/components/Global/Select/SelectInput.vue";
import CustomModal from "@/components/Global/CustomModal.vue";
import NavBar from "@/components/Global/NavBar.vue";
import OtpInput from "@/components/Global/OtpInput.vue";
import FooterBar from "@/components/Global/FooterBar.vue";
import CustomLoader from "@/components/Global/CustomLoader.vue";
import CustomDivider from "@/components/Global/CustomDivider.vue";
import CustomToast from "@/components/Global/CustomToast.vue";
import PinInput from "@/components/Global/PinInput.vue";
import BackButton from "@/components/Global/BackButton.vue";
import OtpBox from "@/components/Global/OtpBox.vue";
import EmptyScreen from "@/components/Global/EmptyScreen.vue";
import InfoCard from "@/components/Global/InfoCard.vue";


export const registerComponents = (app) => {
  app
    .component("PButton", CustomButton)
    .component("PInput", TextInput)
    .component("POtp", OtpInput)
    .component("POtpbox", OtpBox)
    .component("PTextarea", TextArea)
    .component("PSelect", SelectInput)
    .component("PModal", CustomModal)
    .component("PNav", NavBar)
    .component("PFooter", FooterBar)
    .component("PLoader", CustomLoader)
    .component("PDivider", CustomDivider)
    .component("PAlert", CustomAlert)
    .component("PToast", CustomToast)
    .component("PInputpin", PinInput)
    .component("PBackButton", BackButton)
    .component("PEmpty", EmptyScreen)
    .component("PInfo", InfoCard)
};
