//store can be defined similar to the composition API setup, but it doesn't work as expected.
import { defineStore } from "pinia";

export const useDataStore = defineStore("main", {
  state: () => ({
    name: "Provo",
    isLoggedIn: false,
    loading: false,

    autoBillingStatus:null,
    wallet:null,

    user:null,
    settings:null,
    locationAreas:[],
    faq:[],
    redeemedCards:[],

    referrals:[],
    referralEarnings:0,

    cards:[],

    transactions: [],

    categories:[],
    foods:[],

    toast:{
      isOpen:false,
      type:'success',
      position:'top',
      message:'',
      duration: 3000,
    }
  }),

  getters: {
    getLogin: (state) => state.isLoggedIn,
    getbiometricWatch: (state) => state.biometricWatch,
    getLoading: (state) => state.loading,
    getToast: (state) => state.toast,
    
    getWallet: (state) => state.wallet,
    getAutoBillingStatus: (state) => state.autoBillingStatus,

    getSettings: (state) => state.settings,
    getlocationAreas: (state) => state.locationAreas,
    getUser: (state) => state.user,
    getFaq: (state) => state.faq,
    
    getRedeemedCards: (state) => state.redeemedCards,
    getReferrals: (state) => state.referrals,
    getReferralEarnings: (state) => state.referralEarnings,
    
    getWalletBalance: (state) => state.user && state.user.wallet ? state.user.wallet.balance : 0,
    getCards: (state) => state.cards,
    getTransactions: (state) => state.transactions,

    getCategories: (state) => state.categories,
    getFoods: (state) => state.foods,
  },
  actions: {

    setToast({isOpen = true, type ='success', position = 'top', message = '', duration =3000}){
      this.toast = {isOpen, type, position, message, duration}
    },

    setWalletBalance(data){
      this.user.wallet.balance = data
    },


    set({ type, data }) {
      this[type] = data;
    },
  },
  persist: true,
});
