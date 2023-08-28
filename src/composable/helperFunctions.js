
import { Toast } from "@capacitor/toast";
import { Clipboard } from "@capacitor/clipboard";
import { Share } from "@capacitor/share";
import { useDataStore } from "@/stores/data";
import { Browser } from "@capacitor/browser";
import dayjs from 'dayjs'



export const helperFunctions = {
  
  truncateAmount(amount) {
    try {
      // Truncate finalAmount to 2 decimal places without rounding up
      if (amount === undefined || amount === null) {
        return 0;
      }
      const truncatedAmount = Math.trunc(amount * 100) / 100;
      return truncatedAmount;
    } catch (error) {
      console.error("error:", error);
      return 0;
    }
  },

  formatAmount(amount) {
    try {
      if (
        amount === undefined ||
        amount === null ||
        amount === 0 ||
        isNaN(amount)
      ) {
        return "₦0.00";
      }
      let formatedAmount = parseInt(amount);
      formatedAmount = amount.toLocaleString("en-NG", {
        style: "currency",
        code: "NG",
        currency: "NGN",
      });

      return formatedAmount;
    } catch (error) {
      console.error("error:", error);
      return 0;
    }
  },

  processNumber(phoneNumber) {
    if (phoneNumber) {
      let phone = phoneNumber;
      let firstDigit = phone.charAt(0);
      if (firstDigit == "0") {
        let formatted = phone.replace("0", "+234").replace(/\s+/g, "");
        return formatted;
      } else if (firstDigit == 2) {
        let formatted = phone.replace(/\s+/g, "");
        return formatted;
      } else if (firstDigit == "+") {
        let formatted = phone.substring(1).replace(/\s+/g, "");
        return formatted;
      }
    } else {
      return "";
    }
  },

  validateEmail(email) {
    if (email) {
      return email.match(
        /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
      );
    }
  },

  validatePassword(password){
    if(password){
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d\s])[\s\S]{8,}$/;
      return regex.test(password);
    }
  },

  validatePhone(phone) {
    // if (phone.trim() == "") {
    //   return false;
    // }
    if (phone.length) {
      if (phone.charAt(0) == 0 && phone.length !== 11) {
        return false;
      } else if (phone.charAt(0) == 2 && phone.length !== 13) {
        return false;
      } else {
        // errorRules.email = false;
        // errorRules.pin = false;

        return true;
      }
    }
  },

  processError(error){
    let message = error.response.data.message
    message = Array.isArray(message) ? message.join(', ') : message;
    return JSON.stringify(message).replace(/"/g, '')
  },

  transformData(arg){
    
    let visibleData = []

    const initializeDate = (arr) => {
      visibleData = [];
    
      arr.forEach((el) => {
        const newDate = {
          year: el.year,
          month: el.month,
          date: el.date,
          day: el.day,
          data: [],
        };
        if (!visibleData.length) {
          visibleData.push(newDate);
        } else {
          if (!isHasDate(newDate)) {
            visibleData.push(newDate);
          }
        }
      });
    
      function isHasDate(arg) {
        return visibleData.find(
          (el) =>
            el.year === arg.year && el.month === arg.month && el.date === arg.date
        );
      }
    };
    
    const organizeDataIntoDates = (arr) => {
      if (arr) {
        arr.forEach((el) => {
          visibleData.forEach((ol) => {
            if (
              el.year === ol.year &&
              el.month === ol.month &&
              el.date === ol.date
            ) {
              ol.data.push(el);
            }
          });
        });
      }
    };

    if (arg.length) {
      //Organize data into dates
      let arr = arg.map((el) => {
        const d = new Date(el.created);
  
        el.year = d.getFullYear();
        el.date = d.getDate();
        el.month = d.getMonth();
        el.day = d.getDay();
        el.dateTime = d;
        el.time = d.toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        });
  
        return el;
      });

      initializeDate(arr);

    organizeDataIntoDates(arr);

    ////// sortData Visible Data//////

    visibleData = visibleData.sort((a, b) => b.day - a.day);
    visibleData = visibleData.sort((a, b) => b.date - a.date);
    visibleData = visibleData.sort((a, b) => b.month - a.month);
    visibleData = visibleData.sort((a, b) => b.year - a.year);

    visibleData.forEach((el) => {
      el.data = el.data.sort((a, b) => b.dateTime - a.dateTime);
    });
    }
  
    return visibleData
  },

  calculatePercentage(num, per) {
    const result = (Number(num) / 100) * Number(per);
    return result;
  },

  
  formatDate(date) {
    return dayjs(date).format('DD/MMM/YYYY')
  },


  async showToast(type, message, duration = 3000) {
   
    const store = useDataStore()
    store.setToast({
      isOpen:true,
      type: type.toLowerCase(),
      message,
      duration
    })
  },

  async copyText(text, message = 'Copied to clipboard') {
    const store = useDataStore()
    await Clipboard.write({
      string: text,
    });

    store.setToast({
      isOpen:true,
      type : 'success',
      message
    })
  },

  async shareText({ title, text, url, dialogTitle, files }) {
    await Share.share({
      title,
      text,
      url,
      files,
      dialogTitle,
    });
  },

   moveCenter  (e, target = true)  {
    const element = target ? e.target : e
  
    element.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    });
  
   if(target){
    e.preventDefault();
   }
  },
  
  maskNumber(digits) {
    return digits
      ? `+${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(
          6,
          10
        )} ${digits.slice(10)}`
      : "Invalid Phone number";
  },

  checkIfNull(arg) {
    return arg ? arg : "N/A";
  },

  initials(user) {
    if (user) {
      const name = `${user.first_name} ${user.last_name}`;
      const arr = name.split(" ");

      const str = `${arr[0].charAt(0).toUpperCase()}${arr[1]
        .charAt(0)
        .toUpperCase()}`;
      return str;
    } else {
      return "N/A";
    }
  },

  async openBrowser(url, style, action ) {
    Browser.removeAllListeners()
    style = style == '' | style == undefined ? 'fullscreen' : style
    // const toolbarColor ='#094938'
   await Browser.open({ url, presentationStyle: style });
   Browser.addListener('browserFinished', action)
  },

  async openLiveChat() {
    await Browser.open({
      url: "https://jivo.chat/ZfJMQ6q8Km",
      presentationStyle: "fullscreen",
      windowName: "Live Chat With Us",
    });
  },

};
