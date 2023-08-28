export default {
    // AUTH
    Login: '/auth/login',
    Register: '/auth/register', // Post
    SendOtp: '/otp/send', //Post
    VerifyOtp: '/otp/verify', //Post
    ResetPassword: '/auth/forgot-password-change', //Post
    GetAllLocation: '/location-area', //Get
    VerifyPin: '/users/verify-user-pin', //Post
    CheckEmail: '/users/check-user-email-exist', //Get
    ChangePassword : '/users/changePasswordLoggedInUser', //Post
  
    //USER
    GetUser: '/auth/me', //Get
    GetAllUsers: '/users', //Get
    GetUserSettings: '/user-settings', //Get
    GetUserLocation : '/location/my-details', //Get
    UpdatePin: '/users/update-pin', //Patch
    ForgotPinUpdate: '/users/forget-pin-update', //Patch
    UpdateSettings: '/user-settings', //Patch
    UpdateAccount: '/users', //Patch
    
    GetReferrals : '/referrals/my-referrals', //Get
    GetReferralEarnings : '/referrals/my-referrals-earnings', //Get

    //WALLET
    GetWallet : '/wallet/referesh-balance', //Get
    FundWallet: 'wallet/fund', //Post
    GetTransactions: '/transaction-history', //Post
    MyWallet: '/wallet', //Get
    AutoBillingStatus: '/user-settings/auto-bill-status', //Patch
    UpdateAutoBilling: '/user-settings/auto-bill', //Patch


    //GIFTCARDS
    RedeemGiftcards : '/gift-card/redeem', // Post
    GetRedeemedCards: '/gift-card/get-my-redeemed-cards', //Get

    //OTHER
    GetFaq : '/faq', //Get

    //Cards
    GetCards: '/cards/my-cards', //Get
    AddCard: '/cards/add-card', //Get
    DeleteCard: '/cards/my-cards', //Del Query id

    //FOOD SERVICE
    GetCategories: '/category', //Get
    GetFood: '/foods', //Get
  };
  