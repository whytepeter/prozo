!function(){function t(e){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t(e)}function e(){"use strict";/*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */e=function(){return r};var r={},n=Object.prototype,o=n.hasOwnProperty,i=Object.defineProperty||function(t,e,r){t[e]=r.value},a="function"==typeof Symbol?Symbol:{},c=a.iterator||"@@iterator",u=a.asyncIterator||"@@asyncIterator",s=a.toStringTag||"@@toStringTag";function l(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{l({},"")}catch(N){l=function(t,e,r){return t[e]=r}}function f(t,e,r,n){var o=e&&e.prototype instanceof h?e:h,a=Object.create(o.prototype),c=new k(n||[]);return i(a,"_invoke",{value:S(t,r,c)}),a}function d(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(N){return{type:"throw",arg:N}}}r.wrap=f;var p={};function h(){}function v(){}function g(){}var y={};l(y,c,(function(){return this}));var m=Object.getPrototypeOf,b=m&&m(m(O([])));b&&b!==n&&o.call(b,c)&&(y=b);var w=g.prototype=h.prototype=Object.create(y);function x(t){["next","throw","return"].forEach((function(e){l(t,e,(function(t){return this._invoke(e,t)}))}))}function L(e,r){function n(i,a,c,u){var s=d(e[i],e,a);if("throw"!==s.type){var l=s.arg,f=l.value;return f&&"object"==t(f)&&o.call(f,"__await")?r.resolve(f.__await).then((function(t){n("next",t,c,u)}),(function(t){n("throw",t,c,u)})):r.resolve(f).then((function(t){l.value=t,c(l)}),(function(t){return n("throw",t,c,u)}))}u(s.arg)}var a;i(this,"_invoke",{value:function(t,e){function o(){return new r((function(r,o){n(t,e,r,o)}))}return a=a?a.then(o,o):o()}})}function S(t,e,r){var n="suspendedStart";return function(o,i){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===o)throw i;return P()}for(r.method=o,r.arg=i;;){var a=r.delegate;if(a){var c=_(a,r);if(c){if(c===p)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var u=d(t,e,r);if("normal"===u.type){if(n=r.done?"completed":"suspendedYield",u.arg===p)continue;return{value:u.arg,done:r.done}}"throw"===u.type&&(n="completed",r.method="throw",r.arg=u.arg)}}}function _(t,e){var r=e.method,n=t.iterator[r];if(void 0===n)return e.delegate=null,"throw"===r&&t.iterator.return&&(e.method="return",e.arg=void 0,_(t,e),"throw"===e.method)||"return"!==r&&(e.method="throw",e.arg=new TypeError("The iterator does not provide a '"+r+"' method")),p;var o=d(n,t.iterator,e.arg);if("throw"===o.type)return e.method="throw",e.arg=o.arg,e.delegate=null,p;var i=o.arg;return i?i.done?(e[t.resultName]=i.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,p):i:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,p)}function E(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function j(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function k(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(E,this),this.reset(!0)}function O(t){if(t){var e=t[c];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var r=-1,n=function e(){for(;++r<t.length;)if(o.call(t,r))return e.value=t[r],e.done=!1,e;return e.value=void 0,e.done=!0,e};return n.next=n}}return{next:P}}function P(){return{value:void 0,done:!0}}return v.prototype=g,i(w,"constructor",{value:g,configurable:!0}),i(g,"constructor",{value:v,configurable:!0}),v.displayName=l(g,s,"GeneratorFunction"),r.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===v||"GeneratorFunction"===(e.displayName||e.name))},r.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,g):(t.__proto__=g,l(t,s,"GeneratorFunction")),t.prototype=Object.create(w),t},r.awrap=function(t){return{__await:t}},x(L.prototype),l(L.prototype,u,(function(){return this})),r.AsyncIterator=L,r.async=function(t,e,n,o,i){void 0===i&&(i=Promise);var a=new L(f(t,e,n,o),i);return r.isGeneratorFunction(e)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},x(w),l(w,s,"Generator"),l(w,c,(function(){return this})),l(w,"toString",(function(){return"[object Generator]"})),r.keys=function(t){var e=Object(t),r=[];for(var n in e)r.push(n);return r.reverse(),function t(){for(;r.length;){var n=r.pop();if(n in e)return t.value=n,t.done=!1,t}return t.done=!0,t}},r.values=O,k.prototype={constructor:k,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(j),!t)for(var e in this)"t"===e.charAt(0)&&o.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function r(r,n){return a.type="throw",a.arg=t,e.next=r,n&&(e.method="next",e.arg=void 0),!!n}for(var n=this.tryEntries.length-1;n>=0;--n){var i=this.tryEntries[n],a=i.completion;if("root"===i.tryLoc)return r("end");if(i.tryLoc<=this.prev){var c=o.call(i,"catchLoc"),u=o.call(i,"finallyLoc");if(c&&u){if(this.prev<i.catchLoc)return r(i.catchLoc,!0);if(this.prev<i.finallyLoc)return r(i.finallyLoc)}else if(c){if(this.prev<i.catchLoc)return r(i.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return r(i.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var n=this.tryEntries[r];if(n.tryLoc<=this.prev&&o.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var i=n;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,p):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),p},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),j(r),p}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;j(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:O(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=void 0),p}},r}function r(t,e,r,n,o,i,a){try{var c=t[i](a),u=c.value}catch(s){return void r(s)}c.done?e(u):Promise.resolve(u).then(n,o)}function n(t){return function(){var e=this,n=arguments;return new Promise((function(o,i){var a=t.apply(e,n);function c(t){r(a,o,i,c,u,"next",t)}function u(t){r(a,o,i,c,u,"throw",t)}c(void 0)}))}}System.register(["./food-legacy-9785001a.js","./index-legacy-795fabed.js"],(function(t,r){"use strict";var o,i,a,c,u,s,l,f,d,p,h,v,g,y,m,b,w,x,L,S,_,E,j=document.createElement("style");return j.textContent=".foodStyle{position:relative;display:flex;height:90px;align-items:center;overflow:hidden;border-radius:.75rem;border-width:1px;--tw-border-opacity: 1;border-color:rgb(9 73 56 / var(--tw-border-opacity));--tw-bg-opacity: 1;background-color:rgb(204 243 229 / var(--tw-bg-opacity));padding:1rem;--tw-text-opacity: 1;color:rgb(9 73 56 / var(--tw-text-opacity))}.cleaningStyle{position:relative;grid-column:span 5 / span 5;display:flex;height:90px;flex-direction:column;justify-content:flex-end;overflow:hidden;border-radius:.75rem;border-width:1px;--tw-border-opacity: 1;border-color:rgb(255 197 1 / var(--tw-border-opacity));--tw-bg-opacity: 1;background-color:rgb(255 243 204 / var(--tw-bg-opacity));padding:.5rem .75rem}.cardStyle{position:relative;display:flex;height:100%;width:100%;flex-direction:column;justify-content:flex-end;overflow:hidden;white-space:nowrap;border-radius:.75rem;border-width:1px;padding:.5rem}.subStyle{position:relative;overflow:hidden;border-radius:.75rem;--tw-bg-opacity: 1;background-color:rgb(9 73 56 / var(--tw-bg-opacity));padding:1.75rem 1rem;--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity))}\n",document.head.appendChild(j),{setters:[function(t){o=t._},function(t){i=t.u,a=t.c,c=t.o,u=t.a,s=t.w,l=t.b,f=t.d,d=t.I,p=t.e,h=t.t,v=t.f,g=t.g,y=t.r,m=t.h,b=t.i,w=t.j,x=t.P,L=t.k,S=t.l,_=t.m,E=t.n}],execute:function(){var r={class:"flex items-center justify-between"},j={class:"flex items-center gap-2"},k={class:"w-52 truncate text-lg font-medium text-dark-500"},O=p("span",{class:"text-dark-300"}," Hello, ",-1),P={class:"text-primary"},N={class:"flex items-center gap-1"},F={class:"ion-activatable relative overflow-hidden p-2"},G=p("img",{src:"/assets/gift-419a89a2.svg",alt:""},null,-1),C=p("img",{src:"/assets/bell-89a1657e.svg",alt:""},null,-1),T=p("div",{class:"absolute right-2 top-2 rounded-full border-2 border-white bg-secondary p-1"},null,-1),H={__name:"ProfileHeader",setup:function(t){var e=i(),n=a((function(){return e.getUser}));return console.log(n.value),function(t,e){return c(),u(f(g),{class:"ion-no-border bg-white pt-2"},{default:s((function(){return[l(f(d),{color:"white",class:"mt-2 p-4"},{default:s((function(){return[p("div",r,[p("div",j,[p("div",k,[O,p("span",P,h(n.value&&n.value.first_name),1)])]),p("div",N,[p("span",F,[G,l(f(v),{class:"text-dark-200",type:"unbounded"})]),p("span",{onClick:e[0]||(e[0]=function(e){return t.$router.push({name:"Notification"})}),class:"ion-activatable relative overflow-hidden p-2"},[C,T,l(f(v),{class:"text-dark-200",type:"unbounded"})])])])]})),_:1})]})),_:1})}}},I={class:"ion-padding py-8"},$={__name:"TodayService",setup:function(t){return function(t,e){var r=y("PEmpty");return c(),m("main",I,[l(r,{icon:f("/assets/sadEmogi-74916eac.svg"),title:"Oops",caption:" No services scheduled for today"},null,8,["icon"])])}}},A={class:"ion-padding -mt-2 grid grid-cols-1 gap-4 text-dark-500"},U=[p("span",null,"Food Services",-1),p("div",{class:"absolute -right-6 -top-6 h-[7rem] w-[7rem]"},[p("img",{src:o,alt:"",class:"w-full object-cover"})],-1)],Y=p("div",{class:"grid grid-cols-12 gap-3 text-xs"},[p("div",{class:"cleaningStyle"},[p("div",{class:"absolute -top-4 right-0 h-20 w-20"},[p("img",{src:"/assets/cleaning-4a778f3a.png",alt:"",class:"w-full object-cover"})]),p("span",null,"Cleaning")]),p("div",{class:"col-span-7 grid grid-cols-2 gap-3"},[p("div",{class:"cardStyle border-accent bg-accent-light"},[p("div",{class:"absolute right-0 top-1 h-14 w-14"},[p("img",{src:"/assets/laundry-b5bdae89.png",alt:"",class:"w-full object-cover"})]),p("span",null,"Laundry")]),p("div",{class:"cardStyle border-info bg-info-light"},[p("div",{class:"absolute right-0 top-1 h-14 w-14"},[p("img",{src:"/assets/fumigation-a2081e4b.png",alt:"",class:"w-full object-cover"})]),p("span",null,"Fumigation")])])],-1),D=[p("span",{class:"ml-16"},"Start a subscriptions",-1),p("div",{class:"absolute -bottom-6 -left-5 h-24 w-24"},[p("img",{src:"/assets/subscription-249d6e58.png",alt:"",class:"w-full object-cover"})],-1)];t("default",{__name:"HomeScreen",setup:function(t){var r=i(),o=b(),d=a((function(){return r.getUser})),h=function(){var t=n(e().mark((function t(r){return e().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:setTimeout((function(){r.target.complete()}),2e3);case 1:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();return w(n(e().mark((function t(){return e().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!d.value||d.value.isPinSet){t.next=4;break}return t.next=3,x.set({key:"fromHome",value:"true"});case 3:o.push({name:"ChangePin"});case 4:case"end":return t.stop()}}),t)})))),function(t,e){var r=y("PDivider");return c(),u(f(E),null,{default:s((function(){return[l(H),l(f(_),{fullscreen:""},{default:s((function(){return[l(f(L),{slot:"fixed",onIonRefresh:e[0]||(e[0]=function(t){return h(t)})},{default:s((function(){return[l(f(S))]})),_:1}),p("div",A,[p("div",{onClick:e[1]||(e[1]=function(e){return t.$router.push({name:"FoodService"})}),class:"foodStyle"},U),Y,p("div",{onClick:e[2]||(e[2]=function(e){return t.$router.push({name:"Subscription"})}),class:"subStyle"},D)]),l(r),l($)]})),_:1})]})),_:1})}}})}}}))}();
