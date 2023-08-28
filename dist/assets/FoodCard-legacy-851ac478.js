System.register(["./index-legacy-795fabed.js"],(function(e,t){"use strict";var n,l,r,s,a,i,u,c,o,d,p,f,x,v,m,y,g,b,k,h;return{setters:[function(e){n=e.c,l=e.Q,r=e.v,s=e.r,a=e.o,i=e.a,u=e.w,c=e.b,o=e.d,d=e.n,p=e.m,f=e.e,x=e.t,v=e.B,m=e.f,y=e.q,g=e.z,b=e.h,k=e.x,h=e.F}],execute:function(){var t={class:"grid grid-cols-1 gap-6"},w=f("div",{class:"-mt-20 h-[350px] w-full bg-primary-light"},null,-1),C={class:"ion-padding grid grid-cols-1 gap-2 text-center text-xl"},_=f("span",{class:"font-medium text-primary"},"Eba with Okro Soup ",-1),j=f("span",{class:"text-sm text-dark-400"}," (Asepo) & Grilled Beff ",-1),O={class:"font-medium text-secondary"},B={class:"ion-padding grid grid-cols-1 gap-4 text-center"},A=f("span",{class:"flex items-center gap-2 text-xs"},[f("i",{class:"pi pi-plus"}),y(" Add Pepper Sauce ")],-1),F={class:"mx-1 rounded-lg border border-primary p-2"},P={class:"flex items-center justify-between text-sm text-primary"},S=f("i",{class:"pi pi-minus text-error"},null,-1),$={class:"text-base text-secondary"},E=f("i",{class:"pi pi-plus"},null,-1),G={__name:"ViewFood",props:{isOpen:{type:Boolean,default:!1}},emits:["close"],setup:function(e,b){b.emit;var k=g.formatAmount,h=n((function(){return"ios"===l.getPlatform()})),G=r(1),q=r(3500),z=n((function(){return q.value*G.value})),H=function(){"sub"==(arguments.length>0&&void 0!==arguments[0]?arguments[0]:"add")?G.value>1&&(G.value-=1):G.value+=1};return function(n,l){var r=s("PButton"),g=s("PFooter"),b=s("PModal");return a(),i(b,{onClose:l[2]||(l[2]=function(e){return n.$emit("close")}),isOpen:e.isOpen,type:"full",noHeader:"",absolute:"",spacing:!1,showCloseButton:!0},{default:u((function(){return[c(o(d),null,{default:u((function(){return[c(o(p),{fullscreen:""},{default:u((function(){return[f("div",t,[w,f("div",C,[_,j,f("span",O,x(o(k)(z.value)),1)]),f("div",B,[c(r,{fill:"clear",color:"secondary",block:""},{default:u((function(){return[A]})),_:1})])])]})),_:1}),c(g,null,{default:u((function(){return[f("div",{class:v([h.value?"":"ion-padding","mb-4","grid-cols-a grid gap-2"])},[f("div",F,[f("div",P,[f("div",{onClick:l[0]||(l[0]=function(e){return H("sub")}),class:"ion-activatable relative flex items-center justify-center rounded-full p-2"},[S,c(o(m),{class:"text-error",type:"unbounded"})]),f("span",$,x(G.value),1),f("div",{onClick:H,class:"ion-activatable relative flex items-center justify-center rounded-full p-2"},[E,c(o(m),{class:"text-primary",type:"unbounded"})])])]),c(r,{block:"",onClick:l[1]||(l[1]=function(e){return n.$emit("close"),n.$router.push({name:"FoodCart"})})},{default:u((function(){return[y(" Add to card - "+x(o(k)(z.value)),1)]})),_:1})],2)]})),_:1})]})),_:1})]})),_:1},8,["isOpen"])}}},q={key:0,class:"h-[80px] w-[80px] flex-shrink-0 rounded-lg bg-primary-light"},z={class:"grid grid-cols-1 text-left text-xs leading-5"},H=f("span",{class:"text-sm font-medium text-dark-600"},"Eba with Okro Soup ",-1),M=f("span",{class:"text-dark-400"},"(Asepo) & Grilled Beff",-1),Q={class:"text-sm text-secondary"},V={key:0,class:"flex flex-col justify-center overflow-hidden rounded-lg border border-primary text-xs"},D=f("i",{class:"pi pi-minus text-error"},null,-1),I={class:"text-center text-base text-secondary"},J=f("i",{class:"pi pi-plus text-primary"},null,-1),K={key:1,class:"h-[80px] w-[80px] flex-shrink-0 rounded-lg bg-primary-light"};e("_",{__name:"FoodCard",props:{cart:{type:Boolean,default:!1},data:{type:Object,default:{}}},setup:function(e){var t=e,n=g.formatAmount,l=r(!1),i=r(1),u=function(){t.cart||(l.value=!0)},d=function(){"sub"==(arguments.length>0&&void 0!==arguments[0]?arguments[0]:"add")?i.value>1&&(i.value-=1):i.value+=1};return function(t,r){var p=s("ion-ripple-effect");return a(),b(h,null,[f("div",{onClick:u,class:v([[e.cart?"":"justify-between"],"flex items-center gap-4"])},[e.cart?(a(),b("div",q)):k("",!0),f("div",{class:v([e.cart?"flex w-full items-center justify-between":""])},[f("div",z,[H,M,f("span",Q,x(o(n)(3500)),1)]),e.cart?(a(),b("div",V,[f("div",{onClick:r[0]||(r[0]=function(e){return d("sub")}),class:"ion-activatable relative flex w-full items-center justify-center px-4 py-2 pt-3"},[D,c(p,{class:"text-error",type:""})]),f("span",I,x(i.value),1),f("div",{onClick:d,class:"ion-activatable relative flex w-full items-center justify-center px-4 py-2 pb-3"},[J,c(p,{class:"text-primary",type:""})])])):k("",!0)],2),e.cart?k("",!0):(a(),b("div",K))],2),c(G,{isOpen:l.value,onClose:r[1]||(r[1]=function(e){return l.value=!1})},null,8,["isOpen"])],64)}}})}}}));
